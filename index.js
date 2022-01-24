import stremio from 'stremio-addon-sdk';
const { serveHTTP } = stremio;

import { addon } from './lib/addon.js';

serveHTTP(addon.getInterface(), { port: 4200 });