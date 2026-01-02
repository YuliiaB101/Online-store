import express, { Router, Request, Response } from 'express';
import pool from '../config/db';
import authMiddleware from '../middleware/auth';
import { AuthRequest } from '../types';

const router: Router = express.Router();

// Get user favourites
router.get('/', authMiddleware, async (req: Request & AuthRequest, res: Response): Promise<void> => {
  try {
    const favourites = await pool.query(
      `SELECT p.*, c.name as category_name, c.slug as category_slug 
       FROM favourites f 
       JOIN products p ON f.product_id = p.id 
       LEFT JOIN categories c ON p.category_id = c.id 
       WHERE f.user_id = $1 
       ORDER BY f.created_at DESC`,
      [req.userId]
    );
    res.json(favourites.rows);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: (error as Error).message });
  }
});

// Add to favourites
router.post('/:productId', authMiddleware, async (req: Request & AuthRequest, res: Response): Promise<void> => {
  try {
    const { productId } = req.params;
    
    // Check if already in favourites
    const exists = await pool.query(
      'SELECT * FROM favourites WHERE user_id = $1 AND product_id = $2',
      [req.userId, productId]
    );

    if (exists.rows.length > 0) {
      res.status(400).json({ message: 'Product already in favourites' });
      return;
    }

    await pool.query(
      'INSERT INTO favourites (user_id, product_id) VALUES ($1, $2)',
      [req.userId, productId]
    );

    // Fetch the product details to return
    const product = await pool.query(
      `SELECT p.*, c.name as category_name, c.slug as category_slug 
       FROM products p 
       LEFT JOIN categories c ON p.category_id = c.id 
       WHERE p.id = $1`,
      [productId]
    );

    res.status(201).json(product.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: (error as Error).message });
  }
});

// Remove from favourites
router.delete('/:productId', authMiddleware, async (req: Request & AuthRequest, res: Response): Promise<void> => {
  try {
    const { productId } = req.params;
    
    const result = await pool.query(
      'DELETE FROM favourites WHERE user_id = $1 AND product_id = $2',
      [req.userId, productId]
    );

    if (result.rowCount === 0) {
      res.status(404).json({ message: 'favourite not found' });
      return;
    }

    console.log('!!! Removed from favourites:', productId);
    res.json({ message: 'Removed from favourites' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: (error as Error).message });
  }
});

export default router;
