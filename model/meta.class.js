import { config } from '../manifest.js';
import { MetaLink } from './meta-link.class.js';

export class Meta {
    constructor(malAnime) {
        this.id = `${config.prefix}:${malAnime.id}`;
        this.mal_id = malAnime.id;
        this.type = malAnime.media_type === 'movie'? 'movie' : 'series';
        this.name = malAnime.title;
        this.poster = malAnime.main_picture?.medium;
        this.background = malAnime.main_picture?.large;
        this.releaseInfo = this.setReleaseInfo(malAnime.start_date, malAnime.end_date);
        this.imdbRating = malAnime.mean;
        this.description = malAnime.synopsis;
        this.runtime = `${Math.ceil(malAnime.average_episode_duration/60)}min`;
        this.links = [ new MetaLink() ]
    }

    setReleaseInfo(start_date, end_date) {
        let rInfo = `${start_date.split('-')[0]}-${end_date !== undefined? end_date.split('-')[0] : ''}`;
    }
}