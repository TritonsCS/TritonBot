use serenity::{
    model::prelude::interaction::application_command::ApplicationCommandInteraction,
    prelude::Context,
};

use super::command::{BaseCommand, Command};
use crate::utils::discord_util::{respond, BasicEmbed};

pub struct Ping;

#[async_trait::async_trait]
impl Command for Ping {
    fn get() -> BaseCommand {
        BaseCommand::new("ping", "Check Ping the bot", None)
    }

    async fn handle(ctx: Context, interaction: ApplicationCommandInteraction) {
        let embed = BasicEmbed::of("`Pong`");
        respond(ctx, interaction, embed);
    }
}
