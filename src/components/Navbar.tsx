'use client';
import { persistor } from '@/redux/Provider';
import { signIn } from '@/redux/features/auth-slice';
import { AppDispatch, useAppSelector } from '@/redux/store';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function Navbar() {
  const { user, userId } = useAppSelector(({ auth }) => ({
    user: auth.user.email,
    userId: auth.user.id,
  }));
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    fetch('/api/auth/check').then(async (res) => {
      if (res.ok) {
        const info = await res.json();
        if (info.accessToken) {
          if (!user) {
            dispatch(
              signIn({
                token: info.accessToken,
                email: info.email,
                id: info.id,
              })
            );
          }
        } else {
          if (user) persistor.purge();
        }
      }
    });
  }, [dispatch, user]);

  const handleSignOut = () => {
    fetch('/api/auth/signout', {
      method: 'POST',
      body: JSON.stringify({}),
    }).then(() => {
      persistor.purge();
      router.push('/');
    });
  };
  return (
    <>
      <Link href="/">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
      </Link>
      <ul className="flex gap-5 items-center">
        {!user && (
          <>
            <li className="py-2 text-xl hover:text-neutral-400">
              <Link href={'/signin'}>signIn</Link>
            </li>
            <li className="py-2 text-xl hover:text-neutral-400">
              <Link href={'/signup'}>signUp</Link>
            </li>
          </>
        )}
        {user && (
          <>
            <li className="text-xl">
              hello,{' '}
              <Link href={`user/${userId}`}>
                <span className="font-semibold">
                  {user.slice(0, user.indexOf('@'))}
                </span>
              </Link>
            </li>
            <li>
              <button
                className="bg-red-400/70 py-2 px-4 rounded-full text-neutral-100 hover:text-white shadow-sm"
                onClick={handleSignOut}
              >
                signOut
              </button>
            </li>
          </>
        )}
      </ul>
    </>
  );
}
