import { config } from '../manifest.js';
import { MetaLink } from './meta-link.class.js';
import { Video } from './video.class.js';

export class Meta {
    constructor(malAnime) {
        this.id = `${config.prefix}:${malAnime.id}`;
        this.mal_id = malAnime.id;
        this.imdb_id = '';
        this.type = malAnime.media_type === 'movie'? 'movie' : 'series';
        this.name = malAnime.title;
        this.englishName = malAnime.alternative_titles?.en;
        this.poster = malAnime.main_picture?.large;
        this.background = malAnime.main_picture?.large;
        this.logo = '';
        this.year = malAnime.start_date.split('-')[0];
        this.releaseInfo = this.setReleaseInfo(malAnime.end_date);
        this.imdbRating = malAnime.mean;
        this.description = malAnime.synopsis;
        this.runtime = `${Math.ceil(malAnime.average_episode_duration/60)}min`;
        this.videos = [];
    }

    setReleaseInfo(end_date) {
        return `${this.year}-${end_date !== undefined? end_date.split('-')[0] : ''}`;
    }

    setVideos(cinemetaVideos) {
        this.videos = cinemetaVideos.map(v => new Video(v));
    }
}