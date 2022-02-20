import needle from "needle";
import { environment } from "../environment.js";

export function setMetaImdbId(malMeta) {
    return needle('get', `${environment.IMDB_URL}/${malMeta.meta.name.charAt(0).toLowerCase()}/${malMeta.meta.name.toLowerCase()} ${malMeta.meta.year}.json`)
        .then(response => JSON.parse(response.body.toString().match(/{.*}/g)))
        .then(data => {
            console.log(`${environment.IMDB_URL}/${malMeta.meta.name.charAt(0).toLowerCase()}/${malMeta.meta.name.toLowerCase()} ${malMeta.meta.year}.json`);
            console.log(data);
            malMeta.meta.imdb_id = data.d[0].id;
            return malMeta;
        });
}