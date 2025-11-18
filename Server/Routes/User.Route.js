const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../Controller/User.Controller.js');
const userMiddleware = require('../Middleware/userMiddleware.authUser.js')
const monitorActivity = require('../Middleware/UserActivity.middleware.js')

const { protect, adminOnly } = require("../Middleware/AdminMiddleware.authAdmin");

router.post('/register',
    [
        body('email').isEmail().withMessage("Invalid email"),
        body('fullname.firstname').isLength({ min: 3 }).withMessage("First name must be at least 3 character long"),
        body('password').isLength({ min: 6 }).withMessage("password must be at least 6 character long")
    ],
    userController.registerUser

)

router.post('/login', [
    body('email').isEmail().withMessage("Invalid email"),
    body('password').isLength({ min: 6 }).withMessage("password must be at least 6 character long")
],
    userController.loginUser
)

router.get('/profile', userMiddleware.authUser,monitorActivity.logUserActivity, userController.userProfile)
router.post('/logout', userMiddleware.authUser,monitorActivity.logUserActivity , userController.logoutUser)


router.post("/register-admin", protect, adminOnly, monitorActivity.logUserActivity, userController.registerAdmin);

router.get("/", protect, adminOnly, monitorActivity.logUserActivity, userController.getAllUsers);

router.get("/:id", protect, adminOnly, monitorActivity.logUserActivity, userController.getSingleUser);

router.put("/:id", protect, adminOnly, monitorActivity.logUserActivity, userController.updateUserByAdmin);

router.delete("/:id", protect, adminOnly, monitorActivity.logUserActivity, userController.deleteUser);
 
module.exports = router;



