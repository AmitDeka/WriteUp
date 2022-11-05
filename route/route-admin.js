const express = require("express");
const session = require("express-session");
const adminRouter = express.Router();
const multer = require("multer");
const path = require("path");

const secretKey = require("../config/sessionKey");
adminRouter.use(
  session({
    secret: secretKey.secretKey,
    resave: true,
    saveUninitialized: true,
  })
);

const adminController = require("../controllers/adminController");
const adminAuth = require("../middlewares/adminAuth");

const fileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/admin/uploads"));
  },
  filename: function (req, file, cb) {
    const fileName = Date.now() + "-" + file.originalname;
    cb(null, fileName);
  },
});

const fileUpload = multer({ storage: fileStorage });

// Website setup
adminRouter.get("/setup", adminController.websiteSetup);
adminRouter.post(
  "/setup",
  fileUpload.single("websiteLogo"),
  adminController.websiteSetupSave
);

// Register new admin
adminRouter.get("/register", adminAuth.isLogin, adminController.register);
adminRouter.post("/register", adminController.registerSave);

// Login
adminRouter.get("/login", adminAuth.isLogout, adminController.login);
adminRouter.post("/login", adminController.loginSave);

// Logout
adminRouter.get("/logout", adminAuth.isLogin, adminController.logOut);

// Other pages
adminRouter.get("/dashboard", adminAuth.isLogin, adminController.dashboard);
adminRouter.get("/all-admin", adminAuth.isLogin, adminController.allAdmin);
adminRouter.get("/add-post", adminAuth.isLogin, adminController.addPost);
adminRouter.post(
  "/add-post",
  fileUpload.single("postFeaturedImage"),
  adminController.addPostSave
);

adminRouter.get("/all-post", adminAuth.isLogin, adminController.allPost);
// error 404
adminRouter.get("*", adminController.error404);

module.exports = adminRouter;
