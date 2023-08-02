'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

export default function Post({ params }) {
  const [post, setPost] = useState({});
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    fetchPost();
  }, [supabase]);

  const fetchPost = async () => {
    const { id } = params;
    const { data } = await supabase
      .from('posts')
      .select()
      .filter('id', 'eq', id)
      .single();
    console.log('post data: ', data);
    setPost(data);
  };

  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  if (!post) return <div>Post not found</div>;
  return (
    <div>
      <h1 className="text-5xl mt-4 font-semibold tracking-wide">
        {post.title}
      </h1>
      <p className="text-sm font-light my-4">by {post.user_email}</p>
      <div className="mt-8">
        <ReactMarkdown className="prose" children={post.content} />
      </div>
    </div>
  );
}
