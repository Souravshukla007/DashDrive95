use serde::{Deserialize, Serialize};
use chrono::{DateTime, Utc};

// ─── User ────────────────────────────────────────────────────────────────────

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct User {
    #[serde(rename = "_id", skip_serializing_if = "Option::is_none")]
    pub id: Option<mongodb::bson::oid::ObjectId>,
    pub name: String,
    pub email: String,
    pub password_hash: String,
    pub phone: Option<String>,
    pub subscription: Subscription,
    pub created_at: DateTime<Utc>,
}

#[derive(Debug, Serialize, Deserialize, Clone, PartialEq)]
#[serde(rename_all = "lowercase")]
pub enum Subscription {
    Basic,
    Pro,
    Premium,
}

impl Default for Subscription {
    fn default() -> Self { Subscription::Basic }
}

// ─── Ride ────────────────────────────────────────────────────────────────────

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Ride {
    #[serde(rename = "_id", skip_serializing_if = "Option::is_none")]
    pub id: Option<mongodb::bson::oid::ObjectId>,
    pub user_id: String,
    pub pickup: String,
    pub dropoff: String,
    pub vehicle_type: VehicleType,
    pub status: RideStatus,
    pub fare: f64,
    pub driver_name: Option<String>,
    pub driver_rating: Option<f32>,
    pub eta: Option<String>,
    pub is_prebook: bool,
    pub prebook_time: Option<DateTime<Utc>>,
    pub is_ac: bool,
    pub is_ev: bool,
    pub created_at: DateTime<Utc>,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
#[serde(rename_all = "lowercase")]
pub enum VehicleType {
    Taxi,
    Bike,
    Ev,
    Auto,
}

#[derive(Debug, Serialize, Deserialize, Clone, PartialEq)]
#[serde(rename_all = "snake_case")]
pub enum RideStatus {
    Pending,
    Accepted,
    InProgress,
    Completed,
    Cancelled,
}

// ─── Booking ─────────────────────────────────────────────────────────────────

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Booking {
    #[serde(rename = "_id", skip_serializing_if = "Option::is_none")]
    pub id: Option<mongodb::bson::oid::ObjectId>,
    pub user_id: String,
    pub ride_id: String,
    pub payment_status: PaymentStatus,
    pub otp: String,
    pub created_at: DateTime<Utc>,
}

#[derive(Debug, Serialize, Deserialize, Clone, PartialEq)]
#[serde(rename_all = "snake_case")]
pub enum PaymentStatus {
    Pending,
    Verified,
    Cancelled,
    Refunded,
}

// ─── Payment ─────────────────────────────────────────────────────────────────

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Payment {
    #[serde(rename = "_id", skip_serializing_if = "Option::is_none")]
    pub id: Option<mongodb::bson::oid::ObjectId>,
    pub ride_id: String,
    pub user_id: String,
    pub amount: f64,
    pub status: PaymentStatus,
    pub otp: String,
    pub created_at: DateTime<Utc>,
}

// ─── Subscription Plan ───────────────────────────────────────────────────────

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct SubscriptionPlan {
    pub id: String,
    pub name: String,
    pub price: u32,
    pub features: Vec<String>,
}

// ─── Reward ──────────────────────────────────────────────────────────────────

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Reward {
    #[serde(rename = "_id", skip_serializing_if = "Option::is_none")]
    pub id: Option<mongodb::bson::oid::ObjectId>,
    pub user_id: String,
    pub badge_id: String,
    pub badge_name: String,
    pub icon: String,
    pub unlocked: bool,
    pub earned_at: Option<DateTime<Utc>>,
}

// ─── Streak ──────────────────────────────────────────────────────────────────

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct RideStreak {
    pub user_id: String,
    pub current_streak: u32,
    pub longest_streak: u32,
    pub last_ride_date: Option<DateTime<Utc>>,
}
