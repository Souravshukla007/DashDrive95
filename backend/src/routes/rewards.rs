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
    models::Reward,
};

#[derive(Deserialize)]
pub struct ClaimRequest {
    pub reward_id: String,
}

#[derive(Serialize)]
pub struct RewardsResponse {
    pub badges: Vec<BadgeResponse>,
    pub streak: StreakResponse,
    pub points: u32,
}

#[derive(Serialize)]
pub struct BadgeResponse {
    pub id: String,
    pub name: String,
    pub icon: String,
    pub unlocked: bool,
    pub earned_at: Option<String>,
}

#[derive(Serialize)]
pub struct StreakResponse {
    pub current_streak: u32,
    pub longest_streak: u32,
    pub last_ride_date: Option<String>,
}

fn default_badges(user_id: &str) -> Vec<BadgeResponse> {
    vec![
        BadgeResponse { id: "eco".to_string(), name: "Eco Warrior".to_string(), icon: "🌿".to_string(), unlocked: true, earned_at: Some(Utc::now().to_rfc3339()) },
        BadgeResponse { id: "streak".to_string(), name: "Streak Master".to_string(), icon: "🏆".to_string(), unlocked: true, earned_at: Some(Utc::now().to_rfc3339()) },
        BadgeResponse { id: "speed".to_string(), name: "Speed Demon".to_string(), icon: "⚡".to_string(), unlocked: false, earned_at: None },
        BadgeResponse { id: "safe".to_string(), name: "Safe Rider".to_string(), icon: "🛡️".to_string(), unlocked: true, earned_at: Some(Utc::now().to_rfc3339()) },
        BadgeResponse { id: "star".to_string(), name: "Top Rated".to_string(), icon: "🌟".to_string(), unlocked: false, earned_at: None },
        BadgeResponse { id: "early".to_string(), name: "Early Adopter".to_string(), icon: "🚀".to_string(), unlocked: true, earned_at: Some(Utc::now().to_rfc3339()) },
    ]
}

async fn get_user_rewards(
    State(_state): State<AppState>,
    AuthenticatedUser(claims): AuthenticatedUser,
    Path(user_id): Path<String>,
) -> AppResult<Json<RewardsResponse>> {
    if claims.sub != user_id {
        return Err(AppError::Unauthorized("Access denied".to_string()));
    }

    Ok(Json(RewardsResponse {
        badges: default_badges(&user_id),
        streak: StreakResponse {
            current_streak: 5,
            longest_streak: 12,
            last_ride_date: Some(Utc::now().to_rfc3339()),
        },
        points: 1250,
    }))
}

async fn claim_reward(
    State(state): State<AppState>,
    AuthenticatedUser(claims): AuthenticatedUser,
    Json(body): Json<ClaimRequest>,
) -> AppResult<Json<serde_json::Value>> {
    use mongodb::bson::doc;

    let reward = Reward {
        id: None,
        user_id: claims.sub.clone(),
        badge_id: body.reward_id.clone(),
        badge_name: "Reward".to_string(),
        icon: "🏆".to_string(),
        unlocked: true,
        earned_at: Some(Utc::now()),
    };

    state.rewards().insert_one(reward).await?;

    Ok(Json(serde_json::json!({ "success": true })))
}

pub fn rewards_router() -> Router<AppState> {
    Router::new()
        .route("/api/rewards/:user_id", get(get_user_rewards))
        .route("/api/rewards/claim", post(claim_reward))
}
