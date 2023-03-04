export class Video {
    constructor(cinemetaVideo) {        
        this.id = cinemetaVideo.id;
        this.title = cinemetaVideo.title ?? cinemetaVideo.name;
        this.released = cinemetaVideo.released;
        this.episode = cinemetaVideo.episode;
        this.season = cinemetaVideo.season;
        this.overview = cinemetaVideo.overview;
    }
}