import express, { Router, Request, Response } from 'express';
import pool from '../config/db';

const router: Router = express.Router();

// Get all active banners
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const banners = await pool.query(
      'SELECT * FROM banners WHERE active = true ORDER BY order_index'
    );
    res.json(banners.rows);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: (error as Error).message });
  }
});

export default router;
