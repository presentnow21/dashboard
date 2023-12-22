import { SigupUpUser } from '@/controller/auth';
import db from '@/db/maria';

export const findByUserEmail = (email: string) => {
  const user = db.query(`SELECT * FROM user WHERE email = "${email}"`);
  return user;
};

export const createUser = async ({
  email,
  password,
  username,
}: SigupUpUser) => {
  const user = await db.query(
    `INSERT INTO user ( email, password, username ) VALUES("${email}", "${password}", "${username}")`
  );
  console.log('create user', user);
  return user;
};
