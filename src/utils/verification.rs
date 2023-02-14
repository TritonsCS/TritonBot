use std::{error::Error, io::Read};

use chrono::NaiveDate;
use serenity::{
    http::Http,
    model::prelude::{
        interaction::application_command::ApplicationCommandInteraction, Member, RoleId,
    },
};

const ERROR: &str = "Error: Triton Access account not found";
const URL: &str = "https://app.edcc.edu/TritonIDLookup/getID.cfm";

pub struct Verifier;
type SimpleResult<T> = Result<T, Box<dyn Error>>;

#[allow(dead_code)]
impl Verifier {
    // Check if the member is already verified
    pub fn is_member_verified(interaction: ApplicationCommandInteraction) -> bool {
        match interaction.member {
            Some(member) => member.roles.contains(&RoleId::from(2u64)),
            None => false,
        }
    }

    // Add the verified role to user
    pub async fn add_verified_role(http: impl AsRef<Http>, mut member: Member) -> SimpleResult<()> {
        member.add_role(&http, RoleId::from(20)).await?;
        Ok(())
    }

    // Verfies a user on a modal submission
    pub fn verify_user(ctc_link: &str, date_of_birth: &str) -> SimpleResult<bool> {
        // Fail fast for invalid [date_of_birth]
        NaiveDate::parse_from_str(&date_of_birth, "%m/%d/%Y")?;

        // Send POST request and read response content
        let mut html = String::new();
        let mut post = reqwest::blocking::Client::new()
            .post(URL)
            .form(&[
                ("txtID", ctc_link),
                ("txtBDate", date_of_birth),
                ("btnSubmit", "Submit"),
            ])
            .send()?;

        if post.status().is_success() {
            post.read_to_string(&mut html)?;
        }

        Ok(html.len() > 0 && !html.contains(ERROR))
    }
}
