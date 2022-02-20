import fetch from "node-fetch";
import { environment } from "../environment.js";

const REQUEST_OPT = {
    method: 'GET',
    headers: { 
        'Content-Type': 'application/json',
    }
}

export function updateMetaFromCinemeta(malMeta) {
    return fetch(`${environment.CINEMETA_URL}/${malMeta.meta.type}/${malMeta.meta.imdb_id}.json`, REQUEST_OPT)
        .then(response => response.json())
        .then((response) => {
            console.log(`${environment.CINEMETA_URL}/${malMeta.meta.type}/${malMeta.meta.imdb_id}.json`);
            if(response && response.meta) {
                if(response.meta.logo) malMeta.meta.logo = response.meta.logo;
                if(response.meta.background) malMeta.meta.background = response.meta.background;

                malMeta.meta.setVideos(response.meta.videos);

                return malMeta;
            }
            //TODO: Tratar erro, importante
        });
}