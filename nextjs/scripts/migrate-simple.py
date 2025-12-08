import sqlite3
import psycopg2
import os
from urllib.parse import urlparse

# Parse DATABASE_URL
db_url = os.getenv('DATABASE_URL')
if not db_url:
    print("❌ DATABASE_URL environment variable not set")
    exit(1)

url = urlparse(db_url)

# Connect to PostgreSQL
pg_conn = psycopg2.connect(
    database=url.path[1:],
    user=url.username,
    password=url.password,
    host=url.hostname,
    port=url.port
)
pg_cur = pg_conn.cursor()

# Connect to SQLite
sqlite_conn = sqlite3.connect('prisma/dev.db')
sqlite_cur = sqlite_conn.cursor()

print('🚀 Starting migration from SQLite to PostgreSQL...\n')

# Get table names
tables = ['profiles', 'blog_post', 'posts', 'blog_project', 'blog_book', 'hackathons', 'avatars']

for table in tables:
    try:
        # Get all rows from SQLite
        sqlite_cur.execute(f"SELECT * FROM {table}")
        rows = sqlite_cur.fetchall()

        if len(rows) == 0:
            print(f"⚠️  Table '{table}' is empty, skipping...\n")
            continue

        print(f"📋 Migrating {len(rows)} rows from '{table}'...")

        # Get column names
        sqlite_cur.execute(f"PRAGMA table_info({table})")
        columns = [col[1] for col in sqlite_cur.fetchall()]

        # Insert into PostgreSQL
        placeholders = ','.join(['%s'] * len(columns))
        columns_str = ','.join([f'"{col}"' for col in columns])

        for row in rows:
            try:
                insert_query = f'INSERT INTO "{table}" ({columns_str}) VALUES ({placeholders}) ON CONFLICT (id) DO NOTHING'
                pg_cur.execute(insert_query, row)
            except Exception as e:
                print(f"  ⚠️  Error inserting row: {e}")
                continue

        pg_conn.commit()
        print(f"✅ Migrated {len(rows)} rows from '{table}'\n")

    except Exception as e:
        print(f"❌ Error migrating table '{table}': {e}\n")
        continue

print('🎉 Migration completed!')

# Close connections
sqlite_cur.close()
sqlite_conn.close()
pg_cur.close()
pg_conn.close()
