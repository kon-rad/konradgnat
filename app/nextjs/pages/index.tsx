import { useState } from 'react';
import useSWR from 'swr';
import PersonComponent from '../components/Person';
import type { Person } from '../interfaces';
import '@rainbow-me/rainbowkit/styles.css';
import { Tilt } from 'react-tilt';
import { TypeAnimation } from 'react-type-animation';

const defaultOptions = {
  reverse: false, // reverse the tilt direction
  max: 35, // max tilt rotation (degrees)
  perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
  scale: 1.1, // 2 = 200%, 1.5 = 150%, etc..
  speed: 1000, // Speed of the enter/exit transition
  transition: true, // Set a transition on enter/exit.
  axis: null, // What axis should be disabled. Can be X or Y.
  reset: true, // If the tilt effect has to be reset on exit.
  easing: 'cubic-bezier(.03,.98,.52,.99)', // Easing on enter/exit.
};
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Index() {
  const { data, error, isLoading } = useSWR<Person[]>(
    '/api/people',
    fetcher,
  );

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!data) return null;

  return (
    <div className="home">
      <div className="home__top">
        <h1 className="home__title">Konrad Gnat Portfolio</h1>
        <TypeAnimation
          sequence={[
            'Frontend Developer',
            1000,
            'Web3 Developer',
            1000,
            'Fullstack',
            1000,
            'React + Typescript Developer',
            1000,
          ]}
          wrapper="span"
          speed={50}
          style={{ fontSize: '2em', display: 'inline-block' }}
          repeat={Infinity}
        />
      </div>
      <div className="home__content">
        <div className="home__left">
          <Tilt
            options={defaultOptions}
            style={{ height: 200, width: 200 }}
          >
            <img
              src="/images/ai-avatar.JPG"
              alt=""
              className="home__avatar"
            />
          </Tilt>
        </div>
        <div className="home__right" id="about">
          <p>
            My mission is to build apps that push humanity forward.
          </p>
          <p>
            I am driven by a passion for learning and the quest to
            create the most value for humanity by building things at
            the intersection of art and technology.
          </p>
          <p>
            Among my greatest intellectual hero's are Buckminster
            Fuller, John Muir, Leonardo Da Vinci, John Steinbeck and
            Kahlil Gibran. On any given day I can be found coding
            applications. When not coding, I enjoy reading, running
            and zen meditation.
          </p>
          <div>
            <div className="home__textSection">
              <h3>Languages</h3>
              <p>JavaScript, Python, PHP, SQL, Java, Swift, C#, C</p>
            </div>
          </div>
          <div className="home__textSection">
            <h3>Frameworks</h3>
            <p>React, Redux, Django, Symfony</p>
          </div>
          <div className="home__textSection">
            <h3>Technologies</h3>
            <p>
              Git, MySQL, MongoDB, Linux, Unity VR Game Development,
              iOS development, Blender
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
