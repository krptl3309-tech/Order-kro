import { pgTable, text, integer, boolean, timestamp, numeric } from 'drizzle-orm/pg-core';

export const products = pgTable('products', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  category: text('category').notNull(),
  subCategory: text('sub_category'),
  price: integer('price').notNull(),
  mrp: integer('mrp').notNull(),
  weight: text('weight').notNull(),
  image: text('image').notNull(),
  rating: numeric('rating', { precision: 3, scale: 1 }).notNull().default('4.8'),
  reviewsCount: integer('reviews_count').notNull().default(120),
  badge: text('badge'),
  isOrganic: boolean('is_organic').default(false),
  inStock: boolean('in_stock').default(true),
  deliveryMinutes: integer('delivery_minutes').notNull().default(9),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const cartItems = pgTable('cart_items', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().default('guest_user'),
  productId: text('product_id').notNull().references(() => products.id),
  quantity: integer('quantity').notNull().default(1),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const orders = pgTable('orders', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().default('guest_user'),
  status: text('status').notNull().default('OUT_FOR_DELIVERY'),
  totalPayable: integer('total_payable').notNull(),
  itemTotal: integer('item_total').notNull(),
  discount: integer('discount').default(0),
  tip: integer('tip').default(0),
  handlingFee: integer('handling_fee').default(5),
  paymentMethod: text('payment_method').notNull().default('UPI'),
  deliveryAddress: text('delivery_address').notNull(),
  instructions: text('instructions'),
  riderName: text('rider_name').default('Ramesh Kumar'),
  riderPhone: text('rider_phone').default('+91 98765 43210'),
  etaMinutes: integer('eta_minutes').default(6),
  createdAt: timestamp('created_at').defaultNow(),
});

export const orderItems = pgTable('order_items', {
  id: text('id').primaryKey(),
  orderId: text('order_id').notNull().references(() => orders.id),
  productId: text('product_id').notNull().references(() => products.id),
  quantity: integer('quantity').notNull(),
  price: integer('price').notNull(),
});
