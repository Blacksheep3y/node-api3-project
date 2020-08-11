const express = require('express');

const router = express.Router();

const postdb = require('../posts/postDb');



router.get('/', (req, res) => {
    // do your magic!
    postdb.get()
        .then(posts => res.status(200).json(posts))
        .catch(next)
});

router.get('/:id', validatePostId, (req, res) => {
    // do your magic!
    res.status(200).json(req.post)
});

router.delete('/:id', validatePostId, (req, res) => {
    // do your magic!
    const id = req.params.id;
    postdb.remove(id)
        .then(post => {
            res.status(200).json({ message: "post was not deleted.", post: req.post });
        })
        .catch(next)
});

router.put('/:id', validatePostId, (req, res) => {
    // do your magic!
    const id = req.params.id
    postdb.update(id, req.body)
        .then(post => {
            res.status(200).json({ message: "SUCCESSS!!", post })
        })
        .catch(next)
});

// custom middleware

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
        .catch(next)
}

module.exports = router;