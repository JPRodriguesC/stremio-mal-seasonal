export const config = {
    type: 'series',
    version: '0.0.1',
    prefix: 'mal'
};

export const manifest = {
    id: 'com.stremio.mal.season',
    name: 'My Anime List seasonal anime',
    description: 'List all shows on currently season according to MAL',
    version: config.version,
    resources:  ["catalog", "meta"],
    types: [config.type],
    catalogs: [
        {
            id: 'mal_season_anime',
            name: `Mal Seasonal`,
            type: config.type,
            genres: [ 'Winter', 'Spring', 'Summer', 'Fall' ],
            extra: [ 
                {
                    name: 'genre', 
                    isRequired: false,
                    options: [ 'Winter', 'Spring', 'Summer', 'Fall' ]
                }
            ]
        }
    ],
    idPrefixes: [config.prefix]
};

