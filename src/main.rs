mod commands;
mod utils;
use commands::command::Command;
use commands::ping::Ping;
use commands::verify::Verify;
use commands::xy::Xy;
use dotenv::dotenv;
use serenity::async_trait;
use serenity::model::prelude::interaction::Interaction;
use serenity::model::prelude::{GuildId, Ready};
use serenity::prelude::*;
use std::env::var;

struct Handler;

#[async_trait]
impl EventHandler for Handler {
    // Ready Event
    async fn ready(&self, ctx: Context, ready: Ready) {
        // Get guild id
        let guild_id = GuildId(
            var("GUILD_ID")
                .expect("Expected guild id in env")
                .parse()
                .expect("Guild id must be of type int"),
        );

        // Register slash command in guild
        let result = GuildId::set_application_commands(&guild_id, &ctx.http, |cmds| {
            cmds.create_application_command(|c| Ping.register(c))
                .create_application_command(|c| Verify.register(c))
                .create_application_command(|c| Xy.register(c))
        })
        .await;

        match result {
            Err(_) => panic!("Could not register commands"),
            Ok(_) => {}
        };

        println!("{} is online", ready.user.name);
    }

    // Interaction event
    async fn interaction_create(&self, ctx: Context, interaction: Interaction) {
        if let Interaction::ApplicationCommand(command) = interaction {
            let content = match command.data.name.as_str() {
                _ => unimplemented!(""),
            };
        }
    }
}

#[tokio::main]
async fn main() {
    dotenv().ok().expect("Could not load .env file");

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
