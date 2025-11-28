import express, { Router, Request, Response } from 'express';
import pool from '../config/db';
import authMiddleware from '../middleware/auth';
import { AuthRequest } from '../types';

const router: Router = express.Router();

// Get user favorites
router.get('/', authMiddleware, async (req: Request & AuthRequest, res: Response): Promise<void> => {
  try {
    const favorites = await pool.query(
      `SELECT p.*, c.name as category_name, c.slug as category_slug 
       FROM favorites f 
       JOIN products p ON f.product_id = p.id 
       LEFT JOIN categories c ON p.category_id = c.id 
       WHERE f.user_id = $1 
       ORDER BY f.created_at DESC`,
      [req.userId]
    );
    res.json(favorites.rows);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: (error as Error).message });
  }
});

// Add to favorites
router.post('/:productId', authMiddleware, async (req: Request & AuthRequest, res: Response): Promise<void> => {
  try {
    const { productId } = req.params;
    
    // Check if already in favorites
    const exists = await pool.query(
      'SELECT * FROM favorites WHERE user_id = $1 AND product_id = $2',
      [req.userId, productId]
    );

    if (exists.rows.length > 0) {
      res.status(400).json({ message: 'Product already in favorites' });
      return;
    }

    await pool.query(
      'INSERT INTO favorites (user_id, product_id) VALUES ($1, $2)',
      [req.userId, productId]
    );

    res.status(201).json({ message: 'Added to favorites' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: (error as Error).message });
  }
});

// Remove from favorites
router.delete('/:productId', authMiddleware, async (req: Request & AuthRequest, res: Response): Promise<void> => {
  try {
    const { productId } = req.params;
    
    const result = await pool.query(
      'DELETE FROM favorites WHERE user_id = $1 AND product_id = $2',
      [req.userId, productId]
    );

    if (result.rowCount === 0) {
      res.status(404).json({ message: 'Favorite not found' });
      return;
    }

    res.json({ message: 'Removed from favorites' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: (error as Error).message });
  }
});

export default router;
