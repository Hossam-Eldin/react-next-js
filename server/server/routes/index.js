const express = require('express');
const router = express.Router();
const passport = require('passport');
const PostsController = require('../controller/PostsController');
const ArticlesController = require('../controller/ArticleController');
const SectionsController = require('../controller/SectionsController');
const WebInfoController = require('../controller/WebInfoController');
const AdminsController = require('../controller/AdminsController');
const TagsController = require('../controller/TagsController');
const LandingController = require('../controller/LandingController');
const RandomController = require('../controller/RandomController');
const ReactionController = require('../controller/ReactionController');
const CommentsController = require('../controller/CommentController');
const UsersController = require('../controller/UsersController');

const jwt = require('jsonwebtoken');

const isKey = require('../middleware/isKey');
const isAdmin = require('../middleware/requiredAdmin');
const uploadArticles = require('../middleware/uploadArticles');
const uploadSection = require('../middleware/uploadSection');
const uploadPosts = require('../middleware/uploadPost');
const UploadMultiPosts = require('../middleware/uploadMulti');


/*Post Api */
router.get('/posts', isKey, PostsController.getAll);
router.get('/post', PostsController.showOne);
router.post('/create-post', uploadPosts, PostsController.create)
router.get('/post-list', PostsController.list);
router.patch('/post/edit-admin/:id', uploadPosts, PostsController.editAdmin);
router.delete('/post-delete-admin/:id', PostsController.deleteAdmin);
router.post('/user-create-post',uploadPosts, PostsController.userCreatePost);
router.post('/post-multi',UploadMultiPosts,PostsController.creatMulti);

/**Comments  */
router.post('/create-comment', CommentsController.createComment);
router.patch('/update-comment', CommentsController.updateComment)
router.delete('/delete-comment', CommentsController.deleteComment);
router.get('/get-comments/:id', CommentsController.getComments)

/**reapplies */
router.post('/create-reply', CommentsController.createReply);
router.patch('/update-reply', CommentsController.updateReply)
router.delete('/delete-reply', CommentsController.deleteReply);


/* Articles Api */
router.get('/articles', ArticlesController.getAll);
router.get('/article', ArticlesController.showOne);
router.post('/article', uploadArticles, ArticlesController.Create);
router.get('/article-list', ArticlesController.list);
router.delete('/article-delete/:id', ArticlesController.delete)
router.patch('/article-update/:id', uploadArticles, ArticlesController.update)

/**Badges articles  */
router.get('/badge/:badge', ArticlesController.getByBadge);
/**get all badges data */
router.get(/badges/,LandingController.getBadges);


//** users  */
router.get('/user/:uid', UsersController.getUser);


/**section api */
router.get('/sections', SectionsController.getAll);
router.post('/section', uploadSection, SectionsController.create);
router.get('/section/:id', SectionsController.showOne);
router.get('/section-info/:title',SectionsController.showByTitle);
router.get('/section-posts/:section_id', SectionsController.getPosts);
router.patch('/section-update/:id', uploadSection, SectionsController.edit)


/**web info api */

router.post('/web-info', WebInfoController.create);
router.get('/web-infos', WebInfoController.getAll);
router.patch('/web-info/edit/:id', WebInfoController.edit);
router.get('/web-info/:id', WebInfoController.showOne);
router.delete('/info-delete/:id', WebInfoController.delete);
router.get('/get-info', WebInfoController.getByTag);
router.get('/info-name', WebInfoController.getByName);

/**Contact us  */
router.post('/contact-message', WebInfoController.createMessage);

/**static pages  */
router.get('/page/:title', WebInfoController.staticPages);


/**admin api */
router.post('/admin-create', AdminsController.create);


/**tags map */
router.get('/tag-map', TagsController.tagmap);
router.get('/tags', TagsController.getAll);
router.get('/tag/:name', TagsController.showOne);
router.get('/section-tags', TagsController.sectionTag);
router.delete('/map-delete/:id', TagsController.deleteMap)
router.post('/map-create', TagsController.createMap)



/**Landing routes */
router.get('/slider', LandingController.getSlider);
router.get('/featured', LandingController.getFeatured);
router.get('/search', LandingController.search);
router.post('/create-landing', LandingController.create);
router.get('/get-count',LandingController.getNumbers);


/**Random Pages */
router.get('/random-list', RandomController.getAll);
router.get('/random', RandomController.random);
router.get('/random-search', RandomController.postList);
router.post('/create-random', RandomController.create);
router.delete('/random-delete/:id', RandomController.delete);
router.get('/list-posts-random', RandomController.listTypePost);


/**reaction  */
router.post('/create-reaction', ReactionController.create);
router.post('/up-vote', ReactionController.upVote);
router.post('/down-vote',ReactionController.downVote);

/**google token  auth */
router.post('/oauth/google',passport.authenticate('googleToken', { session: false }), UsersController.googleOAuth);

/** facebook token auth */
router.post('/oauth/facebook', passport.authenticate('facebookToken',{session:false}), UsersController.facebookOAuth);



/**google auth */

router.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}))

router.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
  //logic for sending jwt or set cookie for success 
  //res.redirect('/api/get-session')
  const token = jwt.sign({
      email: req.user.email,
      username: req.user.username
    },
    "secet_this",
     {
      expiresIn: "1h"
    }
  )
/*   res.json({
    userId: req.user.id,
    token: token,
    expiresIn: 3600,
  }) */
  res.redirect('/')
});

/**Facebook  */
router.get('/auth/facebook', passport.authenticate('facebook', {
  scope: ['email', 'public_profile']
}))


router.get('/auth/facebook/callback', passport.authenticate('facebook'), (req, res) => {
  //logic for sending jwt or set cookie for success 

  res.redirect('/api/get-session')
})


/**admin users */

router.post('/admin-signup', AdminsController.singUp)
//router.post('/admin-login', AdminsController.login)

router.get('/logout', (req, res) => {
  req.logout()
  let url = req.protocol + '://' + req.headers.host + '/cpl';

  res.redirect(url)
})

router.post('/login-admin', AdminsController.login)

router.get('/get-session', isAdmin, (req, res, next) => {
  res.send({
    data: req.user.type
  })
})




module.exports = router;