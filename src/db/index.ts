import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
  max: 15,
  min: 5,
  maxLifetimeSeconds: 30,
});

const drizzleDb = drizzle({ client: pool });

export default drizzleDb;
