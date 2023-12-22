import useSWR from 'swr';

type PostsQurry = {
  offset: number;
  limit: number;
  type: string;
  value?: string;
  userId?: string;
};

export default function usePosts({
  offset,
  limit,
  type,
  value,
  userId,
}: PostsQurry) {
  const query = `/api/post?limit=${limit}&offset=${offset}${
    userId ? `&userId=${userId}` : ''
  }${value ? `&type=${type}&value=${value}` : ''}`;
  const { data: posts, isLoading, error, mutate } = useSWR(query);
  console.log('swr test: ', query);

  return { posts, isLoading, error };
}
