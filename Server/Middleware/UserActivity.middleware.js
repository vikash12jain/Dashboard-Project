const UserActivity = require('../Models/UserActivity.model')
const User = require("../Models/User.model");
const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");

exports.logUserActivity = async (req, res, next) => {
    try {
        const token = req.cookies.token || (req.headers.authorization ? req.headers.authorization.split(" ")[1] : null);
        
        let user;
        if (token) {
            try {
                const decoded = await jwt.verify(token, JWT_SECRET);
                user = await User.findById(decoded.id);
                
            } catch (err) {
            console.error(err.message);
            }
        }
       
        if (user) {
            
            await UserActivity.create({
                userId: user._id,
                fullname: user.fullname,
                email: user.email,
                route: req.originalUrl,
                method: req.method,
                ip: req.ip,
                isadmin: user.isAdmin,
                isRecruiter: user?.isRecruiter || false,
                companyName: user?.companyName || "nope"
            });
        }
        else {
            await UserActivity.create({
                email: "---STRANGER---",
                route: req.originalUrl,
                method: req.method
            });
        }
    } catch (err) {
        console.error('Failed to log user activity:', err);
    }
    next();
};

