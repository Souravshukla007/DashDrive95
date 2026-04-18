use axum::{
    extract::State,
    routing::post,
    Json, Router,
};
use bcrypt::{hash, verify, DEFAULT_COST};
use chrono::Utc;
use mongodb::bson::{doc, oid::ObjectId};
use serde::{Deserialize, Serialize};

use crate::{
    auth::create_token,
    db::AppState,
    errors::{AppError, AppResult},
    models::{Subscription, User},
};

// ─── Request / Response Types ────────────────────────────────────────────────

#[derive(Deserialize)]
pub struct RegisterRequest {
    pub name: String,
    pub email: String,
    pub password: String,
    pub phone: Option<String>,
}

#[derive(Deserialize)]
pub struct LoginRequest {
    pub email: String,
    pub password: String,
}

#[derive(Serialize)]
pub struct AuthResponse {
    pub token: String,
    pub user: UserPublic,
}

#[derive(Serialize)]
pub struct UserPublic {
    pub id: String,
    pub name: String,
    pub email: String,
    pub phone: Option<String>,
    pub subscription: String,
}

// ─── Handlers ────────────────────────────────────────────────────────────────

async fn register(
    State(state): State<AppState>,
    Json(body): Json<RegisterRequest>,
) -> AppResult<Json<AuthResponse>> {
    // Check if email already exists
    let exists = state
        .users()
        .find_one(doc! { "email": &body.email })
        .await?;

    if exists.is_some() {
        return Err(AppError::BadRequest("Email already registered".to_string()));
    }

    let password_hash = hash(&body.password, DEFAULT_COST)
        .map_err(|e| AppError::Internal(format!("bcrypt error: {e}")))?;

    let user = User {
        id: None,
        name: body.name,
        email: body.email.clone(),
        password_hash,
        phone: body.phone,
        subscription: Subscription::Basic,
        created_at: Utc::now(),
    };

    let result = state.users().insert_one(user.clone()).await?;
    let user_id = result.inserted_id.as_object_id()
        .map(|oid| oid.to_hex())
        .unwrap_or_default();

    let token = create_token(&user_id, &user.email)?;

    Ok(Json(AuthResponse {
        token,
        user: UserPublic {
            id: user_id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            subscription: "basic".to_string(),
        },
    }))
}

async fn login(
    State(state): State<AppState>,
    Json(body): Json<LoginRequest>,
) -> AppResult<Json<AuthResponse>> {
    let user = state
        .users()
        .find_one(doc! { "email": &body.email })
        .await?
        .ok_or_else(|| AppError::Unauthorized("Invalid email or password".to_string()))?;

    let valid = verify(&body.password, &user.password_hash)
        .map_err(|e| AppError::Internal(format!("bcrypt verify error: {e}")))?;

    if !valid {
        return Err(AppError::Unauthorized("Invalid email or password".to_string()));
    }

    let user_id = user.id.as_ref().map(|id| id.to_hex()).unwrap_or_default();
    let token = create_token(&user_id, &user.email)?;

    let subscription_str = match user.subscription {
        Subscription::Pro => "pro",
        Subscription::Premium => "premium",
        _ => "basic",
    };

    Ok(Json(AuthResponse {
        token,
        user: UserPublic {
            id: user_id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            subscription: subscription_str.to_string(),
        },
    }))
}

async fn refresh(
    State(state): State<AppState>,
    axum::extract::TypedHeader(auth): axum::extract::TypedHeader<
        axum::http::header::Authorization<axum::http::header::authorization::Bearer>,
    >,
) -> AppResult<Json<serde_json::Value>> {
    let claims = crate::auth::extract_claims(&{
        let mut headers = axum::http::HeaderMap::new();
        headers.insert(
            axum::http::header::AUTHORIZATION,
            format!("Bearer {}", auth.token()).parse().unwrap(),
        );
        headers
    })?;

    let new_token = create_token(&claims.sub, &claims.email)?;
    Ok(Json(serde_json::json!({ "token": new_token })))
}

// ─── Router ──────────────────────────────────────────────────────────────────

pub fn auth_router() -> Router<AppState> {
    Router::new()
        .route("/api/auth/register", post(register))
        .route("/api/auth/login", post(login))
}
