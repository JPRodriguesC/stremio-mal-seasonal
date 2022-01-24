import { addonBuilder } from "stremio-addon-sdk";
import { manifest, config } from "../manifest.js";
import * as malService from "./mal.service.js";

export const addon = new addonBuilder(manifest);

addon.defineMetaHandler(args => {
    if(args.type === config.type && args.id.startsWith(config.prefix)) {
        return malService.getAnimeDetails(args.id.split(':')[1]);
    }
});

addon.defineCatalogHandler(args => {
    if(args.extra.search) {
        return new Promise((resolve, reject) => { resolve({ metas: [] }) });
    }
    else if(args.type === config.type && args.id.startsWith(config.prefix)) {
        return malService.getSeasonalAnime(2022, 'winter');
    }
});