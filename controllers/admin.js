module.exports = function(app) {
  var Post = require('../models/post').Post(app.db);

  app.get('/admin', function(req, res) {
    res.redirect('/admin/posts');
  });  

  app.get('/admin/posts', function(req, res) {
    Post.find({}, function(err, posts) {
      res.render('admin/index', { posts: posts });
    });
  });

  app.post('/admin/posts', function(req, res) {
    var post = new Post(req.body.post);
    post.save(function(err) {
      res.redirect('/admin/posts');
    });
  });

  //Middeware para parâmetros
  app.param('id', function(req, res, next, id) {
    Post.findById(id, function(err, post) {
      req.post = post;
      next();
    });
  });

  app.put('/admin/posts/:id', function(req, res) {
    var post = req.post;
    post.titulo = req.body.post.titulo;
    post.corpo = req.body.post.corpo;
    post.dataAlteracao = new Date();
    post.save(function(err) {
      res.redirect('/admin/posts');
    });
  });

  app.get('/admin/posts/:id/destroy', function(req, res) {
    Post.remove({_id: req.params.id}, function(err) {
      res.redirect('/admin/posts');
    });
  });

  app.get('/admin/posts/:id/edit', function(req, res) {
    res.render('admin/edit', { post: req.post });
  });

  app.get('/admin/posts/new', function(req, res) {
    res.render('admin/new', { post: new Post() });
  });

  app.get('/admin/posts/:id', function(req, res) {
    res.render('admin/show', { post: req.post });
  });
};
