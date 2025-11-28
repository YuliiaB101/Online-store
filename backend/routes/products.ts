import express, { Router, Request, Response } from 'express';
import pool from '../config/db';

const router: Router = express.Router();

// Get all products with filters and sorting
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, search, sortBy = 'created_at', order = 'DESC' } = req.query;
    
    let query = `
      SELECT p.*, c.name as category_name, c.slug as category_slug 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id 
      WHERE 1=1
    `;
    
    const params: any[] = [];
    let paramCount = 1;

    if (category) {
      query += ` AND c.slug = $${paramCount}`;
      params.push(category);
      paramCount++;
    }

    if (search) {
      query += ` AND p.name ILIKE $${paramCount}`;
      params.push(`%${search}%`);
      paramCount++;
    }

    // Validate sortBy to prevent SQL injection
    const validSortFields = ['created_at', 'price', 'likes', 'name'];
    const sortField = validSortFields.includes(sortBy as string) ? sortBy : 'created_at';
    const sortOrder = (order as string).toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

    query += ` ORDER BY p.${sortField} ${sortOrder}`;

    const products = await pool.query(query, params);
    res.json(products.rows);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: (error as Error).message });
  }
});

// Get product by ID
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await pool.query(
      `SELECT p.*, c.name as category_name, c.slug as category_slug 
       FROM products p 
       LEFT JOIN categories c ON p.category_id = c.id 
       WHERE p.id = $1`,
      [id]
    );

    if (product.rows.length === 0) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    res.json(product.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: (error as Error).message });
  }
});

// Like product
router.post('/:id/like', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'UPDATE products SET likes = likes + 1 WHERE id = $1 RETURNING likes',
      [id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    res.json({ likes: result.rows[0].likes });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: (error as Error).message });
  }
});

export default router;
