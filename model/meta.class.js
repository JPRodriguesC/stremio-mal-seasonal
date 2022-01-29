import { config } from '../manifest.js';
import { MetaLink } from './meta-link.class.js';
import { Video } from './video.class.js';

export class Meta {
    constructor(malAnime) {
        this.id = `${config.prefix}:${malAnime.id}`;
        this.mal_id = malAnime.id;
        this.type = malAnime.media_type === 'movie'? 'movie' : 'series';
        this.name = malAnime.title;
        this.poster = malAnime.main_picture?.large;
        this.background = malAnime.main_picture?.large;
        this.releaseInfo = this.setReleaseInfo(malAnime.start_date, malAnime.end_date);
        this.imdbRating = malAnime.mean;
        this.description = malAnime.synopsis;
        this.runtime = `${Math.ceil(malAnime.average_episode_duration/60)}min`;
        this.links = this.setMetaLinks(),
        this.videos = this.setVideos(malAnime.id, malAnime.num_episodes, malAnime.start_date, malAnime.broadcast);
    }

    setReleaseInfo(start_date, end_date) {
        return `${start_date.split('-')[0]}-${end_date !== undefined? end_date.split('-')[0] : ''}`;
    }

    setMetaLinks() {
        return [];
    }

    setVideos(animeId, numberOfEpisodes, startDate, broadcastData) {
        let videos = [];
        if(numberOfEpisodes && broadcastData) {
            numberOfEpisodes = numberOfEpisodes === 0 ? 12 : numberOfEpisodes; 
            for (let episode = 1; episode <= numberOfEpisodes; episode++) {
                let video = new Video(animeId, episode);
                if(episode === 1)
                    video.setStartBroadcast(startDate, broadcastData.start_time);
                else
                    video.setNextDateOfBroadcast(
                        videos[episode - 2].released.substring(0, 10), 
                        broadcastData.day_of_the_week, 
                        broadcastData.start_time);

                videos.push(video);
            }
        }

        return videos;
    }
}