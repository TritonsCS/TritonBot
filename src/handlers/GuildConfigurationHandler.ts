import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { GuildConfiguration } from "types/configuration";

const guildConfigMap = new Map<string, GuildConfiguration>();
const configFile = "configurations.json"


export function addGuildConfig(guildConfig: GuildConfiguration) {
    guildConfigMap.set(guildConfig.guildId, guildConfig);
}

export function getGuildConfig(guildId: string) {
    return guildConfigMap.get(guildId) ?? null;
}

export function hasGuildConfig(guildId: string): boolean {
    return guildConfigMap.has(guildId)
}

export function saveGuildConfig(guildId: string) {

}

export function loadGuildConfigurations() {
    // Create data directory if it doesn't exist
    const dataDir = join(__dirname, '..', 'data');
    const config = join(dataDir, 'config.json');
    if (!existsSync(dataDir)) {
        mkdirSync(dataDir, { recursive: true })
        const emptyConfig = { guildConfigs: {} }
        writeFileSync(config, JSON.stringify(emptyConfig));
        return;
    } else {
        const data = JSON.parse(readFileSync(config, "utf-8"));
    }


}