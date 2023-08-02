'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import 'easymde/dist/easymde.min.css';

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
});

function EditPost({ params }) {
  const [post, setPost] = useState(null);
  const router = useRouter();
  const { id } = params;
  const supabase = createClientComponentClient();

  useEffect(() => {
    fetchPost();
    async function fetchPost() {
      if (!id) return;
      const { data } = await supabase
        .from('posts')
        .select()
        .filter('id', 'eq', id)
        .single();
      setPost(data);
    }
  }, [id]);
  if (!post) return null;
  function onChange(e) {
    setPost(() => ({ ...post, [e.target.name]: e.target.value }));
  }
  const { title, content } = post;
  async function updateCurrentPost() {
    if (!title || !content) return;
    await supabase
      .from('posts')
      .update([{ title, content }])
      .match({ id });
    router.push('/posts');
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
