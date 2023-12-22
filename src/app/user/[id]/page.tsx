import PostsList from '@/components/PostsList';
import React from 'react';

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params: { id } }: Props) {
  return {
    title: 'user page',
  };
}

export default function UserPage({ params: { id } }: Props) {
  return (
    <div>
      <PostsList userId={id} />
    </div>
  );
}
