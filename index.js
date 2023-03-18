import stremio from 'stremio-addon-sdk';
import { config } from 'dotenv';
import { addon } from './lib/addon.js';

const { serveHTTP } = stremio;

config();
serveHTTP(addon.getInterface(), { port: process.env.PORT });