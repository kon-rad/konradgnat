
module.exports = app => {
  app.get(
    '/api/blog/:id', (req, res) => {
      console.log('inside blog');
    }
  );
};