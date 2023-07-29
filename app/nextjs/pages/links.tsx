import Links from '../utils/links';

export default function LinksPage() {
  return (
    <div className="links">
      <h1>links</h1>
      <div className="links__list">
        {Links.map((item: any) => {
          return (
            <div className="links__item">
              <a href={item.url}>
                {item.icon} {item.title}{' '}
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
