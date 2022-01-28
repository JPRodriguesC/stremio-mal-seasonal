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
    let year = new Date().getFullYear();
    if(args.extra.search) {
        return malService.getAnimeList(args.extra.search);
    }
    else if(args.extra.genre) {
        let season = args.extra.genre.toLowerCase();
        if(season.includes('old')) {
            year -= 1;
            season = season.split('(')[0].trim();
        }
        
        return malService.getSeasonalAnime(year, season);
    }
    else if(args.type === config.type && args.id.startsWith(config.prefix)) {
        return malService.getSeasonalAnime(year, malService.convertMonthToSeason(new Date().getMonth()));
    }
});