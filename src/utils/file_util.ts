import { existsSync, fstat, mkdir, mkdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { GuildConfiguration } from "types/configuration";



export function writeToJson(fileName: string, obj: GuildConfiguration) {
    let file = join(__dirname, '..', 'data', fileName)
    const json = readFileSync(file, 'utf-8');
    const data = Array.from(JSON.parse(json));
    data.push(obj)
    writeFileSync(file, JSON.stringify(data));
}

