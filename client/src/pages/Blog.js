import React from 'react';
import { Link } from 'react-router-dom';
import Strapi from 'strapi-sdk-javascript/build/main';
import BlogBlurb from '../components/blogBlurb';

const strapi = new Strapi('http://localhost:1337');

class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  async componentDidMount() {
    try {
      const posts = await strapi.getEntries('blogposts');
      this.setState({ posts });
    } catch (err) {
      alert(err);
    }
  }

  render() {
    return (
      <section className="blog">
        <div className="jumbotron_image__blog-header"></div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-8 col-sm-offset-2">
              <div className="page-header">
                <h1>Articles</h1>
              </div>
              <div className="blog_text">
                <section className="blog_links">
                  <div className="well well-lg">
                    {this.state.posts.map(post => (
                      <BlogBlurb post={post} key={post.slug} />
                    ))}
                    <p>
                      <a href="blog-redux-saga.html">
                        What is Redux-Saga{' '}
                        <span className="float_right">December 3rd, 2017</span>
                      </a>
                    </p>
                    <p>
                      <a href="blog-jest.html">
                        How to test a react app with Jest
                        <span className="float_right">December 10th, 2017</span>
                      </a>
                    </p>
                    <p>
                      <a href="blog-heaps.html">
                        Min and max heaps in Python3
                        <span className="float_right">December 17th, 2017</span>
                      </a>
                    </p>
                    <p>
                      <a href="blog-trie.html">
                        The Trie Data Structure in Python3
                        <span className="float_right">December 25th, 2017</span>
                      </a>
                    </p>
                    <p>
                      <a href="blog-bubble-and-quicksort.html">
                        Bubble Sort and Quicksort Algorithms in Python3
                        <span className="float_right">January 2nd, 2018</span>
                      </a>
                    </p>
                    <p>
                      <a href="blog-longest-common-subsequence.html">
                        Longest Common Subsequence Problem
                        <span className="float_right">January 14th, 2018</span>
                      </a>
                    </p>
                    <p>
                      <a href="blog-merge-sort.html">
                        Merge Sort Algorithm
                        <span className="float_right">January 28th, 2018</span>
                      </a>
                    </p>
                    <p>
                      <a href="blog-heaps-algorithm.html">
                        Heap's Algorithm
                        <span className="float_right">February 15th, 2018</span>
                      </a>
                    </p>
                    <p>
                      <a href="blog-functional-programming.html">
                        What is Functional Programming?
                        <span className="float_right">March 30th, 2019</span>
                      </a>
                    </p>
                    <p>
                      <a href="blog-git-commands.html">
                        Helpful git Commands
                        <span className="float_right">
                          September 30th, 2019
                        </span>
                      </a>
                    </p>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Blog;
