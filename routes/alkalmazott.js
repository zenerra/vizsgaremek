import express from 'express';
import * as db from '../db.js';
const router = express.Router();

export const routes = express.Router();

router.get('/belepes/:felulet/:aazon', async (req, res) => {
    let access = await db.Belepes(req.params.felulet, req.params.aazon);
    if (access == null) {
        res.status(422).send();
    }
    else{
    res.header('Content-Type', 'application/json');
    res.status(201).send(access);
    }
});

router.get('/:aazon', async (req, res) => {
    let alkalmazott = await db.DAlkalmazott(req.params.aazon);
    res.header('Content-Type', 'application/json');
    res.status(201).send(alkalmazott);
});

router.get('/', async (req, res) => {
    let munkaadatok = await db.WMunkaAdatok();
    res.header('Content-Type', 'application/json');
    res.status(201).send(munkaadatok);
});

export default router;