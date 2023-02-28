use serenity::{
    builder::{CreateApplicationCommand, CreateApplicationCommandOption},
    model::prelude::interaction::application_command::ApplicationCommandInteraction,
    prelude::Context,
};

type Options = Vec<CreateApplicationCommandOption>;
pub struct BaseCommand {
    name: String,
    description: String,
    options: Options,
}

impl BaseCommand {
    pub fn new(name: &str, description: &str, options: Option<Options>) -> BaseCommand{
        // Ensure we don't have too many options
        let opt = match options {
            None => Vec::new(),
            Some(val) => {
                if val.len() > 25 {
                    panic!("Too many options");
                }
                val.to_vec()
            }
        };

        let name = String::from(name);
        let description = String::from(description);
        let options = opt.to_vec();

        BaseCommand {
            name,
            description,
            options,
        }
    }
}

#[async_trait::async_trait]
pub trait Command {

    fn get(&self) -> BaseCommand;
    async fn handle(&self, ctx: Context, interaction: ApplicationCommandInteraction);

    fn register<'a>(&self, command: &'a mut CreateApplicationCommand) -> &'a mut CreateApplicationCommand {
        let cmd = self.get();
        command.name(cmd.name).description(cmd.description);

        // Register all options
        for opt in cmd.options {
            command.add_option(opt);
        }
        command
    }
}