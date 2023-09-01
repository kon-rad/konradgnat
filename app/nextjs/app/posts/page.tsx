'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    fetchPosts();
  }, [supabase]);

  async function fetchPosts() {
    const { data, error } = await supabase
      .from('blog_post')
      .select()
      .order('created_on', { ascending: false });

    console.log('posts data: ', data);
    data && setPosts(data);
    setLoading(false);
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
