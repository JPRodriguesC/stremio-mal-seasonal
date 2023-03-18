import { fetch } from "./cache.js";

const REQUEST_OPT = {
    method: 'GET',
    headers: { 
        'Content-Type': 'application/json',
    }
}

export function updateMetaFromCinemeta(malMeta) {
    return fetch(`${process.env.CINEMETA_URL}/series/${malMeta.meta.imdb_id}.json`, REQUEST_OPT)
        .then((response) => {
            if(response && response.meta) {
                if(response.meta.logo) malMeta.meta.logo = response.meta.logo;
                if(response.meta.background) malMeta.meta.background = response.meta.background;

                malMeta.meta.setVideos(response.meta.videos);
            }
            
            return malMeta;
        });
}