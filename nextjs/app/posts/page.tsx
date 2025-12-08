'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  preview: string | null;
  created_on: Date;
  user_id: string | null;
  user_email: string | null;
}

export default function Home() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    try {
      const response = await fetch('/api/posts');
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data = await response.json();
      console.log('posts data: ', data);
      const postsResponse = Array.isArray(data)
        ? data
        : Array.isArray(data?.posts)
          ? data.posts
          : [];
      setPosts(postsResponse);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  }
  const renderHeading = () => {
    if (loading) {
      return (
        <h1 className="text-3xl font-semibold tracking-wide mt-6 mb-2">
          loading ...
        </h1>
      );
    } else if (!posts.length) {
      return (
        <h1 className="text-3xl font-semibold tracking-wide mt-6 mb-2">
          No posts.
        </h1>
      );
    } else {
      return (
        <h1 className="text-3xl font-semibold tracking-wide mt-6 mb-2">
          Posts
        </h1>
      );
    }
  };

  return (
    <div className="flex justify-center content__container">
      <div className="max-w-prose">
        {renderHeading()}
        {posts.map((post: any) => {
          const displayDate = new Date(post.created_on)
            .toISOString()
            .slice(0, 10);
          return (
            <Link key={post.id} href={`/posts/${post.id}`}>
              <div className="cursor-pointer border-b border-gray-300	mt-8 pb-4">
                <h2 className="text-xl font-semibold">
                  {post.title}
                </h2>
                <p className="text-gray-500 mt-2">{post.preview}</p>
                <p className="text-gray-500 mt-2">
                  on: {displayDate}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
