# Database Migration Scripts

This directory contains scripts for migrating data from the old Django SQLite database dump to the new Prisma-managed SQLite database.

## Available Scripts

### `npm run migrate`
Migrates data from the Django database dump (`app/konradgnat/data.sql`) to the new Prisma SQLite database.

**What it migrates:**
- Blog posts (13 posts)
- Projects (8 projects)
- Books (13 books)

**Usage:**
```bash
cd app/nextjs
npm run migrate
```

### `npm run verify`
Verifies that the migration was successful by counting records and displaying sample data.

**Usage:**
```bash
npm run verify
```

### `npm run prisma:push`
Creates or updates the database schema based on the Prisma schema file.

**Usage:**
```bash
npm run prisma:push
```

### `npm run prisma:generate`
Generates the Prisma Client for database access.

**Usage:**
```bash
npm run prisma:generate
```

## Migration Process

1. **Prepare the database:**
   ```bash
   npm run prisma:push
   ```

2. **Run the migration:**
   ```bash
   npm run migrate
   ```

3. **Verify the results:**
   ```bash
   npm run verify
   ```

## Data Mapping

### Blog Posts (blog_post → BlogPost)
- `id` → auto-generated CUID
- `title` → `title`
- `content` → `content`
- `preview` → `preview`
- `created_on` → `created_on`
- `author_id` → `user_id` (as string)

### Projects (blog_project → BlogProject)
- `id` → auto-generated CUID
- `title` → `title`
- `content` → `description`
- `live_link` or `github_link` → `url`
- `image_url1` → `image_url`
- `completed_on` → `created_on`

### Books (blog_book → BlogBook)
- `id` → auto-generated CUID
- `title` → `title`
- `author` → `author`
- `content` or `preview` → `description`
- `image_url` → `image_url`
- `created_on` → `created_on`

## Notes

- The migration script handles SQL parsing, including:
  - String escaping (single quotes)
  - NULL values
  - SQLite's `replace()` function for line endings
  - Nested function calls

- If you need to re-run the migration, you'll need to clear the existing data first:
  ```bash
  # Delete the database file
  rm prisma/dev.db

  # Recreate the schema
  npm run prisma:push

  # Run the migration again
  npm run migrate
  ```

## Troubleshooting

**Error: "Unique constraint failed"**
- This means the data already exists in the database
- Clear the database and re-run the migration (see Notes above)

**Error: "Cannot find module"**
- Run `npm install` to ensure all dependencies are installed
- Make sure `tsx` is installed: `npm install -D tsx`

**Error: "PrismaClient is unable to run in the browser"**
- These scripts are meant to run in Node.js, not the browser
- Always run them via npm scripts in the terminal
