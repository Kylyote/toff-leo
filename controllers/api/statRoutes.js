const router = require("express").Router();
const { Op } = require("sequelize");
const { User, Game } = require("../../models");
const { withAuth } = require("../../utils/auth");

// Renders stat page
router.get('/:id', async(req, res) => {
  console.log("Got into my stats");
  try {
    const getMyStats = await User.findByPk(req.params.id);
    console.log("Stats: " + getMyStats);
    const stats = getMyStats.map((stat) => stat.get({plain: true}));
    //const stats = res.json(getMyStats);
    const statsObject = {};
    //const statsObject = {
     // win: stats.win,
   //   loss: stats.loss,
    //};
    // Object.keys(stats).forEach(key => {
    //   statsObject[key] = stats[key] * 2;
    // })
    console.log("More stats: " + stats);

    router.render('my-stats', { stats, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;

// router.get('/blog/:id', async (req, res) => {
//   try {
//     const blogData = await Blog.findByPk(req.params.id, {
//       include: [
//         {
//           model: User,
//           attributes: ['name'],
//         },
//       ],
//     });

//     const blog = blogData.get({ plain: true });

//     res.render('blog', {
//       ...blog,
//       logged_in: req.session.logged_in
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });