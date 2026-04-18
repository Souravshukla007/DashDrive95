use mongodb::{Client, Database, Collection};
use std::sync::Arc;
use crate::models::{User, Ride, Booking, Payment, Reward};

#[derive(Clone, Debug)]
pub struct AppState {
    pub db: Arc<Database>,
}

impl AppState {
    pub async fn new() -> Result<Self, mongodb::error::Error> {
        let uri = std::env::var("MONGODB_URI")
            .unwrap_or_else(|_| "mongodb://localhost:27017/dashdrive".to_string());

        let client = Client::with_uri_str(&uri).await?;
        let db = client.database("dashdrive");

        // Ping to confirm connection
        client
            .database("admin")
            .run_command(mongodb::bson::doc! { "ping": 1 })
            .await?;

        tracing::info!("✅ Connected to MongoDB at {}", uri);

        Ok(Self {
            db: Arc::new(db),
        })
    }

    pub fn users(&self) -> Collection<User> {
        self.db.collection("users")
    }

    pub fn rides(&self) -> Collection<Ride> {
        self.db.collection("rides")
    }

    pub fn bookings(&self) -> Collection<Booking> {
        self.db.collection("bookings")
    }

    pub fn payments(&self) -> Collection<Payment> {
        self.db.collection("payments")
    }

    pub fn rewards(&self) -> Collection<Reward> {
        self.db.collection("rewards")
    }
}
