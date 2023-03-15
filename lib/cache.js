import Cache from 'node-cache';
import { default as nodefetch } from "node-fetch";

const cache = new Cache({
    stdTTL: 60 * 60 * 24,
    checkperiod: 60 * 60 * 24
});

export const fetch = (url, options) => {
    const cached = cache.get(url);
    if(cached) {
        return Promise.resolve(cached);
    }
    
    return nodefetch(url, options)
        .then(response => response.json())
        .then(response => {
            cache.set(url, response);
            return response;
        });
}

export const fetchText = (url, options) => {
    const cached = cache.get(url);
    if(cached) {
        return Promise.resolve(cached);
    }
    
    return nodefetch(url, options)
    .then(response => response.text())
    .then(response => {
        cache.set(url, response);
        return response;
    });
}