const router = require('express').Router();
const { User, BlogPost, Comment } = require('../models');
const isAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const blogData = await BlogPost.findAll({
      attributes: { exclude: ['password'] },
      include: [{ model: User}],
    });

    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    res.render('homepage', { 
      blogs, 
      loggedIn: req.session.loggedIn 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/blog/:id', async (req, res) => {
  try {
    const blogData = await BlogPost.findByPk(req.params.id, {
      include: [{ model: User}],
      attributes: { exclude: ['password'] }
    });

    const commentData = await Comment.findAll({where:{blog_id:req.params.id},
      include: [{ model: User}],
      attributes: { exclude: ['password']}
    });
    
    const blog = blogData.get({ plain: true });
    const comments = commentData.map((comment) => comment.get({ plain: true }));

    res.render('blog', {
      blog,
      comments,
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard/:id', isAuth, async (req, res) => {
  try {
    const blogData = await BlogPost.findByPk(req.params.id, {
      include: [{ model: User}],
      attributes: { exclude: ['password'] }
    });

    const commentData = await Comment.findAll({where:{blog_id:req.params.id},
      include: [{ model: User}],
      attributes: { exclude: ['password']}
    });
    
    const blog = blogData.get({ plain: true });
    const comments = commentData.map((comment) => comment.get({ plain: true }));

    res.render('dashboardBlog', {
      blog,
      comments,
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', isAuth, async (req, res) => {
  try {
    const blogData = await BlogPost.findAll({where:{user_id:req.session.user_id},
      include: [{ model: User}],
      attributes: { exclude: ['password']}});

    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    res.render('dashboard', {
      blogs,
      loggedIn: req.session.loggedIn,
      user_id: req.session.user_id,
      username: req.session.username
    });
  } catch (err) {
    res.status(500).json({error:err.message});
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }
  res.render('signup');
});

module.exports = router;
