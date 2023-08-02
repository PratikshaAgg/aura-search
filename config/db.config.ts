import { Pool } from 'pg';
import { readFileSync } from 'fs';

const { DB_HOST, DB_PASSWORD, DB_PORT, DB_USERNAME, DB_NAME } = process.env;
console.log(DB_HOST, DB_PASSWORD, DB_PORT);
const client = new Pool({
  user: DB_USERNAME,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: +DB_PORT!,
  database: DB_NAME,
  ssl: {
    rejectUnauthorized: false,
    //cert: readFileSync(__dirname + '/config/ca-certificate.crt').toString(),
  },
});

export default client;
