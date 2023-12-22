import jwt from 'jsonwebtoken';
import bcrypt, { getRounds } from 'bcrypt';
import db from '@/db/maria';
import { createUser, findByUserEmail } from '@/service/auth';

const jwtSecretKey = '^Vo169@6%w3BN2ZLTjBoTmgix3!1Qwf$';
const jwtExpiresInDays = '2d';
const bcryptSaltRounds = 12;

export type SigupUpUser = {
  email: string;
  password: string;
  username: string;
};

export type SignInUser = Omit<SigupUpUser, 'username'>;

export const signup = async ({ email, password, username }: SigupUpUser) => {
  const inInuser = await findByUserEmail(email);
  if (inInuser.length) throw new Error('이미 존재하는 회원입니다.');
  const hashed = await bcrypt.hash(password, bcryptSaltRounds);
  const user = createUser({ email, password: hashed, username });
  const token = createJwtToken(inInuser[0].idx, email);
  return {
    token,
  };
};

export const signin = async ({ email, password }: SignInUser) => {
  const user = await findByUserEmail(email);
  if (!user.length) {
    throw new Error('회원이 아닙니다.');
  }
  const isValidPasswd = await bcrypt.compare(password, user[0].password);

  if (!isValidPasswd) {
    throw new Error('회원이 아닙니다.');
  }

  const token = createJwtToken(user[0].idx, email);
  return {
    token,
  };
};

function createJwtToken(id: string, email: string) {
  return jwt.sign({ id, email }, jwtSecretKey, { expiresIn: jwtExpiresInDays });
}
