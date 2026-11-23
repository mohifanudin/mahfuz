import { openSeedClient } from "./remote-db";
import { drizzle } from "drizzle-orm/libsql/web";
import { migrate } from "drizzle-orm/libsql/migrator";

const client = await openSeedClient();
try {
  const tables = await client.execute("SELECT count(*) AS n FROM sqlite_master WHERE type = 'table'");
  console.log(`Existing tables: ${tables.rows[0].n}`);
  await migrate(drizzle(client), { migrationsFolder: "./drizzle" });
  const rows = await client.execute("SELECT count(*) AS n FROM surahs");
  console.log(`Migration complete. Surahs: ${rows.rows[0].n}`);
} finally {
  client.close();
}
