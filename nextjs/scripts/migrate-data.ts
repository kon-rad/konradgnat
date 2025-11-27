import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

interface BlogPostRow {
  id: number;
  title: string;
  slug?: string;
  content: string;
  preview?: string;
  created_on: string;
  status?: number;
  author_id?: number;
}

interface BlogProjectRow {
  id: number;
  title: string;
  slug?: string;
  content?: string;
  preview?: string;
  github_link?: string;
  live_link?: string;
  image_url1?: string;
  completed_on?: string;
  status?: number;
  priority_order?: number;
}

interface BlogBookRow {
  id: number;
  title: string;
  slug?: string;
  author?: string;
  content?: string;
  preview?: string;
  image_url?: string;
  read_on?: string;
  created_on: string;
  status?: number;
  book_status?: number;
}

// Helper function to parse SQL INSERT statement
function parseSqlInsert(line: string): any[] {
  const match = line.match(/INSERT INTO \w+ VALUES\((.*)\);?$/);
  if (!match) return [];

  const valuesStr = match[1];
  const values: any[] = [];
  let current = '';
  let inString = false;
  let inReplace = false;
  let parenDepth = 0;

  for (let i = 0; i < valuesStr.length; i++) {
    const char = valuesStr[i];

    if (char === "'" && valuesStr[i - 1] !== '\\') {
      inString = !inString;
      current += char;
    } else if (char === '(' && !inString) {
      parenDepth++;
      current += char;
    } else if (char === ')' && !inString) {
      parenDepth--;
      current += char;
    } else if (char === ',' && !inString && parenDepth === 0) {
      values.push(parseValue(current.trim()));
      current = '';
    } else {
      current += char;
    }
  }

  if (current) {
    values.push(parseValue(current.trim()));
  }

  return values;
}

// Helper function to parse individual values
function parseValue(value: string): any {
  value = value.trim();

  if (value === 'NULL') return null;
  if (value === 'TRUE') return true;
  if (value === 'FALSE') return false;

  // Check if it's a string (starts and ends with quotes)
  if ((value.startsWith("'") && value.endsWith("'")) ||
      (value.startsWith('"') && value.endsWith('"'))) {
    let str = value.slice(1, -1);
    // Unescape single quotes
    str = str.replace(/''/g, "'");
    return str;
  }

  // Check if it's a number
  if (/^-?\d+\.?\d*$/.test(value)) {
    return parseFloat(value);
  }

  // Check for replace function (SQLite line ending replacement)
  if (value.startsWith('replace(')) {
    // Extract the innermost string from nested replace calls
    const innerMatch = value.match(/replace\(replace\('(.*?)',/);
    if (innerMatch) {
      return innerMatch[1].replace(/''/g, "'");
    }
  }

  return value;
}

// Read and parse blog_post data
function parseBlogPosts(sqlContent: string): BlogPostRow[] {
  const posts: BlogPostRow[] = [];
  const lines = sqlContent.split('\n');

  for (const line of lines) {
    if (line.includes('INSERT INTO blog_post VALUES')) {
      try {
        const values = parseSqlInsert(line);
        if (values.length >= 7) {
          posts.push({
            id: values[0],
            title: values[1],
            slug: values[2],
            content: values[4],
            preview: values[8],
            created_on: values[5] || new Date().toISOString(),
            status: values[6],
            author_id: values[7]
          });
        }
      } catch (err) {
        console.error('Error parsing blog_post line:', err);
      }
    }
  }

  return posts;
}

// Read and parse blog_project data
function parseBlogProjects(sqlContent: string): BlogProjectRow[] {
  const projects: BlogProjectRow[] = [];
  const lines = sqlContent.split('\n');

  for (const line of lines) {
    if (line.includes('INSERT INTO blog_project VALUES')) {
      try {
        const values = parseSqlInsert(line);
        if (values.length >= 4) {
          projects.push({
            id: values[0],
            title: values[1],
            slug: values[2],
            content: values[4],
            preview: values[16],
            github_link: values[6],
            live_link: values[13],
            image_url: values[7],
            completed_on: values[5],
            status: values[3],
            priority_order: values[21] || 0
          });
        }
      } catch (err) {
        console.error('Error parsing blog_project line:', err);
      }
    }
  }

  return projects;
}

// Read and parse blog_book data
function parseBlogBooks(sqlContent: string): BlogBookRow[] {
  const books: BlogBookRow[] = [];
  const lines = sqlContent.split('\n');

  for (const line of lines) {
    if (line.includes('INSERT INTO blog_book VALUES')) {
      try {
        const values = parseSqlInsert(line);
        if (values.length >= 10) {
          books.push({
            id: values[0],
            title: values[1],
            slug: values[2],
            image_url: values[3],
            author: values[4],
            content: values[7],
            preview: values[8],
            read_on: values[6],
            created_on: values[9],
            status: values[10],
            book_status: values[11]
          });
        }
      } catch (err) {
        console.error('Error parsing blog_book line:', err);
      }
    }
  }

  return books;
}

async function migrate() {
  try {
    console.log('Starting migration...');

    // Read the SQL file
    const sqlPath = path.join(__dirname, '../../konradgnat/data.sql');
    const sqlContent = fs.readFileSync(sqlPath, 'utf-8');

    console.log('Parsing blog posts...');
    const blogPosts = parseBlogPosts(sqlContent);
    console.log(`Found ${blogPosts.length} blog posts`);

    console.log('Parsing projects...');
    const projects = parseBlogProjects(sqlContent);
    console.log(`Found ${projects.length} projects`);

    console.log('Parsing books...');
    const books = parseBlogBooks(sqlContent);
    console.log(`Found ${books.length} books`);

    // Insert blog posts
    console.log('\nInserting blog posts...');
    for (const post of blogPosts) {
      try {
        await prisma.blogPost.create({
          data: {
            title: post.title,
            content: post.content,
            preview: post.preview || null,
            created_on: new Date(post.created_on),
            user_id: post.author_id?.toString() || null,
            user_email: null
          }
        });
        console.log(`✓ Inserted blog post: ${post.title}`);
      } catch (err) {
        console.error(`✗ Failed to insert blog post: ${post.title}`, err);
      }
    }

    // Insert projects
    console.log('\nInserting projects...');
    for (const project of projects) {
      try {
        await prisma.blogProject.create({
          data: {
            title: project.title,
            description: project.content || null,
            url: project.live_link || project.github_link || null,
            image_url: project.image_url1 || null,
            created_on: project.completed_on ? new Date(project.completed_on) : new Date()
          }
        });
        console.log(`✓ Inserted project: ${project.title}`);
      } catch (err) {
        console.error(`✗ Failed to insert project: ${project.title}`, err);
      }
    }

    // Insert books
    console.log('\nInserting books...');
    for (const book of books) {
      try {
        await prisma.blogBook.create({
          data: {
            title: book.title,
            author: book.author || null,
            description: book.preview || book.content || null,
            image_url: book.image_url || null,
            created_on: new Date(book.created_on)
          }
        });
        console.log(`✓ Inserted book: ${book.title}`);
      } catch (err) {
        console.error(`✗ Failed to insert book: ${book.title}`, err);
      }
    }

    console.log('\n✅ Migration completed!');

  } catch (error) {
    console.error('Migration failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

migrate()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
