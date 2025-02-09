import express from 'express';
import * as db from '../db.js';
const router = express.Router();

export const routes = express.Router();

router.get('/termeklista', async (req, res) => {
    let termekLista = await db.DTermekLista();
    res.header('Content-Type', 'application/json');
    res.status(201).send(termekLista);
});

router.get('/:tazon', async (req, res) => {
    let termek = await db.DTermek(req.params.tazon);
    res.header('Content-Type', 'application/json');
    res.status(201).send(termek);
});

router.get('/', async (req, res) => {
    let termekek = await db.WTermekek();
    res.header('Content-Type', 'application/json');
    res.status(201).send(termekek);
});

router.post('/', async (req, res) => {
    let updatetermek= await db.WUpdateTermek(req.body);
    res.header('Content-Type', 'application/json');
    res.status(201).send(updatetermek);
});

export default router;