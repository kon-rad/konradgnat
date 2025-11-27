'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { prisma } from '@/lib/prisma';
import 'easymde/dist/easymde.min.css';

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
});

interface Post {
  id: string;
  title: string;
  content: string;
  created_on: Date;
  user_id: string | null;
  user_email: string | null;
}

function EditPost({ params }) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    fetchPost();
  }, [id]);

  async function fetchPost() {
    try {
      if (!id) return;
      const data = await prisma.post.findUnique({
        where: { id }
      });
      setPost(data);
    } catch (error) {
      console.error('Error fetching post:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div>Loading...</div>;
  if (!post) return <div>Post not found</div>;

  function onChange(e) {
    if (post) {
      setPost({ ...post, [e.target.name]: e.target.value });
    }
  }

  const { title, content } = post;

  async function updateCurrentPost() {
    if (!title || !content) return;
    try {
      await prisma.post.update({
        where: { id },
        data: { title, content }
      });
      router.push('/posts');
    } catch (error) {
      console.error('Error updating post:', error);
    }
  }
  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-wide mt-6 mb-2">
        Edit post
      </h1>
      <input
        onChange={onChange}
        name="title"
        placeholder="Title"
        value={post.title}
        className="border-b pb-2 text-lg my-4 focus:outline-none w-full font-light text-gray-500 placeholder-gray-500 y-2"
      />
      <SimpleMDE
        value={post.content}
        onChange={(value) => setPost({ ...post, content: value })}
      />
      <button
        className="mb-4 bg-blue-600 text-white font-semibold px-8 py-2 rounded-lg"
        onClick={updateCurrentPost}
      >
        Update Post
      </button>
    </div>
  );
}

export default EditPost;
