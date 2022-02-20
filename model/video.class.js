export class Video {
    constructor(cinemetaVideo) {
        this.id = cinemetaVideo.id;
        this.name = cinemetaVideo.name;
        this.episode = cinemetaVideo.episode;
        this.released = cinemetaVideo.released;
        this.season = cinemetaVideo.season;
        this.tvdb_id = cinemetaVideo.tvdb_id;
        this.overview = cinemetaVideo.overview;
        this.description = cinemetaVideo.description;
    }
}