import React from 'react';

export default () => {
  return (
    <section>
      <div className="container-fluid">
        <div className="cont section-3">
          <div className="row" id="contact">
            <div className="col-xs-12 titles">
              <h2>Contact</h2>
            </div>
          </div>

          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-8 col-md-offset-2">
              <form
                className=" displayBox form-horizontal"
                action="https://formspree.io/kgnat77@gmail.com"
                method="POST"
              >
                <fieldset>
                  <div className="form-group">
                    <label
                      htmlFor="message_name"
                      className="col-xs-4 col-md-4 control-label"
                    >
                      Name
                    </label>
                    <div className="input-group">
                      <input
                        name="message_name"
                        placeholder="Name"
                        className="form-control"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="message_email"
                      className="col-xs-4 col-md-4 control-label"
                    >
                      Email
                    </label>
                    <div className="input-group">
                      <input
                        name="message_email"
                        placeholder="E-Mail Address"
                        className="form-control"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="message_content"
                      className="col-xs-4 col-md-4 control-label"
                    >
                      Message
                    </label>
                    <div className="input-group">
                      <textarea
                        name="message_content"
                        cols="10"
                        rows="6"
                        placeholder="Message"
                        className="form-control"
                        type="text"
                      ></textarea>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-md-4 control-label"></label>
                    <div className="col-md-4">
                      <input
                        type="submit"
                        value="send"
                        className="submit-button"
                      />
                    </div>
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
