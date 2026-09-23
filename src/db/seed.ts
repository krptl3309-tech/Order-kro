import { db } from './index.ts';
import { products } from './schema.ts';
import { PRODUCTS } from '../data/mockData.ts';

export async function seedInitialProducts() {
  try {
    const existing = await db.select({ id: products.id }).from(products).limit(1);
    if (existing.length > 0) {
      return;
    }

    const rows = PRODUCTS.map((p) => ({
      id: p.id,
      name: p.name,
      category: p.category,
      subCategory: p.subCategory || null,
      price: p.price,
      mrp: p.mrp || p.price,
      weight: p.weight,
      image: p.image,
      rating: p.rating ? p.rating.toString() : '4.8',
      reviewsCount: 120,
      badge: p.discountBadge || p.badge || null,
      isOrganic: false,
      inStock: true,
      deliveryMinutes: p.deliveryMins || 9,
      description: p.altText || p.name,
    }));

    await db.insert(products).values(rows).onConflictDoNothing();
    console.log(`Successfully seeded ${rows.length} products to Cloud SQL`);
  } catch (error) {
    console.error('Error seeding products to Cloud SQL:', error);
  }
}
