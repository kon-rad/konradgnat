import Footer from './Footer';
import Nav from './Nav';

const Layout = ({ children }) => {
  const headerLinks = [
    {
      url: '/',
      title: 'Home',
    },
    {
      url: '/projects',
      title: 'Projects',
    },
    {
      url: '/#about',
      title: 'About',
    },
    {
      url: '/blog',
      title: 'Blog',
    },
    {
      url: '/bookshelf',
      title: 'Bookshelf',
    },
    {
      url: '/resume',
      title: 'Resume',
    },
    {
      url: '/links',
      title: 'Links',
    },
  ];
  return (
    <div className="layout">
      <Nav />
      <div className="layout__content">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
