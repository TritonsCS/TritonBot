import { EmbedBuilder, InteractionReplyOptions } from 'discord.js'

export class Embeds {

    static BasicEmbed(message: string): InteractionReplyOptions {
        return {
            embeds: [new EmbedBuilder()
                .setColor(0x004d71)
                .setDescription(message)
            ],
            ephemeral: true
        }
    }

    static TitledEmbed(title: string, message: string, ephemeral: boolean = true): InteractionReplyOptions {
        return {
            embeds: [new EmbedBuilder()
                .setColor(0x004d71)
                .setTitle(title)
                .setDescription(message)
            ],
            ephemeral: ephemeral
        }
    }


    static BasicError(message: string): InteractionReplyOptions {
        return {
            embeds: [new EmbedBuilder()
                .setColor('Red')
                .setTitle('Error')
                .setDescription(message)],
            ephemeral: true
        }
    }

    static readonly DefaultError: InteractionReplyOptions = {
        embeds: [new EmbedBuilder()
            .setColor('Red')
            .setTitle('Error')
            .setDescription('`An error has occured`')],
        ephemeral: true
    }

    static readonly CommandError: InteractionReplyOptions = {
        embeds: [new EmbedBuilder()
            .setColor('Red')
            .setTitle('Error')
            .setDescription('`This command cannot be executed here`'),
        ],
        ephemeral: true,
    }



}
