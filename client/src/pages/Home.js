import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/hero';
import About from '../components/about';
import Contact from '../components/contact';
import Projects from '../components/projects';

function Home() {
  return (
    <div id="website_wrapper">
      <Hero />
      <Projects />
      <About />
      <Contact />
    </div>
  );
}

export default Home;
