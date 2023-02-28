use serenity::{
    model::prelude::{
        component::InputTextStyle,
        interaction::{
            application_command::ApplicationCommandInteraction, InteractionResponseType,
        },
    },
    prelude::Context,
};

use super::command::{BaseCommand, Command};

pub struct Verify;

#[async_trait::async_trait]
impl Command for Verify {
    fn get(&self) -> BaseCommand {
        BaseCommand::new("verify", "Starts the verification process", None)
    }

    async fn handle(&self, ctx: Context, interaction: ApplicationCommandInteraction) {
        // Send modal
        interaction
            .create_interaction_response(&ctx.http, |resp| {
                resp.kind(InteractionResponseType::Modal)
                    .interaction_response_data(|resp| {
                        resp.components(|c| {
                            c.create_action_row(|row| {
                                row.create_input_text(|text| {
                                    text.custom_id("ctcLinkID")
                                        .min_length(9)
                                        .max_length(9)
                                        .label("Enter your ctcLinkID")
                                        .style(InputTextStyle::Short)
                                        .required(true)
                                })
                            });
                            c.create_action_row(|row| {
                                row.create_input_text(|text| {
                                    text.custom_id("birthDate")
                                        .label("Enter you date of birth (MM/DD/YYYY)")
                                        .min_length(7)
                                        .max_length(7)
                                        .style(InputTextStyle::Short)
                                        .required(true)
                                })
                            })
                        })
                    })
            })
            .await;
    }
}
