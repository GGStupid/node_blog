'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  const { user, post, upload } = controller;
  const userRequired = middleware.userRequired();

  router.post('/egg/api/user/login', user.login);
  router.post('/egg/api/user/register', user.register);

  router.get('/egg/api/post/all', post.getAllPosts);
  router.get('/egg/api/post/query/opts', post.queryPostsByOpts);
  router.get('/egg/api/post/read/:id', post.queryPostPvAdd);

  router.post('/egg/api/upload/file', upload.upLoadImg);

  router.post('/egg/api/post/add', userRequired, post.addPost);
  router.get('/egg/api/post/id/:id', userRequired, post.queryPostById);
  router.post('/egg/api/post/update', userRequired, post.updatePost);
  router.post('/egg/api/post/del', userRequired, post.delPost);
  router.get('/egg/api/post/author/all', userRequired, post.queryPostsByAuthor);
};
