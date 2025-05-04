import express from 'express';
import * as db from '../db.js';
const router = express.Router();

export const routes = express.Router();

router.get('/uzlet', async (req, res) => {
    try {
        let uzlet = await db.DUzlet();
        res.json(uzlet);
    } catch (error) {
        console.error('Error fetching adress of the store:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

export default router;