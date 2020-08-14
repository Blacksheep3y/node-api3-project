const express = require('express');

const router = express.Router();
// require db to use functions
const userdb = require('./userDb');
const postdb = require('../posts/postDb');
const {validateUserId, validateUser, validatePost} = require('../validateUser')

router.use("/:id", validateUserId);

router.post('/', validateUser, (req, res) => {
    // do your magic!
    userdb.insert(req.body)
        .then(user => {
            res.status(201).json(user);
        })
        .catch( error => res.status(500).json({errorMessage: `Could not create a user`}))
});

router.post('/:id/posts', validatePost, (req, res) => {
  const postId = req.params.id
  const postInfo = {...req.body, user_id: postId }
      // do your magic!
  postdb.insert(postInfo)
      .then(user => {
          res.status(201).json(user);
      })
      .catch( error => res.status(500).json({errorMessage: `Error creating a post for user`}))
});

router.get('/', (req, res) => {
  // do your magic!
  userdb.get()
      .then(users => {
          res.status(200).json(users);
      })
      .catch( error => res.status(500).json({errorMessage: `Can not get users`}))
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  res.status(200).json(req.user)
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  userdb.getUserPosts(req.params.id)
      .then(posts => {
          res.status(200).json(posts)
      })
      .catch( error => res.status(500).json({errorMessage: `Error retrieving posts of specified user`}))
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  const id = req.params.id;
  userdb.remove(id)
      .then(user => {
          res.status(200).json({ message: "User was deleted.", user: req.user });
      })
      .catch( error => res.status(500).json({errorMessage: `Error deleting user.`}))
});

router.put('/:id', validateUser, (req, res) => {
  // do your magic!
  const id = req.params.id

  userdb.update(id, req.body)
      .then(user => {
          res.status(200).json(user)
      })
      .catch( error => res.status(500).json({errorMessage: `User could not be updated.`}))
});

module.exports = router;