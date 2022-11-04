const isLogin = async (req, res, next) => {
  try {
    if (
      !req.session.user_id &&
      !req.session.isSuperAdmin &&
      !req.session.isAdmin
    ) {
      res.redirect("/admin/login");
      return;
    }
    next();
  } catch (error) {
    console.log(error.message);
  }
};
const isLogout = async (req, res, next) => {
  try {
    if (
      req.session.user_id &&
      req.session.isSuperAdmin &&
      req.session.isAdmin
    ) {
      res.redirect("/admin/dashboard");
      return;
    }
    next();
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { isLogin, isLogout };
