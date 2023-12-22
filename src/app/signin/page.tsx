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
    fetch('/api/auth/signin', {
      method: 'POST',
      body: JSON.stringify({
        email: formData.get('email'),
        password: formData.get('password'),
      }),
    }).then((res) =>
      res.json().then((data) => {
        dispatch(signIn({ token: data.token, email: data.email, id: data.id }));
        router.push('/');
      })
    );
  };

  return (
    <div>
      <AuthForm handleSubmit={handleSubmit} type="singIn" />
    </div>
  );
}

// const SignInForm = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
//     const formData = new FormData(ev.currentTarget);
//     ev.preventDefault();
//     fetch('/api/auth/signin', {
//       method: 'POST',
//       body: JSON.stringify({
//         email: formData.get('email'),
//         password: formData.get('password'),
//       }),
//     }).then((res) =>
//       res
//         .json()
//         .then((data) =>
//           dispatch(signIn({ token: data.token, email: data.email }))
//         )
//     );
//   };
//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label htmlFor="email">Email</label>
//         <input
//           className="border border-neutral-600"
//           type="text"
//           name="email"
//           id="email"
//         />
//       </div>
//       <div>
//         <label htmlFor="password">password</label>
//         <input
//           className="border border-neutral-600"
//           type="text"
//           name="password"
//           id="password"
//         />
//       </div>
//       <button className="border p-2 bg-neutral-100" type="submit">
//         submit
//       </button>
//     </form>
//   );
// };
