'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import { prisma } from '@/lib/prisma';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  preview: string | null;
  created_on: Date;
  user_id: string | null;
  user_email: string | null;
}

const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    try {
      const data = await prisma.blogPost.findMany({
        orderBy: { created_on: 'desc' }
      });
      console.log("data ", data)

      if (data && data.length > 0) {
        setFeaturedPost(data[0]); // First post becomes featured
        setPosts(data.slice(1)); // Rest of the posts
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  }

  const getImageFromBlog = (blog: any) => {
    const regex = /!\[.*?\]\((.*?)\)/;
    const match = blog?.content?.match(regex);
    return match ? match[1] : "";
  };

  const removeMarkdown = (content: string) => {
    if (!content) return "";
    const removeImages = content.replace(/!\[.*?\]\(.*?\)/g, "");
    const removeHeadings = removeImages.replace(/#{1,6}\s.*?\n/g, "");
    return removeHeadings;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!featuredPost) {
    return <div>No posts found</div>;
  }

  const firstBlog = featuredPost;
  const restBlogs = posts;
  const calcReadingTime = (article: string) => {
    const words = article.split(/\s+/).length;
    const readingTime = Math.ceil(words / 200);
    return `${readingTime}`;
  };

  const firstBlogReadingTime = calcReadingTime(firstBlog.content);

  const date = new Date(firstBlog.created_on);
  const humanReadableDate = date.toLocaleDateString();

  return (
    <div>
      <div className="flex flex-wrap flex-row space-x-4 space-y-4 my-24 max-w-screen-lg mx-auto">
        <div className="mb-8 flex flex-col border rounded mb-12 mt-6 p-6 drop-shadow-xl">
          <Link href={`/posts/${firstBlog.id}`}>
            <h2 className="mb-4 text-4xl text-bold  mb-14">
              {firstBlog.title}
            </h2>
          </Link>
          <div className="flex flex-col sm:flex-row pt-6">
            <div
              className="bg-center bg-cover h-[260px] w-1/2 rounded-xl max-w-1/2 mx-auto drop-shadow-xl"
              style={{ backgroundImage: `url(${getImageFromBlog(firstBlog)})` }}
            ></div>
            <p className="text-xl overflow-hidden w-1/2 px-6">
              {removeMarkdown(firstBlog?.content?.substring(0, 500))}...
            </p>
          </div>
          <div className="flex flex-row py-2 mt-8 items-center">
            <p className="text-sm mr-8">{firstBlogReadingTime} min read</p>
            <p className="text-sm mr-8 text-slate-800 dark:text-slate-300">
              {humanReadableDate}
            </p>{" "}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-4 my-12 drop-shadow-xl">
          {restBlogs.map((blog: any, i: number) => {
            const blogReadingTime = calcReadingTime(blog.content);

            const date = new Date(blog.created_on!);
            const blogDate = date.toLocaleDateString();
            return (
              <div
                className="flex flex-col p-6 rounded-xl border"
                key={`blog_${blog.id}`}
              >
                <Link href={`/posts/${blog.id}`}>
                  <h2 className="mb-6 text-2xl font-bold">{blog.title}</h2>
                </Link>
                <div
                  className="bg-center bg-cover h-[120px] w-full rounded-xl mb-4 drop-shadow-xl"
                  style={{ backgroundImage: `url(${getImageFromBlog(blog)})` }}
                ></div>
                <p className="text-xl overflow-hidden">
                  {removeMarkdown(blog?.content)?.substring(0, 100)}...
                </p>
                <div className="flex flex-row py-2 mt-8 items-center">
                  {/* <p className="text-sm mr-2">author: </p> */}
                  
                  <p className="text-sm mr-8">{blogReadingTime} min read</p>
                  <p className="text-sm mr-8 text-slate-800 dark:text-slate-300">
                    {blogDate}
                  </p>{" "}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
