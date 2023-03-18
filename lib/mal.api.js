import { Meta } from '../model/meta.class.js';
import { fetch } from "./cache.js";


const getRequestOptions = () => {
    return {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'X-MAL-CLIENT-ID': `${process.env.MAL_CLIENT_ID}`
        }
    };
}

const Url = (resource, pathArray, queryObject) => {
    let queryString = '?';
    for(const property in queryObject) {
        queryString += `${property}=${queryObject[property]}&`;
    }

    queryString = queryString.substring(0, queryString.length - 1);
    return `${process.env.MAL_API_URI}${process.env.MAL_API_VERSION}/anime${resource !== ''? ('/' + resource) : ''}${pathArray.length > 0? ('/' + pathArray.join('/')) : ''}${queryString}`;
}

export function getSeasonalAnime(year, season) {
    return fetch(Url('season', [ year, season ], {
                sort: 'anime_num_list_users',
                limit: 500,
                fields: 'media_type,start_date,mean,synopsis'
            }), getRequestOptions())
            .then(res => {
                if(res.data === undefined) {
                    return { metas: []};
                }

                return { metas: res.data.map((anime, index, arr) => { return new Meta(anime.node); }) };
            });
}

export function getAnimeList(search) {
    return fetch(Url('', [], {
                q: search,
                limit: 10,
                fields: 'media_type,start_date,mean,synopsis'
            }), getRequestOptions())
            .then(res => {
                if(res.data === undefined) {
                    return { metas: [] };
                }

                return { metas: res.data.map((anime, index, arr) => { return new Meta(anime.node); }) };
            });
}

export function getAnimeDetails(animeID) {
    return fetch(Url('', [ animeID ], {
                fields: 'media_type,start_date,end_date,mean,synopsis,average_episode_duration,num_episodes,broadcast'
            }), getRequestOptions())
            .then(data => { 
                return { meta: new Meta(data) };
             });
}

export function convertMonthToSeason(month) {
    let seasons = [
        { season: 'winter', months: [0,1,2] },
        { season: 'spring', months: [3,4,5] },
        { season: 'summer', months: [6,7,8] }, 
        { season: 'fall', months: [9,10,11] }
    ];

    return seasons.find(x => x.months.includes(month)).season;
}