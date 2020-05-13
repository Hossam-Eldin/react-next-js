const express = require('express')
const next = require('next')
const router = require('./server/routes/index');
const clientRoutes =require('./server/routes/clientRoutes');
const dashRoutes = require('./server/routes/dashRoutes');
const dev = process.env.NODE_ENV !== 'production'
const nxt = next({dev})
const handle = nxt.getRequestHandler()
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser'); 

require('./server/services/passport') 

const media_article =express.static(path.join(__dirname,'/server/media/articles'))
const media_sections =express.static(path.join(__dirname,'/server/media/sections'))
const media_posts =express.static(path.join(__dirname,'/server/media/posts'))
nxt.prepare()
.then(() => {
  const app = express()
  //var auth = require('./routes/auth')(passport);
  
    
  /* make the api ready for the connecting*/ 
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use('/media-art',media_article);
  app.use('/media-sec',media_sections);
  app.use('/media-post',media_posts);
  // app.use(cookieParser());
  
  /* api router*/
  app.use(session({
    secret: 'thesecret',
    saveUninitialized: false,
    resave: false
  }))
  
  app.use(passport.initialize())
  app.use(passport.session())
  
  app.use('/api', router);

    clientRoutes(app,nxt);
    dashRoutes(app,nxt);

    app.get('*', (req, res) => {
      return handle(req, res)
    })

      //  if (process.env.NODE_ENV ===  'production') {
      // to serve up the production assets


   //   const path = require('path');

   //}
   


      /**running the server  */
    app.listen(3000, (err) => {
      if (err) throw err
      console.log('> Ready on http://localhost:3000')
    })
  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })