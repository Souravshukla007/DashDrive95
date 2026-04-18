use axum::{
    extract::{Path, State},
    routing::{get, post},
    Json, Router,
};
use chrono::Utc;
use mongodb::bson::{doc, oid::ObjectId};
use serde::{Deserialize, Serialize};

use crate::{
    auth::AuthenticatedUser,
    db::AppState,
    errors::{AppError, AppResult},
    models::{Ride, RideStatus, VehicleType},
};

// ─── Request / Response Types ────────────────────────────────────────────────

#[derive(Deserialize)]
pub struct BookRideRequest {
    pub pickup: String,
    pub dropoff: String,
    pub vehicle_type: String,
    pub is_ac: Option<bool>,
    pub is_ev: Option<bool>,
    pub is_prebook: Option<bool>,
    pub prebook_time: Option<String>,
}

#[derive(Serialize)]
pub struct RideResponse {
    pub id: String,
    pub user_id: String,
    pub pickup: String,
    pub dropoff: String,
    pub vehicle_type: String,
    pub status: String,
    pub fare: f64,
    pub driver_name: Option<String>,
    pub driver_rating: Option<f32>,
    pub eta: Option<String>,
    pub created_at: String,
}

fn ride_to_response(ride: &Ride, id: String) -> RideResponse {
    let vehicle = match ride.vehicle_type {
        VehicleType::Taxi => "taxi",
        VehicleType::Bike => "bike",
        VehicleType::Ev => "ev",
        VehicleType::Auto => "auto",
    };
    let status = match ride.status {
        RideStatus::Pending => "pending",
        RideStatus::Accepted => "accepted",
        RideStatus::InProgress => "in_progress",
        RideStatus::Completed => "completed",
        RideStatus::Cancelled => "cancelled",
    };
    RideResponse {
        id,
        user_id: ride.user_id.clone(),
        pickup: ride.pickup.clone(),
        dropoff: ride.dropoff.clone(),
        vehicle_type: vehicle.to_string(),
        status: status.to_string(),
        fare: ride.fare,
        driver_name: ride.driver_name.clone(),
        driver_rating: ride.driver_rating,
        eta: ride.eta.clone(),
        created_at: ride.created_at.to_rfc3339(),
    }
}

fn parse_vehicle(s: &str) -> VehicleType {
    match s.to_lowercase().as_str() {
        "bike" => VehicleType::Bike,
        "ev" => VehicleType::Ev,
        "auto" => VehicleType::Auto,
        _ => VehicleType::Taxi,
    }
}

fn estimate_fare(vehicle: &VehicleType, pickup: &str, dropoff: &str) -> f64 {
    // Simple mock fare calculation
    let base = match vehicle {
        VehicleType::Bike => 40.0,
        VehicleType::Auto => 60.0,
        VehicleType::Taxi => 80.0,
        VehicleType::Ev => 90.0,
    };
    // Add some variance based on string length difference (mock distance)
    let distance_factor = ((dropoff.len() as f64 - pickup.len() as f64).abs() + 5.0) * 2.5;
    (base + distance_factor).round()
}

// ─── Handlers ────────────────────────────────────────────────────────────────

async fn book_ride(
    State(state): State<AppState>,
    AuthenticatedUser(claims): AuthenticatedUser,
    Json(body): Json<BookRideRequest>,
) -> AppResult<Json<RideResponse>> {
    let vehicle_type = parse_vehicle(&body.vehicle_type);
    let fare = estimate_fare(&vehicle_type, &body.pickup, &body.dropoff);

    let ride = Ride {
        id: None,
        user_id: claims.sub.clone(),
        pickup: body.pickup.clone(),
        dropoff: body.dropoff.clone(),
        vehicle_type,
        status: RideStatus::Accepted,
        fare,
        driver_name: Some("Suresh Kumar".to_string()),
        driver_rating: Some(4.9),
        eta: Some("4 min".to_string()),
        is_prebook: body.is_prebook.unwrap_or(false),
        prebook_time: None,
        is_ac: body.is_ac.unwrap_or(false),
        is_ev: body.is_ev.unwrap_or(false),
        created_at: Utc::now(),
    };

    let result = state.rides().insert_one(ride.clone()).await?;
    let ride_id = result.inserted_id.as_object_id()
        .map(|oid| oid.to_hex())
        .unwrap_or_default();

    Ok(Json(ride_to_response(&ride, ride_id)))
}

async fn prebook_ride(
    State(state): State<AppState>,
    AuthenticatedUser(claims): AuthenticatedUser,
    Json(body): Json<BookRideRequest>,
) -> AppResult<Json<RideResponse>> {
    let vehicle_type = parse_vehicle(&body.vehicle_type);
    let fare = estimate_fare(&vehicle_type, &body.pickup, &body.dropoff);

    let ride = Ride {
        id: None,
        user_id: claims.sub.clone(),
        pickup: body.pickup,
        dropoff: body.dropoff,
        vehicle_type,
        status: RideStatus::Pending,
        fare,
        driver_name: None,
        driver_rating: None,
        eta: Some("Scheduled".to_string()),
        is_prebook: true,
        prebook_time: None,
        is_ac: body.is_ac.unwrap_or(false),
        is_ev: body.is_ev.unwrap_or(false),
        created_at: Utc::now(),
    };

    let result = state.rides().insert_one(ride.clone()).await?;
    let ride_id = result.inserted_id.as_object_id()
        .map(|oid| oid.to_hex())
        .unwrap_or_default();

    Ok(Json(ride_to_response(&ride, ride_id)))
}

async fn get_ride(
    State(state): State<AppState>,
    AuthenticatedUser(_claims): AuthenticatedUser,
    Path(ride_id): Path<String>,
) -> AppResult<Json<RideResponse>> {
    let oid = ObjectId::parse_str(&ride_id)
        .map_err(|_| AppError::BadRequest("Invalid ride ID".to_string()))?;

    let ride = state
        .rides()
        .find_one(doc! { "_id": oid })
        .await?
        .ok_or_else(|| AppError::NotFound("Ride not found".to_string()))?;

    Ok(Json(ride_to_response(&ride, ride_id)))
}

async fn get_user_rides(
    State(state): State<AppState>,
    AuthenticatedUser(claims): AuthenticatedUser,
    Path(user_id): Path<String>,
) -> AppResult<Json<Vec<RideResponse>>> {
    if claims.sub != user_id {
        return Err(AppError::Unauthorized("Access denied".to_string()));
    }

    let mut cursor = state
        .rides()
        .find(doc! { "user_id": &user_id })
        .await?;

    let mut rides = Vec::new();
    while cursor.advance().await? {
        let ride = cursor.deserialize_current()?;
        let id = ride.id.as_ref().map(|id| id.to_hex()).unwrap_or_default();
        rides.push(ride_to_response(&ride, id));
    }

    Ok(Json(rides))
}

async fn cancel_ride(
    State(state): State<AppState>,
    AuthenticatedUser(claims): AuthenticatedUser,
    Path(ride_id): Path<String>,
) -> AppResult<Json<serde_json::Value>> {
    let oid = ObjectId::parse_str(&ride_id)
        .map_err(|_| AppError::BadRequest("Invalid ride ID".to_string()))?;

    state
        .rides()
        .update_one(
            doc! { "_id": oid, "user_id": &claims.sub },
            doc! { "$set": { "status": "cancelled" } },
        )
        .await?;

    Ok(Json(serde_json::json!({ "success": true })))
}

async fn emergency_ride(
    State(state): State<AppState>,
    Json(body): Json<BookRideRequest>,
) -> AppResult<Json<RideResponse>> {
    let ride = Ride {
        id: None,
        user_id: "emergency".to_string(),
        pickup: body.pickup.clone(),
        dropoff: "Nearest Hospital".to_string(),
        vehicle_type: VehicleType::Taxi,
        status: RideStatus::Accepted,
        fare: 0.0,
        driver_name: Some("Emergency Driver".to_string()),
        driver_rating: Some(5.0),
        eta: Some("2 min".to_string()),
        is_prebook: false,
        prebook_time: None,
        is_ac: false,
        is_ev: false,
        created_at: Utc::now(),
    };

    let result = state.rides().insert_one(ride.clone()).await?;
    let ride_id = result.inserted_id.as_object_id()
        .map(|oid| oid.to_hex())
        .unwrap_or_default();

    Ok(Json(ride_to_response(&ride, ride_id)))
}

// ─── Router ──────────────────────────────────────────────────────────────────

pub fn rides_router() -> Router<AppState> {
    Router::new()
        .route("/api/rides/book", post(book_ride))
        .route("/api/rides/prebook", post(prebook_ride))
        .route("/api/rides/emergency", post(emergency_ride))
        .route("/api/rides/:id", get(get_ride))
        .route("/api/rides/:id/cancel", post(cancel_ride))
        .route("/api/rides/user/:user_id", get(get_user_rides))
}
