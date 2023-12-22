import Button from '@/components/Button';
import ControllPost from '@/components/ControllPost';
import PostViewer from '@/components/PostViewer';
import { Post } from '@/components/PostsList';
import SlashIcon from '@/components/icons/SlashIcon';
import { deletePost, getPostById } from '@/service/posts';
import { redirect } from 'next/navigation';
import React, { Suspense } from 'react';

type Props = {
  params: {
    id: string;
  };
};

type ReadPost = Omit<Post, 'email'> & {
  username: string;
  userId: number;
};

const dynamic = 'force-dynamic';

export default async function PostPage({ params: { id } }: Props) {
  const post: ReadPost = (await getPostById(id))[0];
  console.log('id: ', id);

  return (
    <section className="mt-10">
      <h1 className="text-2xl font-semibold mb-3">{post.title}</h1>
      <div className="flex gap-3 items-center mb-10">
        <span className="font-semibold">{post.username}</span>
        <span className="text-sm text-neutral-500">
          {new Date(post.createdAt).toLocaleDateString()}
        </span>
        <ControllPost postId={id} authorId={post.userId} />
      </div>
      <PostViewer content={post.content} />
    </section>
  );
}
