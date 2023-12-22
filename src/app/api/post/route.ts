import {
  addNewPost,
  getAllPosts,
  getFilteredPosts,
  getPagedPosts,
  getPostsCount,
} from '@/service/posts';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const data = await req.json();
  try {
    const post = await addNewPost(data.title, data.content, data.userId);
    console.log('post data', data);
    return NextResponse.json('ok');
  } catch (err) {
    console.log('err; ', err);
    return NextResponse.json('fail', { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const offset = searchParams.get('offset');
  const limit = searchParams.get('limit');
  const type = searchParams.get('type');
  const value = searchParams.get('value');
  const userId = searchParams.get('userId');
  // const allPosts = await getAllPosts();
  // const posts = await getPagedPosts(parseInt(limit!), parseInt(offset!));
  const count = await getPostsCount(
    type === 'author' ? 'U.email' : 'P.title',
    value,
    userId ? parseInt(userId) : null
  );
  const posts = await getFilteredPosts(
    parseInt(limit!),
    parseInt(offset!),
    type === 'author' ? 'U.email' : 'P.title',
    value,
    userId ? parseInt(userId) : null
  );

  return NextResponse.json({ posts, total: count });
}
