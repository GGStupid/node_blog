'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  const { user, post } = controller;
  const userRequired = middleware.userRequired();
  // router.get('/', controller.home.index);

  router.post('/egg/api/user/login', user.login);
  router.post('/egg/api/user/register', user.register);


  router.get('/egg/api/post/all', post.getAllPosts);
  router.get('/egg/api/post/query/opts', post.queryPostsByOpts);
  router.get('/egg/api/post/id/:id', post.queryPostById);

  router.post('/egg/api/post/add', userRequired, post.addPost);
  router.post('/egg/api/post/update', userRequired, post.updatePost);
  router.post('/egg/api/post/del', userRequired, post.delPost);
  router.get('/egg/api/post/author/all', userRequired, post.queryPostsByAuthor);
};
