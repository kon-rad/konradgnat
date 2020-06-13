import React from 'react';
import { Link } from 'react-router-dom';

const BlogBlurb = ({ post }) => {
  console.log('post', post);
  return (
    <p>
      start
      <Link to={post.slug || '#'}>
        {post.title} <span className="float_right">{post.date}</span>
      </Link>
      end
    </p>
  );
};

export default BlogBlurb;
