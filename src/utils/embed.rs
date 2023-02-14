use serenity::{builder::CreateEmbed, utils::Color};

const DEFAULT_COLOR: Color = Color::new(0x004d71);

pub struct BasicEmbed;

#[allow(dead_code)]
impl BasicEmbed {
    fn create(color: Color, desc: &str) -> CreateEmbed {
        let mut e = CreateEmbed::default();
        e.color(color);
        e.description(String::from(desc));
        e
    }

    pub fn of(desc: &str) -> CreateEmbed {
        Self::create(DEFAULT_COLOR, &desc)
    }

    pub fn err(desc: &str) -> CreateEmbed {
        Self::create(Color::RED, &desc)
    }
}
