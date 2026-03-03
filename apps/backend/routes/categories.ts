import express, { Router, Request, Response } from 'express';
import pool from '../config/db';

const router: Router = express.Router();

// Get all categories
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await pool.query('SELECT * FROM categories ORDER BY name');
    res.json(categories.rows);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: (error as Error).message });
  }
});

export default router;
