'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import parse from 'html-react-parser';

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
      .from('blog_post')
      .select()
      .filter('id', 'eq', id)
      .single();
    console.log('post data: ', data);
    setPost(data);
  };

  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  if (!post || Object.keys(post).length === 0)
    return <div>Post not found</div>;
  console.log('post: ', post);
  return (
    <div className="flex justify-center">
      <div className="max-w-prose">
        <h1 className="text-5xl mt-4 font-semibold tracking-wide">
          {post.title}
        </h1>
        <p className="text-sm font-light my-4">
          on {post.created_on}
        </p>
        <div className="mt-8 blog_post__content">
          {parse(post.content)}
        </div>
      </div>
    </div>
  );
}
