import { deletePost, getPostById, updatePost } from '@/service/posts';
import { NextRequest, NextResponse } from 'next/server';
type Props = {
  params: {
    id: string;
  };
};

export async function DELETE(req: NextRequest, { params: { id } }: Props) {
  console.log('delete id: ', id);
  const res = await deletePost(parseInt(id));
  return NextResponse.json('');
}

export async function GET(req: NextRequest, { params: { id } }: Props) {
  const post = await getPostById(id);
  return NextResponse.json(post);
}

export async function PUT(req: NextRequest, { params: { id } }: Props) {
  console.log('put id: ', id);
  const data = await req.json();
  const res = await updatePost(data.title, data.content, parseInt(id));
  return NextResponse.json('');
}
