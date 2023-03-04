//import needle from "needle";
import fetch from "node-fetch";
import { environment } from "../environment.js";

const REQUEST_OPT = {
    method: 'GET',
    headers: { 
        'Content-Type': 'text/plain',
    }
}

export function setMetaImdbId(malMeta) {
    return fetch(`${environment.IMDB_URL}/${malMeta.meta.name.charAt(0).toLowerCase()}/${malMeta.meta.name.toLowerCase()} ${malMeta.meta.year}.json`, REQUEST_OPT)
        .then(response => response.text())
        .then(response => JSON.parse(response.match(/{.*}/g)))
        .then(data => {
            malMeta.meta.imdb_id = data.d[0].id;
            return malMeta;
        });
}