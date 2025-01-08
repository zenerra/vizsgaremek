import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

import routeDesktop from './routes/asztalivegpontok.js';
app.use("/server/desktop", routeDesktop);

import routeWeb from './routes/webvegpontok.js';
app.use("/server/web", routeWeb);

app.listen(3000, () => {
    console.log('A szerver elindult a http://localhost:3000 porton.');
});