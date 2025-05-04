import express from 'express';
import * as db from '../db.js';
import { WCashiersPerformance } from '../db.js';

const router = express.Router();



router.get('/cashiers-performance', async (req, res) => {
    try {
        const result = await WCashiersPerformance();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.get('/', async (req, res) => {
    try {
        const alkalmazottak = await db.DAlkalmazott();
        res.status(200).json(alkalmazottak);
    } catch (error) {
        console.error('Hiba az alkalmazottak lekérdezésekor:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.get('/belepes/:felulet/:id', async (req, res) => {
    try {
        console.log(`Handling GET /server/alkalmazott/belepes/${req.params.felulet}/${req.params.id}`);
        const { felulet, id } = req.params;

        // Validate id
        if (!id) {
            console.log('Missing id parameter');
            return res.status(400).json({ 
                success: false, 
                message: 'Felhasználói azonosító szükséges' 
            });
        }

        // Ensure id is a number (aazon is likely numeric in the database)
        const numericId = Number(id);
        if (isNaN(numericId)) {
            console.log('Invalid id format:', id);
            return res.status(400).json({ 
                success: false, 
                message: 'Érvénytelen felhasználói azonosító formátum' 
            });
        }

        const result = await db.Belepes(felulet, numericId);
        
        if (!result) {
            console.log('Invalid felulet:', felulet);
            return res.status(400).json({ 
                success: false, 
                message: 'Érvénytelen felület' 
            });
        }
        
        if (result.length === 0) {
            console.log('No user found or no web access:', { felulet, id });
            return res.status(401).json({ 
                success: false, 
                message: 'Érvénytelen felhasználói azonosító vagy nincs webes jogosultság' 
            });
        }
        
        console.log('Login successful:', result);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error in belepes:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Szerver hiba',
            error: error.message 
        });
    }
});

router.get('/:aazon', async (req, res) => {
    try {
        let alkalmazott = await db.DAlkalmazott(req.params.aazon);
        res.status(201).json(alkalmazott);
    } catch (error) {
        console.error('DAlkalmazott error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



export default router;