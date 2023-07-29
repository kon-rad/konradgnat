import Footer from './Footer';

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
      <div className="header">
        {headerLinks.map((item: any) => {
          return (
            <div className="header__link">
              <a href={item.url}>{item.title}</a>
            </div>
          );
        })}
      </div>
      <div className="layout__content">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
