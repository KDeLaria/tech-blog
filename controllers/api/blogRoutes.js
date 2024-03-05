const router = require('express').Router();
const { BlogPost } = require('../../models');
const isAuth = require('../../utils/auth');

router.get('/:id', async (res, req) => {
try {
  const blogData = await BlogPost.findByPk(req.params.id);
  const blog = blogData.get({ plain: true });
  
  res.status(200).json(blog);
  
} catch (err) {
  res.status(500).json({error:err.message});
}
});

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

router.put('/:id', isAuth, async (req, res) => {
  try {
    const blogData = await BlogPost.update({
      name:req.body.name,
      contents:req.body.contents},
      {where: {
        id: req.params.id,
        user_id: req.session.user_id}});

    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }
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
