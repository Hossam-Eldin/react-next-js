
module.exports = function (req, res, next) {
    if (req.isAuthenticated()) {
      next()
    } else {
        let url = req.protocol + '://' + req.headers.host + '/cpl';
        res.redirect(url)
    }
  }