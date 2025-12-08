import { PrismaClient } from '@prisma/client';

// SQLite client
const sqliteClient = new PrismaClient({
  datasources: {
    db: {
      url: 'file:./prisma/dev.db'
    }
  }
});

// PostgreSQL client (reads from DATABASE_URL env var)
const postgresClient = new PrismaClient();

async function migrate() {
  try {
    console.log('🚀 Starting migration from SQLite to PostgreSQL...\n');

    // Migrate Profiles
    console.log('📋 Migrating Profiles...');
    const profiles = await sqliteClient.profile.findMany();
    for (const profile of profiles) {
      await postgresClient.profile.upsert({
        where: { id: profile.id },
        update: profile,
        create: profile,
      });
    }
    console.log(`✅ Migrated ${profiles.length} profiles\n`);

    // Migrate Blog Posts
    console.log('📋 Migrating Blog Posts...');
    const blogPosts = await sqliteClient.blogPost.findMany();
    for (const post of blogPosts) {
      await postgresClient.blogPost.upsert({
        where: { id: post.id },
        update: post,
        create: post,
      });
    }
    console.log(`✅ Migrated ${blogPosts.length} blog posts\n`);

    // Migrate Posts
    console.log('📋 Migrating Posts...');
    const posts = await sqliteClient.post.findMany();
    for (const post of posts) {
      await postgresClient.post.upsert({
        where: { id: post.id },
        update: post,
        create: post,
      });
    }
    console.log(`✅ Migrated ${posts.length} posts\n`);

    // Migrate Blog Projects
    console.log('📋 Migrating Blog Projects...');
    const projects = await sqliteClient.blogProject.findMany();
    for (const project of projects) {
      await postgresClient.blogProject.upsert({
        where: { id: project.id },
        update: project,
        create: project,
      });
    }
    console.log(`✅ Migrated ${projects.length} projects\n`);

    // Migrate Blog Books
    console.log('📋 Migrating Blog Books...');
    const books = await sqliteClient.blogBook.findMany();
    for (const book of books) {
      await postgresClient.blogBook.upsert({
        where: { id: book.id },
        update: book,
        create: book,
      });
    }
    console.log(`✅ Migrated ${books.length} books\n`);

    // Migrate Hackathons
    console.log('📋 Migrating Hackathons...');
    const hackathons = await sqliteClient.hackathon.findMany();
    for (const hackathon of hackathons) {
      await postgresClient.hackathon.upsert({
        where: { id: hackathon.id },
        update: hackathon,
        create: hackathon,
      });
    }
    console.log(`✅ Migrated ${hackathons.length} hackathons\n`);

    // Migrate Avatars
    console.log('📋 Migrating Avatars...');
    const avatars = await sqliteClient.avatar.findMany();
    for (const avatar of avatars) {
      await postgresClient.avatar.upsert({
        where: { id: avatar.id },
        update: avatar,
        create: avatar,
      });
    }
    console.log(`✅ Migrated ${avatars.length} avatars\n`);

    console.log('🎉 Migration completed successfully!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  } finally {
    await sqliteClient.$disconnect();
    await postgresClient.$disconnect();
  }
}

migrate()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
