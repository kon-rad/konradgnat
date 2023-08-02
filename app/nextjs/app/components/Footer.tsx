import Links from '../../utils/links';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__links">
        {Links.map((item: any) => {
          return (
            <div className="footer__linkItem">
              <a href={item.url}>{item.icon}</a>
            </div>
          );
        })}
      </div>
      <div className="footer__content">
        <a
          href="https://github.com/kon-rad/konradgnat"
          target="_blank"
        >
          source code
        </a>
      </div>
    </div>
  );
};

export default Footer;
