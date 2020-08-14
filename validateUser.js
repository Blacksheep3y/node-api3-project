const userdb = require('./users/userDb');
const postdb = require('./posts/postDb');

// userRouter custom middleware
function validateUserId(req, res, next) {
    // do your magic!
    userdb.getById(req.params.id)
        .then(user => {
            if (user) {
                req.user = user
                next();
            } else {
                res.status(400).json({ message: "Invalid user id." });
            }
        })
        .catch( error => res.status(500).json({errorMessage: `Can not get users`}))
  }
  
  function validateUser(req, res, next) {
    // do your magic!
    if (req.body) {
        if (req.body.name) {
            next();
        } else {
            res.status(400).json({ message: "Missing required name field." })
        }
    } else {
        res.status(400).json({ message: "Missing user data." });
    }
  };
  
  function validatePost(req, res, next) {
    // do your magic!
    if (req.body) {
        if (req.body.text) {
            next();
        } else {
            res.status(400).json({ message: "Missing required text field." })
        }
    } else {
        res.status(400).json({ message: "Missing post data." });
    }
  }

// postRouter custom middleware
function validatePostId(req, res, next) {
    // do your magic!
    postdb.getById(req.params.id)
        .then(post => {
            if (post) {
                req.post = post
                next();
            } else {
                res.status(400).json({ message: "Invalid post id" });
            }
        })
        .catch( error => res.status(500).json({errorMessage: `Can not get users`}))
}

  module.exports = 
{
  validatePost,
  validateUser,
  validateUserId,
  validatePostId
};