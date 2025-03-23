import express from 'express';
import * as db from '../db.js';
const router = express.Router();

export const routes = express.Router();

router.get('/gepek', async (req, res) => {
    let penztarok = await db.DPenztarok();
    res.header('Content-Type', 'application/json');
    res.status(201).send(penztarok);
});

router.post('/', async (req, res) => {
    let ujSzamla = await db.DUjSzamla(req.body);
    res.header('Content-Type', 'application/json');
    res.status(201).send(ujSzamla);
});

router.get('/', async (req, res) => {
    let szamlak = await db.WSzamlak();
    res.header('Content-Type', 'application/json');
    res.status(201).send(szamlak);
});

router.put('/', async (req, res) => {
    let updateszamla= await db.WUpdateSzamla(req.body);
    res.header('Content-Type', 'application/json');
    res.status(201).send(updateszamla);
});

router.get('/statisztika', async (req, res) => {
    let szamlaadatok = await db.WSzamlaAdatok();
    res.header('Content-Type', 'application/json');
    res.status(201).send(szamlaadatok);
});

export default router;