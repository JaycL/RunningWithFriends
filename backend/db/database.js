import sql from "mssql";

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

export const pool = new sql.ConnectionPool(config);
export const poolConnect = pool.connect();
export { sql };