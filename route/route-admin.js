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
    cb(null, path.join(__dirname, "../public/uploads"));
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

// Login
adminRouter.get("/login", adminAuth.isLogout, adminController.login);
adminRouter.post("/login", adminController.loginSave);

adminRouter.get("/dashboard", adminAuth.isLogin, adminController.dashboard);

// Register new admin
adminRouter.get("/all-admin", adminAuth.isLogin, adminController.allAdmin);
adminRouter.get("/register", adminAuth.isLogin, adminController.register);
adminRouter.post("/register", adminController.registerSave);

// Logout
adminRouter.get("/logout", adminAuth.isLogin, adminController.logOut);

// Other pages

// Category
adminRouter.get("/category", adminAuth.isLogin, adminController.allCat);
adminRouter.post(
  "/category",
  fileUpload.single("catBanner"),
  adminController.addCatSave
);
adminRouter.post("/delete-cat", adminAuth.isLogin, adminController.deleteCat);

// Posts
adminRouter.get("/all-post", adminAuth.isLogin, adminController.allPost);
adminRouter.get("/add-post", adminAuth.isLogin, adminController.addPost);
adminRouter.post(
  "/add-post",
  fileUpload.single("postFeaturedImage"),
  adminController.addPostSave
);
adminRouter.post("/delete-post", adminAuth.isLogin, adminController.deletePost);

// error 404
adminRouter.get("*", adminController.error404);

module.exports = adminRouter;
