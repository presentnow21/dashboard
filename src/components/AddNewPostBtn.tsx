'use client';
import { useAppSelector } from '@/redux/store';
import Link from 'next/link';
import React from 'react';
import AddIcon from './icons/AddIcon';

export default function AddNewPostBtn() {
  const user = useAppSelector(({ auth }) => auth.user.email);
  return (
    <>
      {user && (
        <Link href={'/new'} className="flex items-center gap-1">
          <AddIcon />
          <span className="text-base">새 글 작성</span>
        </Link>
      )}
    </>
  );
}
