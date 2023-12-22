import MyEditor from '@/components/editor/MyEditor';
import { getPostById } from '@/service/posts';
import { Metadata } from 'next';
import React, { useEffect } from 'react';

type Props = {
  params: {
    postId: string;
  };
};

export const metadata: Metadata = {
  title: 'edit',
  description: 'edit post',
};

export default async function EditPage({ params: { postId } }: Props) {
  const post = (await getPostById(postId))[0];
  return <MyEditor post={post} postId={postId} />;
}
