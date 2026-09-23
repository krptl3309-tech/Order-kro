import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import { db } from './src/db/index.ts';
import { products, cartItems, orders, orderItems } from './src/db/schema.ts';
import { eq, desc } from 'drizzle-orm';
import { seedInitialProducts } from './src/db/seed.ts';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const app = express();
  const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

  app.use(express.json());

  // Database seed
  seedInitialProducts().catch((err) => console.error('Failed to seed initial products:', err));

  // --- API Routes ---

  // 1. Get all products from Cloud SQL
  app.get('/api/products', async (req: Request, res: Response) => {
    try {
      const allProducts = await db.select().from(products);
      res.json(allProducts);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      res.status(500).json({ error: 'Failed to fetch products from Cloud SQL' });
    }
  });

  // 2. Get user cart items
  app.get('/api/cart', async (req: Request, res: Response) => {
    try {
      const userId = (req.query.userId as string) || 'guest_user';
      const items = await db
        .select({
          id: cartItems.id,
          productId: cartItems.productId,
          quantity: cartItems.quantity,
          product: products,
        })
        .from(cartItems)
        .innerJoin(products, eq(cartItems.productId, products.id))
        .where(eq(cartItems.userId, userId));

      res.json(items);
    } catch (error) {
      console.error('Failed to fetch cart:', error);
      res.status(500).json({ error: 'Failed to fetch cart from Cloud SQL' });
    }
  });

  // 3. Update or Add cart item
  app.post('/api/cart', async (req: Request, res: Response) => {
    try {
      const { productId, quantity, userId = 'guest_user' } = req.body;
      if (!productId) {
        return res.status(400).json({ error: 'Product ID is required' });
      }

      const itemId = `${userId}_${productId}`;

      if (quantity <= 0) {
        await db.delete(cartItems).where(eq(cartItems.id, itemId));
        return res.json({ success: true, removed: true });
      }

      await db
        .insert(cartItems)
        .values({
          id: itemId,
          userId,
          productId,
          quantity,
        })
        .onConflictDoUpdate({
          target: cartItems.id,
          set: { quantity, updatedAt: new Date() },
        });

      res.json({ success: true });
    } catch (error) {
      console.error('Failed to update cart item:', error);
      res.status(500).json({ error: 'Failed to update cart in Cloud SQL' });
    }
  });

  // 4. Create new Order in Cloud SQL
  app.post('/api/orders', async (req: Request, res: Response) => {
    try {
      const {
        userId = 'guest_user',
        items,
        totalPayable,
        itemTotal,
        discount = 0,
        tip = 0,
        handlingFee = 5,
        paymentMethod = 'UPI',
        deliveryAddress,
        instructions = '',
      } = req.body;

      const orderId = `OK-${Math.floor(10000 + Math.random() * 90000)}`;

      await db.insert(orders).values({
        id: orderId,
        userId,
        status: 'OUT_FOR_DELIVERY',
        totalPayable,
        itemTotal,
        discount,
        tip,
        handlingFee,
        paymentMethod,
        deliveryAddress: typeof deliveryAddress === 'string' ? deliveryAddress : JSON.stringify(deliveryAddress),
        instructions,
        riderName: 'Ramesh Kumar',
        riderPhone: '+91 98765 43210',
        etaMinutes: 6,
      });

      if (items && Array.isArray(items)) {
        for (const item of items) {
          await db.insert(orderItems).values({
            id: `${orderId}_${item.productId}`,
            orderId,
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          });
        }
      }

      // Clear guest cart
      await db.delete(cartItems).where(eq(cartItems.userId, userId));

      res.json({ success: true, orderId });
    } catch (error) {
      console.error('Failed to create order:', error);
      res.status(500).json({ error: 'Failed to place order in Cloud SQL' });
    }
  });

  // 5. Get recent orders
  app.get('/api/orders', async (req: Request, res: Response) => {
    try {
      const userId = (req.query.userId as string) || 'guest_user';
      const userOrders = await db
        .select()
        .from(orders)
        .where(eq(orders.userId, userId))
        .orderBy(desc(orders.createdAt))
        .limit(5);

      res.json(userOrders);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      res.status(500).json({ error: 'Failed to fetch orders' });
    }
  });

  // Mount Vite development middlewares in dev mode
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });

  app.use(vite.middlewares);

  app.listen(port, '0.0.0.0', () => {
    console.log(`Express + Cloud SQL server running on http://0.0.0.0:${port}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
