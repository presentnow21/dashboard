'use client';
import AuthForm from '@/components/AuthForm';
import { AuthInfo, signIn } from '@/redux/features/auth-slice';
import { AppDispatch, useAppSelector } from '@/redux/store';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { redirect, useRouter } from 'next/navigation';
import React from 'react';
import { useDispatch } from 'react-redux';

export default function page() {
  const dispatch = useDispatch<AppDispatch>;
  const handleSubmit = (
    ev: React.FormEvent<HTMLFormElement>,
    dispatch: AppDispatch,
    router: AppRouterInstance
  ) => {
    const formData = new FormData(ev.currentTarget);
    ev.preventDefault();
    fetch('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({
        email: formData.get('email'),
        password: formData.get('password'),
        username: formData.get('username'),
      }),
      cache: 'no-store',
    }).then((res) => res.json().then((data) => router.push('/signin')));
  };

  return (
    <div>
      {/* <SignInForm /> */}
      <AuthForm handleSubmit={handleSubmit} type="signUp" />
    </div>
  );
}
