mod auth;
mod db;
mod errors;
mod models;
mod routes;

use axum::{
    extract::{
        ws::{Message, WebSocket, WebSocketUpgrade},
        Path, State,
    },
    response::IntoResponse,
    routing::get,
    Router,
};
use db::AppState;
use futures_util::{SinkExt, StreamExt};
use routes::{
    auth::auth_router,
    payments::payments_router,
    rewards::rewards_router,
    rides::rides_router,
    subscriptions::subscriptions_router,
};
use std::net::SocketAddr;
use tokio::time::{sleep, Duration};
use tower_http::cors::{Any, CorsLayer};
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};

// ─── WebSocket: Real-time Ride Tracking ─────────────────────────────────────

async fn ws_handler(
    ws: WebSocketUpgrade,
    Path(ride_id): Path<String>,
    State(_state): State<AppState>,
) -> impl IntoResponse {
    ws.on_upgrade(move |socket| handle_socket(socket, ride_id))
}

async fn handle_socket(mut socket: WebSocket, ride_id: String) {
    tracing::info!("🔌 WebSocket connected for ride: {ride_id}");

    // Simulate ride status updates
    let statuses = vec![
        r#"{"status":"accepted","eta":"4 min","driver":"Suresh K."}"#,
        r#"{"status":"in_progress","eta":"2 min","location":{"lat":12.97,"lng":77.59}}"#,
        r#"{"status":"arriving","eta":"30 sec"}"#,
        r#"{"status":"completed","message":"Ride completed. Rate your driver!"}"#,
    ];

    for (i, status) in statuses.iter().enumerate() {
        sleep(Duration::from_secs(5)).await;
        if socket.send(Message::Text(status.to_string().into())).await.is_err() {
            tracing::info!("🔌 WebSocket client disconnected (ride: {ride_id})");
            return;
        }
        tracing::info!("📡 Sent status update {} for ride {ride_id}", i + 1);
    }

    tracing::info!("✅ WebSocket session ended for ride: {ride_id}");
}

// ─── Health Check ────────────────────────────────────────────────────────────

async fn health() -> impl IntoResponse {
    axum::Json(serde_json::json!({
        "status": "ok",
        "service": "DashDrive API",
        "version": "1.0.0"
    }))
}

// ─── Main ────────────────────────────────────────────────────────────────────

#[tokio::main]
async fn main() {
    // Load .env file
    dotenvy::dotenv().ok();

    // Initialize tracing
    tracing_subscriber::registry()
        .with(
            tracing_subscriber::EnvFilter::try_from_default_env()
                .unwrap_or_else(|_| "backend=info,tower_http=info".parse().unwrap()),
        )
        .with(tracing_subscriber::fmt::layer())
        .init();

    tracing::info!("🚀 DashDrive API starting up...");

    // Connect to MongoDB
    let state = AppState::new().await.unwrap_or_else(|e| {
        tracing::error!("❌ Failed to connect to MongoDB: {e}");
        tracing::warn!("⚠️  Running without DB — some endpoints may fail");
        // Still start the server, just with failed state
        panic!("Cannot start without database: {e}");
    });

    // CORS — allow Next.js frontend
    let cors = CorsLayer::new()
        .allow_origin(Any)
        .allow_methods(Any)
        .allow_headers(Any);

    // Build router
    let app = Router::new()
        .route("/health", get(health))
        .route("/ws/ride/{ride_id}", get(ws_handler))
        .merge(auth_router())
        .merge(rides_router())
        .merge(payments_router())
        .merge(subscriptions_router())
        .merge(rewards_router())
        .layer(cors)
        .with_state(state);

    let port = std::env::var("PORT")
        .unwrap_or_else(|_| "8080".to_string())
        .parse::<u16>()
        .unwrap_or(8080);

    let addr = SocketAddr::from(([0, 0, 0, 0], port));
    tracing::info!("🌐 DashDrive API listening on http://{addr}");
    tracing::info!("🔗 Frontend should point to http://localhost:{port}");
    tracing::info!("📡 WebSocket at ws://localhost:{port}/ws/ride/:ride_id");

    let listener = tokio::net::TcpListener::bind(addr).await.unwrap();
    axum::serve(listener, app).await.unwrap();
}
