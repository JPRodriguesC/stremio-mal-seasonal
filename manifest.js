export const config = {
    type: 'series',
    version: '0.0.1',
    prefix: 'mal'
};

export const manifest = {
    id: 'com.stremio.mal.season',
    name: 'My Anime List',
    description: 'List all shows on currently season according to MAL',
    version: config.version,
    resources:  ["catalog", "meta"],
    types: [config.type],
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
    idPrefixes: [config.prefix]
};

