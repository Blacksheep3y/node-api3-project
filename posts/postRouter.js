const express = require('express');

const router = express.Router();

const postdb = require('../posts/postDb');

const {validatePostId} = require('../validateUser')



router.get('/', (req, res) => {
    // do your magic!
    postdb.get()
        .then(posts => res.status(200).json(posts))
        .catch( error => res.status(500).json({errorMessage: "Something went wrong trying to get the posts." }))
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
            res.status(200).json({ message: "post was successfully deleted.", post: req.post });
        })
        .catch( error => res.status(500).json({errorMessage: `The Post ID could not be deleted.`}))
});

router.put('/:id', validatePostId, (req, res) => {
    // do your magic!
    const id = req.params.id
    postdb.update(id, req.body)
        .then(post => {
            res.status(200).json({ message: "SUCCESSS!!", post })
        })
        .catch( error => res.status(500).json({errorMessage: `There was a problem updating post.`}))
});

module.exports = router;