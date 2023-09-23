module.exports = {
  withAuth: (req, res, next) => {
    // If the user is not logged in, redirect the request to the login route
    if (!req.session.loggedIn) {
      res.redirect("/login");
    } else {
      next();
    }
  },
  redirectToWatch: (req, res, next) => {
    if (!req.session.loggedIn) {
      // redirects user to watch instead of play if not logged in
      const thisGameId = req.originalUrl.split("/api/games/play/")[1];
      res.redirect(`/api/games/watch/ ${thisGameId}`);
    } else {
      next();
    }
  },
};
