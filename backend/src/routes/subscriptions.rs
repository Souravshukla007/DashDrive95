use axum::{
    extract::State,
    routing::{get, post},
    Json, Router,
};
use serde::{Deserialize, Serialize};

use crate::{
    auth::AuthenticatedUser,
    db::AppState,
    errors::AppResult,
    models::{Subscription, SubscriptionPlan},
};

#[derive(Deserialize)]
pub struct SubscribeRequest {
    pub plan_id: String,
}

fn all_plans() -> Vec<SubscriptionPlan> {
    vec![
        SubscriptionPlan {
            id: "basic".to_string(),
            name: "Basic".to_string(),
            price: 0,
            features: vec![
                "5 rides/month".to_string(),
                "Standard vehicles".to_string(),
                "Email support".to_string(),
                "Basic tracking".to_string(),
            ],
        },
        SubscriptionPlan {
            id: "pro".to_string(),
            name: "Pro".to_string(),
            price: 299,
            features: vec![
                "Unlimited rides".to_string(),
                "All vehicle types".to_string(),
                "Priority support".to_string(),
                "AC preference".to_string(),
                "Real-time tracking".to_string(),
                "No surge pricing".to_string(),
            ],
        },
        SubscriptionPlan {
            id: "premium".to_string(),
            name: "Premium".to_string(),
            price: 799,
            features: vec![
                "Everything in Pro".to_string(),
                "Airport pickups".to_string(),
                "Dedicated driver".to_string(),
                "No Pin No Pay".to_string(),
                "Fleet for corporate".to_string(),
                "Cancel anytime".to_string(),
            ],
        },
    ]
}

async fn get_plans(State(_state): State<AppState>) -> AppResult<Json<Vec<SubscriptionPlan>>> {
    Ok(Json(all_plans()))
}

async fn subscribe(
    State(state): State<AppState>,
    AuthenticatedUser(claims): AuthenticatedUser,
    Json(body): Json<SubscribeRequest>,
) -> AppResult<Json<serde_json::Value>> {
    use mongodb::bson::{doc, oid::ObjectId};
    use crate::errors::AppError;

    let oid = ObjectId::parse_str(&claims.sub)
        .map_err(|_| AppError::BadRequest("Invalid user ID".to_string()))?;

    let subscription_val = match body.plan_id.as_str() {
        "pro" => "pro",
        "premium" => "premium",
        _ => "basic",
    };

    state
        .users()
        .update_one(
            doc! { "_id": oid },
            doc! { "$set": { "subscription": subscription_val } },
        )
        .await?;

    let plan = all_plans()
        .into_iter()
        .find(|p| p.id == body.plan_id)
        .unwrap_or_else(|| all_plans().into_iter().next().unwrap());

    Ok(Json(serde_json::json!({
        "success": true,
        "subscription": plan
    })))
}

async fn cancel_subscription(
    State(state): State<AppState>,
    AuthenticatedUser(claims): AuthenticatedUser,
) -> AppResult<Json<serde_json::Value>> {
    use mongodb::bson::{doc, oid::ObjectId};
    use crate::errors::AppError;

    let oid = ObjectId::parse_str(&claims.sub)
        .map_err(|_| AppError::BadRequest("Invalid user ID".to_string()))?;

    state
        .users()
        .update_one(
            doc! { "_id": oid },
            doc! { "$set": { "subscription": "basic" } },
        )
        .await?;

    Ok(Json(serde_json::json!({ "success": true })))
}

pub fn subscriptions_router() -> Router<AppState> {
    Router::new()
        .route("/api/subscriptions/plans", get(get_plans))
        .route("/api/subscriptions/subscribe", post(subscribe))
        .route("/api/subscriptions/cancel", post(cancel_subscription))
}
