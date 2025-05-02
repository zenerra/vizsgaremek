import express from 'express';
import * as db from '../db.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
      let beszallito = await db.WGetBeszallito();
      console.log("Suppliers fetched:", beszallito);
      console.log("Status set to 200");
      res.status(200).json(beszallito);
  } catch (error) {
      console.error('Error fetching suppliers:', error);
      res.status(500).json({ error: error.message || 'Server error' });
  }
});

export default router;