import express, { Router, Request, Response } from 'express';
import pool from '../config/db';
import authMiddleware from '../middleware/auth';
import { AuthRequest } from '../types';

const router: Router = express.Router();

const CART_ITEM_SELECT = `
  SELECT
    c.id,
    c.product_id,
    c.quantity,
    p.name,
    p.description,
    p.price,
    p.image_url,
    p.category_id,
    cat.name as category_name,
    cat.slug as category_slug,
    p.created_at,
    p.rating_avg,
    p.rating_count
  FROM cart c
  JOIN products p ON c.product_id = p.id
  LEFT JOIN categories cat ON p.category_id = cat.id
`;

// Get user cart
router.get('/', authMiddleware, async (req: Request & AuthRequest, res: Response): Promise<void> => {
  try {
    const cart = await pool.query(
      `${CART_ITEM_SELECT}
       WHERE c.user_id = $1
       ORDER BY c.created_at DESC`,
      [req.userId]
    );
    res.json(cart.rows);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: (error as Error).message });
  }
});

// Add to cart
router.post('/', authMiddleware, async (req: Request & AuthRequest, res: Response): Promise<void> => {
  try {
    const { product_id: productId, quantity = 1 } = req.body;

    // Check if already in cart
    const exists = await pool.query(
      'SELECT * FROM cart WHERE user_id = $1 AND product_id = $2',
      [req.userId, productId]
    );

    if (exists.rows.length > 0) {
      // Update quantity
      const updateResult = await pool.query(
        'UPDATE cart SET quantity = quantity + $1 WHERE user_id = $2 AND product_id = $3 RETURNING *',
        [quantity, req.userId, productId]
      );

      const cartId = updateResult.rows[0].id;
      const itemResult = await pool.query(
        `${CART_ITEM_SELECT}
         WHERE c.id = $1 AND c.user_id = $2`,
        [cartId, req.userId]
      );

      res.json(itemResult.rows[0]);
      return;
    }

    // Add new item
    const insertResult = await pool.query(
      'INSERT INTO cart (user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *',
      [req.userId, productId, quantity]
    );

    const cartId = insertResult.rows[0].id;
    const itemResult = await pool.query(
      `${CART_ITEM_SELECT}
       WHERE c.id = $1 AND c.user_id = $2`,
      [cartId, req.userId]
    );

    res.status(201).json(itemResult.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: (error as Error).message });
  }
});

// Update cart item quantity
router.put('/:id', authMiddleware, async (req: Request & AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (quantity <= 0) {
      res.status(400).json({ message: 'Quantity must be greater than 0' });
      return;
    }

    const updateResult = await pool.query(
      'UPDATE cart SET quantity = $1 WHERE id = $2 AND user_id = $3 RETURNING *',
      [quantity, id, req.userId]
    );

    if (updateResult.rows.length === 0) {
      res.status(404).json({ message: 'Cart item not found' });
      return;
    }

    const itemResult = await pool.query(
      `${CART_ITEM_SELECT}
       WHERE c.id = $1 AND c.user_id = $2`,
      [id, req.userId]
    );

    res.json(itemResult.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: (error as Error).message });
  }
});

// Remove from cart
router.delete('/:id', authMiddleware, async (req: Request & AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(
      'DELETE FROM cart WHERE id = $1 AND user_id = $2',
      [id, req.userId]
    );

    if (result.rowCount === 0) {
      res.status(404).json({ message: 'Cart item not found' });
      return;
    }

    res.json({ message: 'Removed from cart' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: (error as Error).message });
  }
});

// Clear cart
router.delete('/', authMiddleware, async (req: Request & AuthRequest, res: Response): Promise<void> => {
  try {
    await pool.query('DELETE FROM cart WHERE user_id = $1', [req.userId]);
    res.json({ message: 'Cart cleared' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: (error as Error).message });
  }
});

export default router;
