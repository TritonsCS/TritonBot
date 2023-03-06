import { EmbedBuilder, InteractionReplyOptions } from 'discord.js'

export class Embeds {

    static BasicEmbed(message: string, ephermal: boolean = true): InteractionReplyOptions {
        return {
            embeds: [new EmbedBuilder()
                .setColor(0x004d71)
                .setDescription(message)
            ],
            ephemeral: ephermal
        }
    }

    static TitledEmbed(title: string, message: string, ephermal: boolean = true): InteractionReplyOptions {
        return {
            embeds: [new EmbedBuilder()
                .setColor(0x004d71)
                .setTitle(title)
                .setDescription(message)
            ],
            ephemeral: ephermal
        }
    }


    static BasicError(message: string, ephermal: boolean = true): InteractionReplyOptions {
        return {
            embeds: [new EmbedBuilder()
                .setColor('Red')
                .setTitle('Error')
                .setDescription(message)],
            ephemeral: ephermal
        }
    }

    static readonly DefaultError: InteractionReplyOptions = {
        embeds: [new EmbedBuilder()
            .setColor('Red')
            .setTitle('Error')
            .setDescription('An error has occured')],
        ephemeral: true
    }

    static readonly CommandError: InteractionReplyOptions = {
        embeds: [new EmbedBuilder()
            .setColor('Red')
            .setTitle('Error')
            .setDescription('This command cannot be executed here'),
        ],
        ephemeral: true,
    }



}
