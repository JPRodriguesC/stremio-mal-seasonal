export class Video {
    constructor(animeId, episodeNumber) {
        this.id = `${animeId}${episodeNumber}`;
        this.title = `Episode ${episodeNumber}`;
        this.episode = episodeNumber;
        this.released = undefined;
        this.season = 1;
    }

    setNextDateOfBroadcast(lastEpisode, newEpisodeDayOfTheWeek) {
        let [ year, month, day ] = lastEpisode.split('-');
        let newEpisodeDate = new Date(+year, +month - 1, +day);
        let lastEpisodeDate = new Date(+year, +month - 1, +day);
        let newEpNumberOfTheWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
            .findIndex(ind => ind.includes(newEpisodeDayOfTheWeek));

        newEpisodeDate.setDate(lastEpisodeDate.getDate() + 7);
        if(newEpNumberOfTheWeek < newEpisodeDate.getDay()) {
            newEpisodeDate.setDate(lastEpisodeDate.getDate() + 7 + (newEpNumberOfTheWeek - newEpisodeDate.getDay()));
        }
        else if(newEpNumberOfTheWeek > newEpisodeDate.getDay()) {
            newEpisodeDate.setDate(lastEpisodeDate.getDate() + 7 - (newEpisodeDate.getDay() - newEpNumberOfTheWeek));
        }

        this.released = broadcastString(newEpisodeDate);
    }

    setStartBroadcast(startDate) {
        this.released = `${startDate}T10:00:00.000Z`;
    }
}

function broadcastString(date) {
    return `${date.toISOString().substring(0,10)}T10:00:00.000Z`;
}