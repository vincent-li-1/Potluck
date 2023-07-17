module.exports = {
    ensureAuth: function (req, res, next) {
      if (req.get('user-agent') !== 'Dart/3.0 (dart:io)'){
        if (req.isAuthenticated()) {
          return next();
        } else {
          res.redirect('/');
        }
      }
      return next();
    }
  }
  