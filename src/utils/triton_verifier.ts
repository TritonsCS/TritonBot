
import axios from 'axios'
import { ModalSubmitInteraction } from 'discord.js'
import FormData from 'form-data'
import { Embeds } from './discord_utils'
import { verifiedRole } from '../config.json'

const ERROR_MSG = 'Triton Access account not found'

/**
 * Checks if an account exists for the given details
 * 
 * @param id The ctcLinkID
 * @param birthDate The date of birth
 * @returns {@link Promise<boolean>} if the response returns the correct details  
 */
async function checkAccount(id: string, birthDate: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
        // Create form
        const form = new FormData()
        form.append('txtID', id)
        form.append('txtBDate', birthDate)
        form.append('btnSubmit', 'Submit')

        // Submit form
        try {
            const response = await axios({
                method: 'post',
                url: 'https://app.edcc.edu/TritonIDLookup/getID.cfm',
                data: form
            })
            const html: string = response.data
            resolve(!html.includes(ERROR_MSG))
        } catch (error) {
            reject(error)
        }
    })
}

async function addVerifiedRole(interaction: ModalSubmitInteraction) {
    const id = interaction.user.id
    const member = interaction.guild?.members.cache.get(id)
    const role = member?.guild.roles.cache.find(r => r.id === verifiedRole)
    await member?.roles.add(role!)
}

export async function verifyStudent(ctcId: string, birthDate: string, interaction: ModalSubmitInteraction) {
    try {
        const hasAccount = await checkAccount(ctcId, birthDate)
        if (hasAccount) {
            addVerifiedRole(interaction)
            return
        }

        await interaction.reply(Embeds.BasicError('Could not find a valid account'))
    } catch (error) {
        console.log(error)
        await interaction.reply(Embeds.DefaultError)
    }
}


