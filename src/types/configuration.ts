export class GuildConfiguration {
    guildId: string = "";
    verificationChannel?: string;
    verifiedRole?: string;

    serializeConfig(): string {
        return JSON.stringify(this);
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
