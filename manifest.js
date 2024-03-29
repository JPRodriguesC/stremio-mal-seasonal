export const config = {
    type: 'anime',
    version: '0.0.1',
    prefix: 'mal',
    imdbPrefix: 'tt'
};

export const manifest = {
    id: 'com.stremio.mal.season',
    version: config.version,
    name: 'My Anime List',
    description: 'List all shows on currently season according to MAL',
    resources:  ["catalog", "meta"],
    types: [config.type],
    logo: "https://raw.githubusercontent.com/JPRodriguesC/stremio-mal-seasonal/main/public/logo.png",
    catalogs: [
        {
            id: 'mal_season_anime',
            name: `MAL Seasonal`,
            type: config.type,
            genres: [ 'Fall', 'Summer', 'Spring', 'Winter', 'Fall (old)', 'Summer (old)', 'Spring (Old)', 'Winter (Old)' ],
            extra: [ 
                {
                    name: 'genre', 
                    isRequired: false,
                    options: [ 'Fall', 'Summer', 'Spring', 'Winter', 'Fall (old)', 'Summer (old)', 'Spring (Old)', 'Winter (Old)' ]
                },
                { 
                    name: 'search',
                    isRequired: false
                }
            ]
        }
    ],
    idPrefixes: [config.prefix, config.imdbPrefix]
};

