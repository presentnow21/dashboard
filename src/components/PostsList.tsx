'use client';

import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import PaginationController from './PaginationController';
import PostFilter from './PostFilter';
import Loader from './Loader';
import { useRouter } from 'next/navigation';
import usePosts from '@/hooks/posts';

export type Post = {
  userId: number;
  postId: number;
  title: string;
  content: string;
  createdAt: Date;
  email: string;
};

type Props = {
  userId?: string;
};

const POSTS_LIMIT = 2;

export default function PostsList({ userId }: Props) {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [page, setPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState<number | null>(null);
  const [selectedOption, setSelectedOption] = useState('tilte');
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);

  const { posts: post, isLoading } = usePosts({
    offset: (page - 1) * POSTS_LIMIT,
    limit: POSTS_LIMIT,
    type: selectedOption,
    value: keyword,
    userId,
  });

  console.log('=========', post, isLoading);

  const router = useRouter();

  const handleFilter = useCallback(
    async (option: string, value: string) => {
      console.log('selectedOption: ', selectedOption, '  value: ', value);
      setSelectedOption(option);
      setKeyword(value);
      setPage(1);
      const res = await fetch(
        `/api/post?limit=${POSTS_LIMIT}&offset=0&type=${selectedOption}&value=${value}`
      );
      if (res.ok) {
        const { posts, total } = await res.json();
        setPosts(posts);
        setTotalPosts(total);
      }
    },
    [selectedOption]
  );

  useEffect(() => {
    (async () => {
      setLoading(true);
      let query = '';
      if (userId) {
        query = `/api/post?limit=${POSTS_LIMIT}&offset=${
          (page - 1) * POSTS_LIMIT
        }${`&userId=${userId}`}`;
      } else {
        query = `/api/post?limit=${POSTS_LIMIT}&offset=${
          (page - 1) * POSTS_LIMIT
        }${keyword ? `&type=${selectedOption}&value=${keyword}` : ''}`;
      }
      const res = await fetch(query);
      if (res.ok) {
        const { posts, total } = await res.json();
        setPosts(posts);
        setTotalPosts(total);
      }
      setLoading(false);
      // if (email) {
      //   query = `/api/post?limit=${POSTS_LIMIT}&offset=${
      //     (page - 1) * POSTS_LIMIT
      //   }${`&type=author&value=${email}`}`;
      // } else {
      //   query = `/api/post?limit=${POSTS_LIMIT}&offset=${
      //     (page - 1) * POSTS_LIMIT
      //   }${keyword ? `&type=${selectedOption}&value=${keyword}` : ''}`;
      // }
      // const res = await fetch(query);
      // if (res.ok) {
      //   const { posts, total } = await res.json();
      //   setPosts(posts);
      //   setTotalPosts(total);
      // }
    })();
  }, [page, keyword, selectedOption, userId]);

  return (
    <section className="w-full">
      {/* <div className="h-[2.5rem] border-b flex">
        <span className="w-[10%]"></span>
        <span className="w-[60%] text-center">제목</span>
        <span className="w-[20%]">작성자</span>
        <span className="w-[20%]">작성일</span>
      </div>
      <div>
        {posts &&
          posts.map(({ postId, title, createdAt, email }) => (
            <Link key={postId} href={`/post/${postId}`}>
              <div className="flex hover:bg-neutral-100/50 border-b cursor-pointer">
                <span className="w-[10%] py-3">{postId}</span>
                <span className="w-[50%] text-start py-3 truncate">
                  {title}
                </span>
                <span className="w-[20%] text-center py-3 truncate">
                  {email}
                </span>
                <span className="max-w-[20%] text-center py-3 truncate">
                  {new Date(createdAt).toLocaleDateString()}
                </span>
              </div>
            </Link>
          ))}
      </div> */}
      <div className="min-h-[530px]">
        <div className="h-[2.5rem] border-b flex">
          <span className="w-[10%]"></span>
          <span className="w-[60%] text-center">제목</span>
          <span className="w-[20%]">작성자</span>
          <span className="w-[20%]">작성일</span>
        </div>
        {loading && (
          <div className="w-full h-full text-center flex justify-center mt-10">
            <Loader />
          </div>
        )}
        <div>
          {posts &&
            !loading &&
            posts.map(({ userId, postId, title, createdAt, email }) => (
              <div
                className="flex hover:bg-neutral-100/50 border-b cursor-pointer"
                key={postId}
                onClick={() => router.push(`/post/${postId}`)}
              >
                <span className="w-[10%] py-3">{postId}</span>
                <span className="w-[50%] text-start py-3 truncate">
                  {title}
                </span>

                <span
                  onClick={(ev) => {
                    ev.stopPropagation();
                    console.log('clicked');
                    router.push(`/user/${userId}`);
                  }}
                  className="w-[20%] text-center py-3 truncate hover:underline"
                >
                  {email}
                </span>

                <span className="max-w-[20%] text-center py-3 truncate">
                  {new Date(createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}
        </div>
      </div>
      <div className="py-2">
        <PaginationController
          page={page}
          totalPage={getPages(totalPosts ?? 0, POSTS_LIMIT)}
          setPage={setPage}
        />
        <div className="border-b my-4"></div>
        {!userId && (
          <PostFilter
            handleFilter={handleFilter}
            selectedOption={selectedOption}
            // setSelectedOption={(val: string) => setKeyword(val)}
          />
        )}
      </div>
    </section>
  );
}

const getPages = (totalPosts: number, limit: number): number => {
  const rest = totalPosts % limit;
  if (rest) {
    return Math.ceil(totalPosts / limit);
  }
  return totalPosts / limit;
};
