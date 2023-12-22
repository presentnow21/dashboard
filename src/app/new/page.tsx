import MyEditor from '@/components/editor/MyEditor';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'new',
  description: 'add new post',
};

export default function page() {
  return (
    <>
      <MyEditor />
    </>
  );
}
