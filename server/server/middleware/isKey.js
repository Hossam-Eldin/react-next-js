
module.exports = function (req, res, next) {
    if (req.header('api-key') === 'the_key' ) {
      next()
    } else {
        let url = req.protocol + '://' + req.headers.host + '/';
       // res.redirect(url)
        res.send({message: 'this door need a key if you want the key someone else you have to be'})
    }
  }