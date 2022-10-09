var express = require('express');
var router = express.Router();
var passport = require('passport');

/* authentication router 
  using passport for auth, sending username on login success
*/


router.get("/login/success", (req, res) => {
  if (req.user) {
    res.json({
      success: true,
      user: req.user,
    });
  }
});


router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
  });
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/api/login/success",
  failureRedirect: "/api/login/failed"
}));

router.post('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.json({
      success: true
    })
  });
});

module.exports = router