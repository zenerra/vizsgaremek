import express from 'express';
import * as db from '../db.js';
const router = express.Router();

export const routes = express.Router();


router.get('/:aazon', async (req, res) => {
    let alkalmazott = await db.WBelepes(req.params.aazon);
    res.header('Content-Type', 'application/json');
    res.status(201).send(alkalmazott);
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

router.get('/', async (req, res) => {
    let szamlak = await db.WSzamlak();
    res.header('Content-Type', 'application/json');
    res.status(201).send(szamlak);
});

router.post('/', async (req, res) => {
    let updateszamla= await db.WUpdateSzamla(req.body);
    res.header('Content-Type', 'application/json');
    res.status(201).send(updateszamla);
});
    
router.get('/', async (req, res) => {
    let munkaadatok = await db.WMunkaAdatok();
    res.header('Content-Type', 'application/json');
    res.status(201).send(munkaadatok);
});

router.get('/', async (req, res) => {
    let szamlaadatok = await db.WSzamlaAdatok();
    res.header('Content-Type', 'application/json');
    res.status(201).send(szamlaadatok);
});






export default router;