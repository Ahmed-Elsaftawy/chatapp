import fs from 'fs/promises'
import path from 'path';
import { fileURLToPath } from 'url';
import { pool } from './connect_db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, 'database.sql');
const query = await fs.readFile(filePath, 'utf-8')


export const connectDB = async () => {
    await pool.connect()
    await pool.query(query)
}

