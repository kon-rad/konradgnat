import { Client } from 'pg';
import Database from 'better-sqlite3';

// PostgreSQL connection
const pgClient = new Client({
  connectionString: process.env.DATABASE_URL,
});

// SQLite connection
const sqliteDb = new Database('./prisma/dev.db', { readonly: true });

async function migrate() {
  try {
    console.log('🚀 Starting migration from SQLite to PostgreSQL...\n');

    await pgClient.connect();

    const tables = [
      { name: 'profiles', hasCreatedOn: false },
      { name: 'blog_post', hasCreatedOn: true },
      { name: 'posts', hasCreatedOn: true },
      { name: 'blog_project', hasCreatedOn: true },
      { name: 'blog_book', hasCreatedOn: true },
      { name: 'hackathons', hasCreatedOn: true },
      { name: 'avatars', hasCreatedOn: true },
    ];

    for (const table of tables) {
      try {
        console.log(`📋 Migrating table '${table.name}'...`);

        // Get all rows from SQLite
        const rows: any[] = sqliteDb.prepare(`SELECT * FROM ${table.name}`).all();

        if (rows.length === 0) {
          console.log(`⚠️  Table '${table.name}' is empty, skipping...\n`);
          continue;
        }

        console.log(`   Found ${rows.length} rows`);

        // Get column names from first row
        const columns = Object.keys(rows[0]);
        const placeholders = columns.map((_, i) => `$${i + 1}`).join(', ');
        const columnsStr = columns.map(col => `"${col}"`).join(', ');

        // Insert each row
        let successCount = 0;
        for (const row of rows) {
          try {
            const values = columns.map(col => {
              const value = row[col];
              // Convert timestamp to proper date
              if (table.hasCreatedOn && col === 'created_on' && typeof value === 'number') {
                return new Date(value);
              }
              if (col === 'updated_at' && value && typeof value === 'number') {
                return new Date(value);
              }
              return value;
            });

            const query = `
              INSERT INTO "${table.name}" (${columnsStr})
              VALUES (${placeholders})
              ON CONFLICT (id) DO NOTHING
            `;

            await pgClient.query(query, values);
            successCount++;
          } catch (err: any) {
            console.log(`   ⚠️  Error inserting row: ${err.message}`);
          }
        }

        console.log(`✅ Migrated ${successCount}/${rows.length} rows from '${table.name}'\n`);
      } catch (err: any) {
        console.log(`❌ Error migrating table '${table.name}': ${err.message}\n`);
      }
    }

    console.log('🎉 Migration completed successfully!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  } finally {
    await pgClient.end();
    sqliteDb.close();
  }
}

migrate()
  .then(() => {
    console.log('\n✨ All done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Fatal error:', error);
    process.exit(1);
  });
