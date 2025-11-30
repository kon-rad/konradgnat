'use client';

import { useState, useEffect } from 'react';
import parse from 'html-react-parser';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  preview: string | null;
  created_on: string;
  user_id: string | null;
  user_email: string | null;
}

export default function Post({ params }) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    try {
      const { id } = params;
      const response = await fetch(`/api/posts/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch post');
      }
      const data = await response.json();
      console.log('post data: ', data);
      setPost(data);
    } catch (error) {
      console.error('Error fetching post:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  console.log('post: ', post);

  // Sanitize content by removing invalid characters from HTML tags
  const sanitizeContent = (html: string) => {
    if (!html) return '';
    // Remove carriage returns and newlines within tag names
    return html.replace(/<([^>]+)>/g, (_, tagContent) => {
      const cleanedTag = tagContent.replace(/[\r\n\t]/g, '');
      return `<${cleanedTag}>`;
    });
  };

  return (
    <div className="flex justify-center">
      <div className="max-w-prose">
        <h1 className="text-5xl mt-4 font-semibold tracking-wide">
          {post.title}
        </h1>
        <p className="text-sm font-light my-4">
          on {new Date(post.created_on).toISOString().slice(0, 10)}
        </p>
        <div className="mt-8 blog_post__content">
          {parse(sanitizeContent(post.content))}
        </div>
      </div>
    </div>
  );
}
