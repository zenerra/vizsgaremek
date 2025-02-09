import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

import alkalmazott from './routes/alkalmazott.js';
app.use("/server/alkalmazott", alkalmazott);

import szamla from './routes/szamla.js';
app.use("/server/szamla", szamla);

import termek from './routes/termek.js';
app.use("/server/termek", termek);

import tetel from './routes/tetel.js';
app.use("/server/tetel", tetel);



app.listen(3000, () => {
    console.log('A szerver elindult a http://localhost:3000 porton.');
});