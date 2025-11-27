import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Verifying blog post migration...\n');

  const posts = await prisma.blogPost.findMany({
    orderBy: {
      created_on: 'asc',
    },
  });

  console.log(`Total posts in database: ${posts.length}\n`);

  posts.forEach((post, index) => {
    console.log(`${index + 1}. ${post.title}`);
    console.log(`   ID: ${post.id}`);
    console.log(`   Created: ${post.created_on.toLocaleDateString()}`);
    console.log(`   Preview: ${post.preview?.substring(0, 60)}...`);
    console.log(`   Content length: ${post.content.length} characters\n`);
  });

  console.log('Verification completed!');
}

main()
  .catch((e) => {
    console.error('Verification failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
