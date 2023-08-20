import Links from '../utils/links';

const LinksPage = () => {
  return (
    <div className="links">
      <h1 className="text-xl">links</h1>
      <div className="links__list">
        {Links.map((item: any) => {
          return (
            <div className="links__item">
              <a href={item.url} target="_blank">
                {item.icon} {item.title}{' '}
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LinksPage;
