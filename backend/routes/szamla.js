import express from 'express';
import * as db from '../db.js';
import { WPaymentPreference, WMonthlySales } from '../db.js'; 

const router = express.Router();

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
    try {
        let szamlak = await db.WSzamlak();
        res.header('Content-Type', 'application/json');
        res.status(200).send(szamlak);
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ error: 'Failed to fetch transactions' });
    }
});

router.get('/payment-preference', async (req, res) => {
    try {
        const result = await WPaymentPreference();
        res.json(result);
    } catch (error) {
        console.error('Error fetching payment preference:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/monthly-sales', async (req, res) => {
    try {
        const result = await WMonthlySales();
        res.json(result);
    } catch (error) {
        console.error('Error fetching monthly sales:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/', async (req, res) => {
    try {
        let updateszamla = await db.WUpdateSzamla(req.body);
        res.header('Content-Type', 'application/json');
        res.status(200).send(updateszamla);
    } catch (error) {
        console.error('Error updating transaction:', error);
        res.status(500).json({ error: 'Failed to update transaction' });
    }
});

router.delete('/:sazon', async (req, res) => {
    const { sazon } = req.params;
    try {
        await db.connection.execute('DELETE FROM tetel WHERE sazon = ?', [sazon]);
        await db.connection.execute('DELETE FROM szamla WHERE sazon = ?', [sazon]);
        res.status(200).json({ message: 'Transaction deleted successfully' });
    } catch (error) {
        console.error('Error deleting transaction:', error);
        res.status(500).json({ error: error.message || 'Failed to delete transaction' });
    }
});

router.get('/statisztika', async (req, res) => {
    let szamlaadatok = await db.WSzamlaAdatok();
    res.header('Content-Type', 'application/json');
    res.status(201).send(szamlaadatok);
});

export default router;