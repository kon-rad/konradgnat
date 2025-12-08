import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'file:./prisma/dev.db'
    }
  }
});

async function exportData() {
  try {
    console.log('🚀 Exporting data from SQLite...\n');

    const data = {
      profiles: await prisma.profile.findMany(),
      blogPosts: await prisma.blogPost.findMany(),
      posts: await prisma.post.findMany(),
      blogProjects: await prisma.blogProject.findMany(),
      blogBooks: await prisma.blogBook.findMany(),
      hackathons: await prisma.hackathon.findMany(),
      avatars: await prisma.avatar.findMany(),
    };

    console.log(`Found:
- ${data.profiles.length} profiles
- ${data.blogPosts.length} blog posts
- ${data.posts.length} posts
- ${data.blogProjects.length} projects
- ${data.blogBooks.length} books
- ${data.hackathons.length} hackathons
- ${data.avatars.length} avatars
`);

    const outputPath = path.join(__dirname, 'sqlite-data-export.json');
    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));

    console.log(`✅ Data exported to: ${outputPath}`);
  } catch (error) {
    console.error('❌ Export failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

exportData()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
