import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../frontend')));

import alkamazott from './routes/alkalmazott.js';
import szamla from './routes/szamla.js';
import termek from './routes/termek.js';
import tetel from './routes/tetel.js';

app.use('/server/alkalmazott', alkamazott);
app.use('/server/szamla', szamla);
app.use('/server/termek', termek);
app.use('/server/tetel', tetel);

app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/html', 'main.html'));
  });



app.listen(3000, () => {
    console.log('A szerver elindult a http://localhost:3000 porton.');
});