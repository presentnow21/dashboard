'use client';
import React from 'react';
import SlashIcon from './icons/SlashIcon';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/redux/store';

type Props = {
  postId: string;
  authorId: number;
};

export default function ControllPost({ postId, authorId }: Props) {
  const router = useRouter();
  const userId = useAppSelector(({ auth }) => auth.user.id);

  const removePost = async () => {
    const res = await fetch(`/api/post/${postId}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      alert('게시물이 삭제되었습니다.');
      router.push('/');
    }
  };
  return (
    <>
      {userId == authorId && (
        <span className="flex">
          {/* <Link href={`/new?postId=${postId}`}>수정</Link> */}
          <Link href={`/edit/${postId}`}>수정</Link>
          <span>
            <SlashIcon />
          </span>
          <button onClick={removePost}>삭제</button>
        </span>
      )}
    </>
  );
}
