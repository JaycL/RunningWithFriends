import pkg from "pg";

export const config = {
  server: "localhost",
  database: "as-chouille",
  user: 'dev',
  password: 'dev',
  port: 38584,
  options: {
    trustServerCertificate: true
  }
};

/*
postgresql://postgres:[PASSWORD]@db.vzbusmuxyyiaorsnoejh.supabase.co:5432/postgres
*/

const { Pool } = pkg;

/*
export const pool = new Pool({
  connectionString:
    "postgresql://postgres:CamilleJC1401%23Supabase@db.vzbusmuxyyiaorsnoejh.supabase.co:5432/postgres",     
  ssl: { rejectUnauthorized: false }
});*/


export const pool = new Pool({
  host: "aws-1-eu-north-1.pooler.supabase.com",          
  database: "postgres",
  user: 'postgres.vzbusmuxyyiaorsnoejh',
  password: 'CamilleJC1401#',
  port: 5432,
  ssl: { rejectUnauthorized: false }
});
