use axum::{
    extract::{Path, State},
    routing::{get, post},
    Json, Router,
};
use chrono::Utc;
use serde::{Deserialize, Serialize};

use crate::{
    auth::AuthenticatedUser,
    db::AppState,
    errors::{AppError, AppResult},
    models::{Payment, PaymentStatus},
};

#[derive(Deserialize)]
pub struct InitiatePaymentRequest {
    pub ride_id: String,
}

#[derive(Deserialize)]
pub struct VerifyOtpRequest {
    pub ride_id: String,
    pub otp: String,
}

#[derive(Deserialize)]
pub struct CancelPaymentRequest {
    pub payment_id: String,
}

fn generate_otp() -> String {
    use std::time::{SystemTime, UNIX_EPOCH};
    let seed = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .unwrap()
        .subsec_millis();
    format!("{:04}", seed % 10000)
}

async fn initiate_payment(
    State(state): State<AppState>,
    AuthenticatedUser(claims): AuthenticatedUser,
    Json(body): Json<InitiatePaymentRequest>,
) -> AppResult<Json<serde_json::Value>> {
    let otp = generate_otp();

    let payment = Payment {
        id: None,
        ride_id: body.ride_id.clone(),
        user_id: claims.sub.clone(),
        amount: 150.0, // mock amount
        status: PaymentStatus::Pending,
        otp: otp.clone(),
        created_at: Utc::now(),
    };

    let result = state.payments().insert_one(payment).await?;
    let payment_id = result.inserted_id.as_object_id()
        .map(|id| id.to_hex())
        .unwrap_or_default();

    // In production: send OTP to rider's phone via SMS
    tracing::info!("💳 Payment OTP for ride {}: {} [DEMO]", body.ride_id, otp);

    Ok(Json(serde_json::json!({
        "payment_id": payment_id,
        "amount": 150.0,
        "otp_sent": true,
        "message": "OTP sent to registered phone number"
    })))
}

async fn verify_otp(
    State(state): State<AppState>,
    AuthenticatedUser(claims): AuthenticatedUser,
    Json(body): Json<VerifyOtpRequest>,
) -> AppResult<Json<serde_json::Value>> {
    use mongodb::bson::doc;

    // Find payment for this ride
    let payment = state
        .payments()
        .find_one(doc! {
            "ride_id": &body.ride_id,
            "user_id": &claims.sub,
            "status": "pending"
        })
        .await?
        .ok_or_else(|| AppError::NotFound("Payment not found".to_string()))?;

    if payment.otp != body.otp {
        return Err(AppError::BadRequest("Invalid OTP".to_string()));
    }

    // Mark payment as verified
    state
        .payments()
        .update_one(
            doc! { "ride_id": &body.ride_id, "user_id": &claims.sub },
            doc! { "$set": { "status": "verified" } },
        )
        .await?;

    // Mark ride as completed
    state
        .rides()
        .update_one(
            doc! { "user_id": &claims.sub },
            doc! { "$set": { "status": "completed" } },
        )
        .await?;

    Ok(Json(serde_json::json!({
        "success": true,
        "message": "Payment verified. Ride completed!"
    })))
}

async fn cancel_payment(
    State(state): State<AppState>,
    AuthenticatedUser(claims): AuthenticatedUser,
    Json(body): Json<CancelPaymentRequest>,
) -> AppResult<Json<serde_json::Value>> {
    use mongodb::bson::{doc, oid::ObjectId};

    let oid = ObjectId::parse_str(&body.payment_id)
        .map_err(|_| AppError::BadRequest("Invalid payment ID".to_string()))?;

    state
        .payments()
        .update_one(
            doc! { "_id": oid, "user_id": &claims.sub },
            doc! { "$set": { "status": "cancelled" } },
        )
        .await?;

    Ok(Json(serde_json::json!({ "success": true })))
}

pub fn payments_router() -> Router<AppState> {
    Router::new()
        .route("/api/payments/initiate", post(initiate_payment))
        .route("/api/payments/verify-otp", post(verify_otp))
        .route("/api/payments/cancel", post(cancel_payment))
}
