import { Client } from "discord.js";

export class GuildConfiguration {
    guildId: string = "";
    verificationChannel: string = "";
    verifiedRole: string = "";

    public serializeConfig(): string {
        return JSON.stringify(this);
    }

    public verifyMember(client: Client, id: string) {
        const guild = client?.guilds.cache.get(this.guildId);
        const member = guild?.members.cache.get(id)
        member?.roles.add(this.getVerifiedRole(client)!);
    }

    private getVerificationChannel(client: Client) {
        return client.channels.cache.get(this.verificationChannel);
    }

    private getVerifiedRole(client: Client) {
        const guild = client?.guilds.cache.get(this.guildId);
        return guild?.roles.cache.get(this.verifiedRole);
    }
}

export class GuildConfigBuilder {
    private readonly _guildConfig: GuildConfiguration;

    constructor(guildId: string) {
        this._guildConfig = new GuildConfiguration();
        this._guildConfig.guildId =  guildId;
    }

    verificationChannel(verificationChannel: string) {
        this._guildConfig.verificationChannel = verificationChannel;
    }

    verifiedRole(verifiedRole: string) {
        this._guildConfig.verifiedRole = verifiedRole;
    }

    build(): GuildConfiguration {
        return this._guildConfig;
    }
}
