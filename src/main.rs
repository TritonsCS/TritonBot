mod commands;
mod utils;
use dotenv::dotenv;
use serenity::async_trait;
use serenity::model::prelude::Ready;
use serenity::prelude::*;
use std::env::var;

struct Handler;

#[async_trait]
impl EventHandler for Handler {
    // Ready Event
    async fn ready(&self, _: Context, ready: Ready) {
        println!("{} is online", ready.user.name);
    }
}

#[tokio::main]
async fn main() {
    dotenv().expect("Could not load .env file");

    let token = var("token").expect("Missing token");
    let intents = GatewayIntents::GUILD_MESSAGES | GatewayIntents::MESSAGE_CONTENT;

    let mut client = Client::builder(token, intents)
        .event_handler(Handler)
        .await
        .expect("Error creating bot");

    if let Err(cause) = client.start().await {
        println!("Error: {:?}", cause);
    }
}
