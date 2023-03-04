import { addonBuilder } from "stremio-addon-sdk";
import { manifest, config } from "../manifest.js";
import * as malApi from "./mal.api.js";
import * as cinemetaApi from './cinemeta.api.js';
import * as imdbApi from './imdb.api.js';

export const addon = new addonBuilder(manifest);

//Anime Page
addon.defineMetaHandler(args => {
    if(args.type === config.type && args.id.startsWith(config.prefix)) {
        return malApi.getAnimeDetails(args.id.split(':')[1])
                .then(malMeta => imdbApi.setMetaImdbId(malMeta))
                .then(malMeta => cinemetaApi.updateMetaFromCinemeta(malMeta));
    }
});

//Anime Catalog
addon.defineCatalogHandler(args => {
    let year = new Date().getFullYear();
    if(args.extra.search) {
        return malApi.getAnimeList(args.extra.search);
    }
    else if(args.extra.genre) {
        let season = args.extra.genre.toLowerCase();
        if(season.includes('old')) {
            year -= 1;
            season = season.split('(')[0].trim();
        }
        
        return malApi.getSeasonalAnime(year, season);
    }
    else if(args.type === config.type && args.id.startsWith(config.prefix)) {
        return malApi.getSeasonalAnime(year, malApi.convertMonthToSeason(new Date().getMonth()));
    }
});