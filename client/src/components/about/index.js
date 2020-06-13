import React from 'react';

export default () => {
  return (
    <section>
      <div className="container-fluid">
        <div className="row cont" id="about">
          <div className="col-xs-12 titles">
            <h2> About </h2>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row cont section-2">
          <div className="col-xs-12 col-md-8 col-md-offset-2 displayBox">
            <div className="row">
              <div className="col-xs-12 col-sm-6">
                <div className="about__image_wrapper">
                  <img
                    className="about__image"
                    src="dist/images/pier39.JPG"
                    alt=""
                  />
                </div>
              </div>
              <div className="col-xs-12 col-sm-6 textBox textContent">
                <span className="textContent">
                  My mission is to engineer solutions to make the world a better
                  place for everyone. I made my way to programming through
                  environmental studies, chemistry and then literature. I have
                  been driven by a curiosity and a passion for learning. Among
                  my greatest intellectual hero's are John Muir, Leonardo Da
                  Vinci, John Steinbeck and Kahlil Gibran. On any given day I
                  can be found developing applications using JavaScript, React,
                  PHP and Node.
                </span>
                <br />
                <br />
                <div>
                  <span className="uppercase">Languages</span>
                  <br />
                  <ul style={{ listStyle: 'none' }}>
                    <li>
                      <i>expertise:</i> JavaScript, PHP, SQL
                    </li>
                    <li>
                      <i>familiar:</i> C, Java, Python
                    </li>
                  </ul>
                </div>
                <br />
                <span className="uppercase">Frameworks</span>
                <br />
                Node, Symfony, React, jQuery, Express
                <br />
                <br />
                <span className="uppercase">Technologies</span>
                <br />
                CSS3/HTML5, Git, Vim, MySQL, MongoDB, Linux
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
