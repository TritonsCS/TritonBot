use async_trait::async_trait;
use serenity::{
    model::prelude::interaction::application_command::ApplicationCommandInteraction,
    prelude::Context,
};

use super::command::{BaseCommand, Command};
pub struct Xy;

#[async_trait]
impl Command for Xy {
    fn get(&self) -> BaseCommand {
        BaseCommand::new("xy", "Explains the XY problem", None)
    }

    async fn handle(&self, ctx: Context, interaction: ApplicationCommandInteraction) {
        
    }
}
