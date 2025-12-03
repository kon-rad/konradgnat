'use client';

import { useState, useEffect, use } from 'react';
import parse, { domToReact, HTMLReactParserOptions, Element } from 'html-react-parser';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  preview: string | null;
  created_on: string;
  user_id: string | null;
  user_email: string | null;
}

export default function Post({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    try {
      const { id } = unwrappedParams;
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

  // Sanitize content by aggressively removing all control characters
  const sanitizeContent = (html: string) => {
    if (!html) return '';

    // First, replace escaped newlines with actual spaces
    let sanitized = html.replace(/\\r\\n/g, ' ').replace(/\\n/g, ' ').replace(/\\r/g, ' ');

    // Then remove actual control characters
    sanitized = sanitized.replace(/[\r\n\t]/g, ' ');

    // Finally collapse multiple spaces
    sanitized = sanitized.replace(/\s+/g, ' ');

    return sanitized;
  };

  // Parser options to handle errors gracefully
  const parserOptions: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode instanceof Element) {
        // If the tag name contains invalid characters, skip it
        if (domNode.name && /[\r\n\t]/.test(domNode.name)) {
          return <></>;
        }
      }
      return domNode;
    }
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
          {parse(sanitizeContent(post.content), parserOptions)}
        </div>
      </div>
    </div>
  );
}
