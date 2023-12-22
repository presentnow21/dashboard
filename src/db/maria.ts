import mariadb from 'mariadb';
const pool = mariadb.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'user',
  password: '1234',
  database: 'test',
});

export default await pool;
