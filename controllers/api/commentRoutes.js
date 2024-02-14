const router = require('express').Router();
const { Comment } = require('../../models');
const isAuth = require('../../utils/auth');

router.post('/', isAuth, async (req, res) => {
    try {
      const newComment = await Comment.create({
        blog_id:req.body.blog_id, 
        contents:req.body.contents,
        user_id: req.session.user_id,
        date_created: new Date ()
      });
  
      res.status(200).json({newComment: newComment});
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  router.delete('/:id', isAuth, async (req, res) => {
    try {
      const commentData = await Comment.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!commentData) {
        res.status(404).json({ message: 'No comment found with this id!' });
        return;
      }
  
      res.status(200).json({commentData: commentData});
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;