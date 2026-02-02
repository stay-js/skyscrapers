import 'dotenv/config';
import '../src/env.js';

import { sql } from 'drizzle-orm';
import { db } from '~/server/db';

async function clearDB() {
  console.log('⏳ Dropping all tables...');

  console.log('Disabling foreign key checks...');
  await db.execute(sql`SET FOREIGN_KEY_CHECKS = 0`);

  const [tables]: any = await db.execute(sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = (SELECT DATABASE())
    `);

  for (const row of tables) {
    console.log(`Dropping table: ${row.TABLE_NAME}`);
    await db.execute(sql.raw(`DROP TABLE IF EXISTS \`${row.TABLE_NAME}\``));
  }

  console.log('Re-enabling foreign key checks...');
  await db.execute(sql`SET FOREIGN_KEY_CHECKS = 1`);

  console.log('✅ All tables dropped successfully.');
}

clearDB()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('❌ An unexpected error occurred:', error);
    process.exit(1);
  });
