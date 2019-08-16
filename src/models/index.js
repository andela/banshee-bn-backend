import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const env = process.env.NODE_ENV;

/** naming your local connection strings
 * postgres://{DB_USERNAME}:{DB_PASSWORD}@{host}:{port}/{DB_NAME}
 */

const db = new Pool({
  connectionString: process.env.DATABASE_URL
});

export default db;
