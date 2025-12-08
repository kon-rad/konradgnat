import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function importData() {
  try {
    console.log('🚀 Importing data to PostgreSQL...\n');

    const inputPath = path.join(__dirname, 'sqlite-data-export.json');
    const rawData = fs.readFileSync(inputPath, 'utf-8');
    const data = JSON.parse(rawData);

    // Import Profiles
    console.log(`📋 Importing ${data.profiles.length} profiles...`);
    for (const profile of data.profiles) {
      await prisma.profile.upsert({
        where: { id: profile.id },
        update: profile,
        create: profile,
      });
    }
    console.log(`✅ Imported ${data.profiles.length} profiles\n`);

    // Import Blog Posts
    console.log(`📋 Importing ${data.blogPosts.length} blog posts...`);
    for (const post of data.blogPosts) {
      await prisma.blogPost.upsert({
        where: { id: post.id },
        update: {
          ...post,
          created_on: new Date(post.created_on)
        },
        create: {
          ...post,
          created_on: new Date(post.created_on)
        },
      });
    }
    console.log(`✅ Imported ${data.blogPosts.length} blog posts\n`);

    // Import Posts
    console.log(`📋 Importing ${data.posts.length} posts...`);
    for (const post of data.posts) {
      await prisma.post.upsert({
        where: { id: post.id },
        update: {
          ...post,
          created_on: new Date(post.created_on)
        },
        create: {
          ...post,
          created_on: new Date(post.created_on)
        },
      });
    }
    console.log(`✅ Imported ${data.posts.length} posts\n`);

    // Import Blog Projects
    console.log(`📋 Importing ${data.blogProjects.length} projects...`);
    for (const project of data.blogProjects) {
      await prisma.blogProject.upsert({
        where: { id: project.id },
        update: {
          ...project,
          created_on: new Date(project.created_on)
        },
        create: {
          ...project,
          created_on: new Date(project.created_on)
        },
      });
    }
    console.log(`✅ Imported ${data.blogProjects.length} projects\n`);

    // Import Blog Books
    console.log(`📋 Importing ${data.blogBooks.length} books...`);
    for (const book of data.blogBooks) {
      await prisma.blogBook.upsert({
        where: { id: book.id },
        update: {
          ...book,
          created_on: new Date(book.created_on)
        },
        create: {
          ...book,
          created_on: new Date(book.created_on)
        },
      });
    }
    console.log(`✅ Imported ${data.blogBooks.length} books\n`);

    // Import Hackathons
    console.log(`📋 Importing ${data.hackathons.length} hackathons...`);
    for (const hackathon of data.hackathons) {
      await prisma.hackathon.upsert({
        where: { id: hackathon.id },
        update: {
          ...hackathon,
          created_on: new Date(hackathon.created_on)
        },
        create: {
          ...hackathon,
          created_on: new Date(hackathon.created_on)
        },
      });
    }
    console.log(`✅ Imported ${data.hackathons.length} hackathons\n`);

    // Import Avatars
    console.log(`📋 Importing ${data.avatars.length} avatars...`);
    for (const avatar of data.avatars) {
      await prisma.avatar.upsert({
        where: { id: avatar.id },
        update: {
          ...avatar,
          created_on: new Date(avatar.created_on)
        },
        create: {
          ...avatar,
          created_on: new Date(avatar.created_on)
        },
      });
    }
    console.log(`✅ Imported ${data.avatars.length} avatars\n`);

    console.log('🎉 Import completed successfully!');
  } catch (error) {
    console.error('❌ Import failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

importData()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
