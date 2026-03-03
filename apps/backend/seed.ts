import fs from 'fs';
import path from 'path';
import pool from './config/db';

const stripPsqlMetaCommands = (sql: string): string => {
  return sql
    .split('\n')
    .filter((line) => !line.trimStart().startsWith('\\'))
    .join('\n');
};

const seed = async () => {
  try {
    const checkResult = await pool.query(
      "SELECT to_regclass('public.users') AS users_table"
    );

    if (checkResult.rows[0]?.users_table) {
      console.log('Seed skipped: database is already initialized.');
      return;
    }

    const sqlFilePath = path.resolve(__dirname, 'config', 'database.sql');
    const sql = fs.readFileSync(sqlFilePath, 'utf-8');
    const sanitizedSql = stripPsqlMetaCommands(sql);

    await pool.query(sanitizedSql);

    console.log('Seed completed successfully.');
  } catch (error) {
    console.error('Seed failed:', error);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
};

void seed();
