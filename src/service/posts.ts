import db from '@/db/maria';

export async function getPostsCount(
  type: string | null,
  value: string | null,
  userId: number | null
) {
  let query = `SELECT COUNT(*) as count FROM post P JOIN USER U ON P.author = U.idx ${
    value ? `WHERE ${type} LIKE '%${value}%'` : ''
  }`;
  if (userId) {
    query = `SELECT COUNT(*) as count FROM post P JOIN USER U ON P.author = U.idx WHERE P.author = ${userId}`;
  }
  const count = await db.query(query);
  return parseInt(count[0].count);
}

export async function getAllPosts() {
  const query = `SELECT P.idx AS postId, P.title, P.content, P.createdAt, U.email FROM post P JOIN USER U ON P.author = U.idx`;
  const allPosts = await db.query(query);
  return allPosts;
}

export async function getPagedPosts(limit: number, offset: number) {
  const query = `SELECT P.idx AS postId, P.title, P.content, P.createdAt, U.email FROM post P JOIN USER U ON P.author = U.idx LIMIT ${limit} OFFSET ${offset}`;
  const posts = await db.query(query);
  return posts;
}

export async function getFilteredPosts(
  limit: number,
  offset: number,
  type: string | null,
  value: string | null,
  userId: number | null
) {
  let query = `SELECT P.author as userId, P.idx AS postId, P.title, P.content, P.createdAt, U.email FROM post P JOIN USER U ON P.author = U.idx ${
    value ? `WHERE ${type} LIKE '%${value}%'` : ''
  }  ORDER BY P.createdAt DESC LIMIT ${limit} OFFSET ${offset}`;

  if (userId) {
    query = `SELECT P.author as userId, P.idx AS postId, P.title, P.content, P.createdAt, U.email FROM post P JOIN USER U ON P.author = U.idx ${`WHERE P.author = ${userId}`} ORDER BY P.createdAt DESC LIMIT ${limit} OFFSET ${offset}`;
  }

  const posts = await db.query(query);
  return posts;
}

export async function getPostById(id: string) {
  const query = `SELECT P.idx AS postId, P.title, P.content, P.createdAt, P.author as userId, U.username FROM post P JOIN USER U ON P.idx = ${id} AND P.author = U.idx`;
  const post = await db.query(query);
  return post;
}

export async function addNewPost(
  title: string,
  content: string,
  userId: number
) {
  const query = `INSERT INTO post (title, content, author) VALUES('${title}','${content}',${userId})`;
  const post = await db.query(query);
  return post;
}

export async function updatePost(
  title: string,
  content: string,
  postId: number
) {
  const query = `UPDATE post SET title = '${title}', content= '${content}' WHERE idx = ${postId}`;
  const post = await db.query(query);
  return post;
}

export async function deletePost(postId: number) {
  const query = `DELETE FROM post WHERE idx = ${postId}`;
  const res = await db.query(query);
  return res;
}
