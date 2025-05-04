import express from 'express';
import * as db from '../db.js';
const router = express.Router();

router.get('/all', async (req, res) => {
    try {
        let termekek = await db.GetAllTermek();
        res.json(termekek);
    } catch (error) {
        console.error('Error fetching all products:', error);
        res.status(500).json({ error: error.message || 'Server error' });
    }
});



router.get('/termeklista', async (req, res) => {
    try {
        let termekLista = await db.DTermekLista();
        res.json(termekLista); // res.json automatikusan beállítja a Content-Type-ot
    } catch (error) {
        console.error('Error fetching product list:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/:tazon', async (req, res) => {
    try {
        let termek = await db.DTermek(req.params.tazon);
        res.json(termek);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/', async (req, res) => {
    try {
        let termekek = await db.WTermekek();
        res.json(termekek);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: error.message || 'Server error' });
    }
});




router.post('/', async (req, res) => {
    const { tnev, tkategoria, tar, tmennyiseg, tmennyisegiegyseg, tminkeszlet, trendeles, tkoros, bazon } = req.body;
    try {
        const tazon = Date.now();
        const result = await db.WCreateTermek({
            tazon,
            tnev,
            tkategoria,
            tar,
            tmennyiseg,
            tmennyisegiegyseg,
            tminkeszlet,
            trendeles,
            tkoros,
            bazon
        });
        if (result.affectedRows) {
            res.status(201).json({ tazon, message: 'Product created' });
        } else {
            res.status(400).json({ error: 'Failed to create product' });
        }
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: error.message || 'Server error' });
    }
});

router.put('/:tazon', async (req, res) => {
    const { tnev, tkategoria, tar, tmennyiseg, tmennyisegiegyseg, tminkeszlet, trendeles, tkoros, bazon } = req.body;
    try {
        const result = await db.WUpdateTermek({
            tazon: req.params.tazon,
            tnev,
            tkategoria,
            tar,
            tmennyiseg,
            tmennyisegiegyseg,
            tkoros,
            bazon,
            tminkeszlet,
            trendeles
        });
        if (result.affectedRows) {
            res.json({ message: 'Product updated' });
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: error.message || 'Server error' });
    }
});

router.delete('/:tazon', async (req, res) => {
    try {
        const result = await db.WDeleteTermek(req.params.tazon);
        if (result.affectedRows) {
            res.json({ message: 'Product deleted' });
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(400).json({ error: error.message || 'Failed to delete product' });
    }
});

export default router;