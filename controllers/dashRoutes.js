const router = require('express').Router();
const { Post } = require('../models/');
const withAuth = require('../utils/auth');

// Get posts with specific UserId
router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        userId: req.session.userId,
      },
    });

    const posts = postData.map((post) => post.get({ plain: true }));
// Render posts from it
    res.render('all-posts-admin', {
      layout: 'dash',
      posts,
    });
  } catch (err) {
    res.redirect('login');
  }
});
// get new with userID
router.get('/new', withAuth, (req, res) => {
  res.render('new-post', {
    layout: 'dash',
  });
});

// Find User post data
router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);

    if (postData) {
      const post = postData.get({ plain: true });

      res.render('edit-post', {
        layout: 'dash',
        post,
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.redirect('login');
  }
});

module.exports = router;