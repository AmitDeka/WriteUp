const websiteSetting = require("../models/websiteSettingsModel");
const posts = require("../models/postModel");
const category = require("../models/categoryModel");

// const securePassword = async (password) => {
//   try {
//     const passwordHash = await bcrypt.hash(password, hashSalt);
//     return passwordHash;
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// const websiteSetup = async (req, res) => {
//   try {
//     var settings = await websiteSetting.find({});

//     if (settings.length > 0) {
//       res.redirect("/admin/login");
//     } else {
//       res.render("admin/website-setup", { title: "Setup" });
//     }
//   } catch (error) {
//     console.log(error.message);
//   }
// };
// const websiteSetupSave = async (req, res) => {
//   try {
//     const adminPass = req.body.adminPass;
//     const adminConfirmPass = req.body.adminConfirmPass;

//     if (adminPass != adminConfirmPass) {
//       res.render("admin/website-setup", {
//         title: "Setup",
//         statusColor: "#ef4444",
//         message: "Password did not match !!!",
//       });
//     } else {
//       const websiteTitle = req.body.websiteTitle;
//       const websiteDescription = req.body.websiteDescription;
//       const websiteLogo = req.file.filename;
//       const adminEmail = req.body.adminEmail;
//       const adminUsername = req.body.adminUsername;
//       const adminFirstName = req.body.adminFirstName;
//       const adminLastName = req.body.adminLastName;
//       const adminFullName = adminFirstName + " " + adminLastName;
//       const adminBio = req.body.adminBio;
//       const hashPassword = await securePassword(req.body.adminPass);

//       //   Save website setting in mongodb
//       const settingDetails = new websiteSetting({
//         websiteTitle: websiteTitle,
//         websiteDescription: websiteDescription,
//         websiteLogo: websiteLogo,
//       });

//       //   Save admin user setting in mongodb
//       const userDetails = new adminUser({
//         email: adminEmail,
//         userName: adminUsername,
//         fullName: adminFullName,
//         bio: adminBio,
//         password: hashPassword,
//         isSuperAdmin: 1,
//         isAdmin: 1,
//       });

//       const websiteData = await settingDetails.save();
//       const userData = await userDetails.save();

//       if (websiteData && userData) {
//         res.redirect("/admin/login");
//       } else {
//         res.render("admin/website-setup", {
//           title: "Setup",
//           statusColor: "#ef4444",
//           message: "Website could not setup properly !!!",
//         });
//       }
//     }
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// const allCat = async (req, res) => {
//   try {
//     const catgs = await catAdd.find({});
//     res.render("admin/all-category", { title: "Category", catgs: catgs });
//   } catch (error) {
//     console.log(error.message);
//   }
// };

const home = async (req, res) => {
  try {
    // findOne({ email: adminEmail });
    const post = await posts.find({ isFeaturedPost: "yes" });
    const catgs = await category.find({});
    const webSetting = await websiteSetting.find({});
    res.render("index", {
      title: "Home",
      post: post,
      catgs: catgs,
      webSetting: webSetting,
    });
  } catch (error) {
    console.log(error.message);
  }
};
// const registerSave = async (req, res) => {
//   try {
//     const adminPass = req.body.adminPass;
//     const adminConfirmPass = req.body.adminConfirmPass;

//     if (adminPass != adminConfirmPass) {
//       res.render("admin/register", {
//         title: "Register",
//         statusColor: "#ef4444",
//         message: "Password did not match !!!",
//       });
//     } else {
//       const adminEmail = req.body.adminEmail;
//       const adminUsername = req.body.adminUsername;
//       const adminFirstName = req.body.adminFirstName;
//       const AdminLastName = req.body.adminLastName;
//       const adminFullName = adminFirstName + " " + AdminLastName;
//       const adminBio = req.body.adminBio;
//       const hashPassword = await securePassword(req.body.adminPass);

//       //   Save admin user setting in mongodb
//       const adminEmailFind = await adminUser.findOne({ email: adminEmail });

//       if (adminEmailFind) {
//         res.render("admin/register", {
//           title: "Register",
//           statusColor: "#ef4444",
//           message: "Email already exists as Admin !! Please Log in.",
//         });
//       } else {
//         const adminUsernameFind = await adminUser.findOne({
//           userName: adminUsername,
//         });
//         if (adminUsernameFind) {
//           res.render("admin/register", {
//             title: "Register",
//             statusColor: "#ef4444",
//             message: "Username already exists !!!",
//           });
//         } else {
//           const userDetails = new adminUser({
//             email: adminEmail,
//             userName: adminUsername,
//             fullName: adminFullName,
//             bio: adminBio,
//             password: hashPassword,
//             isSuperAdmin: 0,
//             isAdmin: 1,
//           });
//           const userData = await userDetails.save();

//           if (userData) {
//             res.redirect("/admin/all-admin");
//           } else {
//             res.render("admin/register", {
//               title: "Register",
//               statusColor: "#ef4444",
//               message: "Internal server error !!!",
//             });
//           }
//         }
//       }
//     }
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// const login = async (req, res) => {
//   res.render("admin/login", { title: "Log in" });
// };
// const loginSave = async (req, res) => {
//   try {
//     const email = req.body.adminEmail;
//     const password = req.body.adminPassword;

//     const adminEmailFind = await adminUser.findOne({ email: email });

//     if (adminEmailFind) {
//       const adminPassMatch = await bcrypt.compare(
//         password,
//         adminEmailFind.password
//       );

//       if (adminPassMatch) {
//         req.session.user_id = adminEmailFind._id;
//         req.session.name = adminEmailFind.fullName;
//         req.session.isSuperAdmin = adminEmailFind.isSuperAdmin;
//         req.session.isAdmin = adminEmailFind.isAdmin;

//         if (adminEmailFind.isSuperAdmin == 1) {
//           res.redirect("/admin/dashboard");
//         } else if (
//           adminEmailFind.isSuperAdmin == 0 &&
//           adminEmailFind.isAdmin == 1
//         ) {
//           res.redirect("/admin/dashboard");
//         } else {
//           res.render("admin/login", {
//             title: "Login",
//             statusColor: "#ef4444",
//             message: "Sorry !! Admins can proceed only",
//           });
//         }
//       } else {
//         res.render("admin/login", {
//           title: "Login",
//           statusColor: "#ef4444",
//           message: "Email or Password does not match !!!",
//         });
//       }
//       return req.session.name;
//     } else {
//       res.render("admin/login", {
//         title: "Login",
//         statusColor: "#ef4444",
//         message: "Email could not be found !!!",
//       });
//     }
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// const dashboard = async (req, res) => {
//   res.render("admin/index", { title: "Dashboard" });
// };

// const allAdmin = async (req, res) => {
//   try {
//     const admins = await adminUser.find({});
//     res.render("admin/all-admin", { title: "Admins", admins: admins });
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// const allCat = async (req, res) => {
//   try {
//     const catgs = await catAdd.find({});
//     res.render("admin/all-category", { title: "Category", catgs: catgs });
//   } catch (error) {
//     console.log(error.message);
//   }
// };
// const addCatSave = async (req, res) => {
//   try {
//     const catName = req.body.catName;
//     const catBanner = req.file.filename;

//     const catDetails = new catAdd({
//       title: catName,
//       featuredImage: catBanner,
//     });
//     const catData = await catDetails.save();
//     if (catData) {
//       res.redirect("/admin/category");
//     }
//   } catch (error) {
//     console.log(error.message);
//   }
// };
// const deleteCat = async (req, res) => {
//   try {
//     await catAdd.deleteOne({ _id: req.body.id });
//     res.status(200).send({
//       success: true,
//       message: "Category deleted successfully",
//     });
//   } catch (error) {
//     res.status(400).send({ success: false, message: error.message });
//   }
// };

// const allPost = async (req, res) => {
//   try {
//     const posts = await postAdd.find({});
//     res.render("admin/all-post", { title: "Posts", posts: posts });
//   } catch (error) {
//     console.log(error.message);
//   }
// };
// const addPost = async (req, res) => {
//   const catgs = await catAdd.find({});
//   res.render("admin/add-post", { title: "Add Post", catgs: catgs });
// };
// const addPostSave = async (req, res) => {
//   try {
//     const authorName = req.session.name;
//     const titlePost = req.body.postTitle;
//     const excerptPost = req.body.postExcerpt;
//     const featuredImage = req.file.filename;
//     const contentPost = req.body.postContent;
//     const categoryPost = req.body.postCategory;
//     const authorPost = authorName;
//     const featuredPost = req.body.postInFeaturedCat;

//     const postDetails = new postAdd({
//       title: titlePost,
//       featuredImage: featuredImage,
//       excerpt: excerptPost,
//       title: titlePost,
//       content: contentPost,
//       category: categoryPost,
//       author: authorPost,
//       isFeaturedPost: featuredPost,
//     });
//     const postData = await postDetails.save();
//     if (postData) {
//       res.redirect("/admin/all-post");
//     }
//   } catch (error) {
//     console.log(error.message);
//   }
// };
// const deletePost = async (req, res) => {
//   try {
//     await postAdd.deleteOne({ _id: req.body.id });
//     res.status(200).send({
//       success: true,
//       message: "Post deleted successfully",
//     });
//   } catch (error) {
//     res.status(400).send({ success: false, message: error.message });
//   }
// };

// const logOut = async (req, res) => {
//   try {
//     req.session.destroy();
//     res.redirect("/admin/login");
//   } catch (error) {
//     console.log(error.message);
//   }
// };

const error404 = async (req, res) => {
  res.render("admin/404", { title: "Error 404" });
};

module.exports = {
  // websiteSetup,
  home,
  // websiteSetupSave,
  // register,
  // registerSave,
  // login,
  // loginSave,
  // dashboard,
  // allAdmin,
  // allCat,
  // addCatSave,
  // deleteCat,
  // addPost,
  // addPostSave,
  // deletePost,
  // allPost,
  // logOut,
  error404,
};
