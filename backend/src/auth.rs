use axum::{
    async_trait,
    extract::{FromRequestParts, State},
    http::{request::Parts, HeaderMap},
    RequestPartsExt,
};
use jsonwebtoken::{decode, DecodingKey, Validation, Algorithm};
use serde::{Deserialize, Serialize};
use crate::errors::AppError;

pub const JWT_SECRET_ENV: &str = "JWT_SECRET";

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Claims {
    pub sub: String,       // user id
    pub email: String,
    pub exp: usize,        // expiry (unix timestamp)
    pub iat: usize,        // issued at
}

/// Create a signed JWT for a user
pub fn create_token(user_id: &str, email: &str) -> Result<String, AppError> {
    use jsonwebtoken::{encode, EncodingKey, Header};
    use std::time::{SystemTime, UNIX_EPOCH};

    let secret = std::env::var(JWT_SECRET_ENV)
        .unwrap_or_else(|_| "dashdrive-super-secret-jwt-key-2024".to_string());

    let now = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .map_err(|e| AppError::Internal(e.to_string()))?
        .as_secs() as usize;

    let claims = Claims {
        sub: user_id.to_string(),
        email: email.to_string(),
        iat: now,
        exp: now + 7 * 24 * 3600, // 7 days
    };

    encode(
        &Header::default(),
        &claims,
        &EncodingKey::from_secret(secret.as_bytes()),
    )
    .map_err(|e| AppError::Internal(format!("JWT encode error: {e}")))
}

/// Extract and validate JWT from Authorization header
pub fn extract_claims(headers: &HeaderMap) -> Result<Claims, AppError> {
    let secret = std::env::var(JWT_SECRET_ENV)
        .unwrap_or_else(|_| "dashdrive-super-secret-jwt-key-2024".to_string());

    let auth_header = headers
        .get("Authorization")
        .and_then(|v| v.to_str().ok())
        .ok_or_else(|| AppError::Unauthorized("Missing Authorization header".to_string()))?;

    let token = auth_header
        .strip_prefix("Bearer ")
        .ok_or_else(|| AppError::Unauthorized("Invalid Authorization format".to_string()))?;

    let token_data = decode::<Claims>(
        token,
        &DecodingKey::from_secret(secret.as_bytes()),
        &Validation::new(Algorithm::HS256),
    )
    .map_err(|e| AppError::Unauthorized(format!("Invalid token: {e}")))?;

    Ok(token_data.claims)
}

/// Axum extractor — use in handlers as `Extension(claims): Extension<Claims>`
pub struct AuthenticatedUser(pub Claims);

#[async_trait]
impl<S> FromRequestParts<S> for AuthenticatedUser
where
    S: Send + Sync,
{
    type Rejection = AppError;

    async fn from_request_parts(parts: &mut Parts, _state: &S) -> Result<Self, Self::Rejection> {
        let claims = extract_claims(&parts.headers)?;
        Ok(AuthenticatedUser(claims))
    }
}
