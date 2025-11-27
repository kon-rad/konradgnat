import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function resetAndMigrate() {
  try {
    console.log('🗑️  Clearing existing data...\n');

    // Delete all existing data
    await prisma.blogPost.deleteMany({});
    console.log('✓ Cleared blog posts');

    await prisma.blogProject.deleteMany({});
    console.log('✓ Cleared projects');

    await prisma.blogBook.deleteMany({});
    console.log('✓ Cleared books');

    await prisma.hackathon.deleteMany({});
    console.log('✓ Cleared hackathons');

    console.log('\n✅ Database cleared! Now run: npm run migrate');

  } catch (error) {
    console.error('Reset failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

resetAndMigrate()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
