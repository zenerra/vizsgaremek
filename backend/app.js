import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Debug middleware
app.use((req, res, next) => {
    console.log(`Request: ${req.method} ${req.url}`);
    next();
});

app.use((req, res, next) => {
    const originalJson = res.json;
    res.json = function (data) {
        console.log(`Response for ${req.method} ${req.url}:`, data, `Status: ${res.statusCode}`);
        return originalJson.call(this, data);
    };
    next();
});

// Statikus fájlok kiszolgálása
app.use('/web', express.static(path.join(__dirname, '../frontend/html')));
app.use('/script', express.static(path.join(__dirname, '../frontend/script')));
app.use('/style', express.static(path.join(__dirname, '../frontend/style')));
app.use('/images', express.static(path.join(__dirname, '../frontend/images')));

// Routerek
import alkalmazott from './routes/alkalmazott.js';
app.use('/server/alkalmazott', alkalmazott);
console.log("Mounted route: /server/alkalmazott");

import szamla from './routes/szamla.js';
app.use('/server/szamla', szamla);
console.log("Mounted route: /server/szamla");

import termek from './routes/termek.js';
app.use('/server/termek', termek);
console.log("Mounted route: /server/termek");

import tetel from './routes/tetel.js';
app.use('/server/tetel', tetel);
console.log("Mounted route: /server/tetel");

import beszallito from './routes/beszallito.js';
app.use('/server/beszallito', beszallito);
console.log("Mounted route: /server/beszallito");

// Catch-all for 404
app.use((req, res) => {
    console.log(`404: Unmatched route ${req.method} ${req.url}`);
    res.status(404).json({ error: 'Route not found' });
});

// Error-handling middleware
app.use((err, req, res, next) => {
    console.error(`Error in ${req.method} ${req.url}:`, err);
    res.status(500).json({ error: 'Internal server error' });
});

// Root redirect
app.get('/', (req, res) => {
    res.redirect('/web/login.html');
});

app.listen(port, () => {
    console.log(`A szerver elindult a http://localhost:${port} porton.`);
    console.log(`Bejelentkezési felület: http://localhost:${port}/web/login.html`);
});