import express from 'express';
import * as db from '../db.js';
const router = express.Router();

export const routes = express.Router();

router.post('/', async (req, res) => {
    let ujTetel = await db.DUjTetel(req.body);
    res.header('Content-Type', 'application/json');
    res.status(201).send(ujTetel);
});

export default router;