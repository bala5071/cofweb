import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config({ path: '../backend/.env' });

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create categories
  const coffeeCat = await prisma.category.upsert({
    where: { name: 'Coffee' },
    update: {},
    create: { name: 'Coffee', order: 0 }
  });

  const foodCat = await prisma.category.upsert({
    where: { name: 'Bakery' },
    update: {},
    create: { name: 'Bakery', order: 1 }
  });

  // Create menu items
  await prisma.menuItem.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Espresso',
      description: 'Single shot, rich and bold',
      price_cents: 250,
      categoryId: coffeeCat.id,
      is_available: true,
      image_url: ''
    }
  }).catch(() => {});

  await prisma.menuItem.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: 'Cappuccino',
      description: 'Espresso with steamed milk and foam',
      price_cents: 350,
      categoryId: coffeeCat.id,
      is_available: true,
      image_url: ''
    }
  }).catch(() => {});

  await prisma.menuItem.upsert({
    where: { id: 3 },
    update: {},
    create: {
      name: 'Blueberry Muffin',
      description: 'House-baked muffin with blueberries',
      price_cents: 300,
      categoryId: foodCat.id,
      is_available: true,
      image_url: ''
    }
  }).catch(() => {});

  // Create admin user if not exists
  const adminUsername = process.env.ADMIN_USERNAME || 'admin';
  const adminPassword = process.env.ADMIN_PASSWORD || 'adminpass';
  const existing = await prisma.adminUser.findUnique({ where: { username: adminUsername } });

  if (!existing) {
    const hash = await bcrypt.hash(adminPassword, 10);
    await prisma.adminUser.create({ data: { username: adminUsername, password_hash: hash } });
    console.log(`Created admin user: ${adminUsername} (use strong password in production)`);
  } else {
    console.log('Admin user already exists, skipping create');
  }

  console.log('Seeding complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
