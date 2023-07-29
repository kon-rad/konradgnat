import {
  BsGithub,
  BsInstagram,
  BsLinkedin,
  BsTwitter,
  BsYoutube,
} from 'react-icons/bs';
import { SiSubstack } from 'react-icons/si';
import { FaEthereum } from 'react-icons/fa';

const Links = [
  {
    url: 'https://instagram.com/konradgnat',
    title: 'Instagram',
    icon: <BsInstagram />,
  },
  {
    url: 'https://github.com/kon-rad',
    title: 'GitHub',
    icon: <BsGithub />,
  },
  {
    url: 'https://linkedin.com/in/konrad-gnat',
    title: 'LinkedIn',
    icon: <BsLinkedin />,
  },
  {
    url: 'https://twitter.com/konrad_gnat',
    title: 'Twitter',
    icon: <BsTwitter />,
  },
  {
    url: 'https://www.youtube.com/channel/UCUIFdez2IItVFaDTJQyPywg/videos',
    title: 'YouTube',
    icon: <BsYoutube />,
  },
  {
    url: 'https://substack.com/@0xmakereth',
    title: 'Substack',
    icon: <SiSubstack />,
  },
  // {
  //   url: 'https://lenster.xyz/u/konrad',
  //   title: 'Lens',
  //   icon: 'Lens',
  // },
  // {
  //   url: 'https://lenster.xyz/u/konrad',
  //   title: 'Ethereum',
  //   icon: <FaEthereum />,
  // },
];

export default Links;
