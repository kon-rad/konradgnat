import axios from 'axios';
import { useState, useEffect } from 'react';

const Blog = () => {
  const [blogs, setBlogs] = useState<any>([]);

  useEffect(() => {
    if (blogs.length === 0) {
      fetchBlogs();
    }
  }, []);

  const fetchBlogs = async () => {
    try {
      const currBlogs = await axios.get('/api/blog');
      console.log('currBlogs: ', currBlogs);
      setBlogs(currBlogs.data);
    } catch (e: any) {
      console.error('error fetching blogs: ', e);
    }
  };

  return (
    <div className="flex items-center flex-col">
      <div>
        <h1 className="text-xl mb-8 text-center weight-bold">
          Blog Posts
        </h1>
      </div>
      <div className="max-w-prose ">
        {blogs.map((b: any, i: number) => {
          return <div>{b.title}</div>;
        })}
      </div>
    </div>
  );
};

export default Blog;
