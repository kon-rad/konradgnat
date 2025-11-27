import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function verify() {
  try {
    console.log('Verifying migration...\n');

    const blogPostCount = await prisma.blogPost.count();
    console.log(`✓ Blog posts: ${blogPostCount}`);

    const projectCount = await prisma.blogProject.count();
    console.log(`✓ Projects: ${projectCount}`);

    const bookCount = await prisma.blogBook.count();
    console.log(`✓ Books: ${bookCount}`);

    console.log('\nSample data:');

    const samplePost = await prisma.blogPost.findFirst();
    console.log('\nFirst blog post:', {
      title: samplePost?.title,
      preview: samplePost?.preview?.substring(0, 50) + '...'
    });

    const sampleProject = await prisma.blogProject.findFirst();
    console.log('\nFirst project:', {
      title: sampleProject?.title,
      description: sampleProject?.description?.substring(0, 50) + '...'
    });

    const sampleBook = await prisma.blogBook.findFirst();
    console.log('\nFirst book:', {
      title: sampleBook?.title,
      author: sampleBook?.author
    });

    console.log('\n✅ Verification complete!');

  } catch (error) {
    console.error('Verification failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

verify()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
