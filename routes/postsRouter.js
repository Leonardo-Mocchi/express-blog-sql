const router = require('express').Router();
const PostsController = require('../controllers/postsController')

// index route
router.get('/', PostsController.index);

// show route
router.get('/:id', PostsController.show);

// delete route
router.delete("/:id", PostsController.destroy)

module.exports = router;
