const router = require('express').Router();
const { BlogPost, Comment } = require('../../models');
const isAuth = require('../../utils/auth');

router.post('/', isAuth, async (req, res) => {
  try {
    const newBlog = await BlogPost.create({
      name:req.body.name, 
      contents:req.body.contents,
      user_id: req.session.user_id,
      date_created: new Date ()
    });

    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', isAuth, async (req, res) => {
  try {
    const blogData = await BlogPost.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
