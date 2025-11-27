'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { PrismaClient } from '@prisma/client';
import 'easymde/dist/easymde.min.css';

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
});

const prisma = new PrismaClient();
const initialState = { title: '', content: '' };

function CreatePost() {
  const [post, setPost] = useState(initialState);
  const { title, content } = post;
  const router = useRouter();

  function onChange(e) {
    setPost(() => ({ ...post, [e.target.name]: e.target.value }));
  }

  async function createNewPost() {
    if (!title || !content) return;

    console.log('post: ', post);
    const data = await prisma.blogPost.create({
      data: { title, content }
    });
    console.log('data: ', data);
    router.push(`/posts/${data.id}`);
  }
  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-wide mt-6">
        Create new post
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
        type="button"
        className="mb-4 bg-green-600 text-white font-semibold px-8 py-2 rounded-lg"
        onClick={createNewPost}
      >
        Create Post
      </button>
    </div>
  );
}

export default CreatePost;
