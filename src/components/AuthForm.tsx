'use client';
import { AppDispatch } from '@/redux/store';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useDispatch } from 'react-redux';

type Props = {
  handleSubmit: (
    ev: React.FormEvent<HTMLFormElement>,
    dispatch: AppDispatch,
    router: AppRouterInstance
  ) => void;
  type: 'signUp' | 'singIn';
};

export default function AuthForm({ handleSubmit, type }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  return (
    <form onSubmit={(ev) => handleSubmit(ev, dispatch, router)}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          className="border border-neutral-600"
          type="text"
          name="email"
          id="email"
        />
      </div>
      {type === 'signUp' && (
        <div>
          <label htmlFor="username">name</label>
          <input
            className="border border-neutral-600"
            type="text"
            name="username"
            id="username"
          />
        </div>
      )}
      <div>
        <label htmlFor="password">password</label>
        <input
          className="border border-neutral-600"
          type="text"
          name="password"
          id="password"
        />
      </div>
      <button className="border p-2 bg-neutral-100" type="submit">
        submit
      </button>
    </form>
  );
}
