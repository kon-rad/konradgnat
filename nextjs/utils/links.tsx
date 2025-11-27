import {
  BsGithub,
  BsInstagram,
  BsLinkedin,
  BsTwitter,
  BsYoutube,
  BsDiscord,
  BsMedium,
  BsFillCalendarCheckFill,
} from 'react-icons/bs';
import { SiSubstack } from 'react-icons/si';
import { FaCoffee, FaEthereum } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

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
    title: 'YouTube - Drone Film Channel',
    icon: <BsYoutube />,
  },
  {
    url: 'https://substack.com/@0xmakereth',
    title: 'Substack',
    icon: <SiSubstack />,
  },
  {
    url: 'https://lenster.xyz/u/konrad',
    title: 'Lens',
    icon: <FaEthereum />,
  },
  {
    url: 'https://medium.com/@konradmgnat',
    title: 'Medium',
    icon: <BsMedium />,
  },
  {
    url: 'https://app.poap.xyz/scan/0xmaker.eth',
    title: 'POAPs',
    icon: <FaEthereum />,
  },
  {
    url: 'https://discord.com/users/0xmaker.eth#7252',
    title: 'Discord',
    icon: <BsDiscord />,
  },
  {
    url: 'https://ko-fi.com/0xmaker',
    title: 'Buy me a Coffee',
    icon: <FaCoffee />,
  },
  {
    url: 'mailto:konradmgnat@gmail.com',
    title: 'Email',
    icon: <MdEmail />,
  },
  {
    url: 'https://cal.com/konrad-gnat/30min',
    title: "30 Minute Meeting - Let's catch up",
    icon: <BsFillCalendarCheckFill />,
  },
];

export default Links;