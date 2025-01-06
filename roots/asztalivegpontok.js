import express from 'express';
import * as db from '../db.js';
const router = express.Router();

export const routes = express.Router();

router.get('/gepek', async (req, res) => {
    let penztarok = await db.DPenztarok();
    res.header('Content-Type', 'application/json');
    res.status(201).send(penztarok);
});

router.get('belepes/:aazon', async (req, res) => {
    let access = await db.DBelepes(req.params.aazon);
    res.header('Content-Type', 'application/json');
    res.status(201).send(access);
});

router.get('alkalmazott/:aazon', async (req, res) => {
    let alkalmazott = await db.DAlkalmazott(req.params.aazon);
    res.header('Content-Type', 'application/json');
    res.status(201).send(alkalmazott);
});

router.get('/termeklista', async (req, res) => {
    let termekLista = await db.DTermekLista();
    res.header('Content-Type', 'application/json');
    res.status(201).send(termekLista);
});

router.get('termek/:tazon', async (req, res) => {
    let termek = await db.DTermek(req.params.tazon);
    res.header('Content-Type', 'application/json');
    res.status(201).send(termek);
});

router.post('/szamla', async (req, res) => {
    let ujSzamla = await db.DUjSzamla(req.body);
    res.header('Content-Type', 'application/json');
    res.status(201).send(ujSzamla);
});

router.post('/tetel', async (req, res) => {
    let ujTetel = await db.DUjTetel(req.body);
    res.header('Content-Type', 'application/json');
    res.status(201).send(ujTetel);
});

export default router;