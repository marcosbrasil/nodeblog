module.exports = function(app) {
  var Post = require('../models/post').Post(app.db);

  app.get('/', function(req, res) {
    Post.find({}, function(err, posts) {
      res.render('blog/index', { posts: posts });
    });
  });

  app.get('/:id', function(req, res) {
    Post.findById(req.params.id, function(err, post) {
      res.render('blog/post', { post: post });
    });
  });
};
