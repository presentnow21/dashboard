import AddNewPostBtn from '@/components/AddNewPostBtn';
import PaginationController from '@/components/PaginationController';
import PostsList from '@/components/PostsList';
import { getAllPosts } from '@/service/posts';
import { Suspense } from 'react';

const dynamic = 'force-dynamic';

export default async function Home() {
  // const posts = await getAllPosts();
  // console.log('posts: ', posts);
  return (
    <section className="mt-10">
      <div className="flex justify-end pb-5">
        <AddNewPostBtn />
      </div>
      <PostsList />
      {/* <PaginationController/> */}
    </section>
  );
}
