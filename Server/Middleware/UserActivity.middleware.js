const UserActivity = require('../Models/UserActivity.model')
const User = require("../Models/User.model");
const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");
const UAParser = require('ua-parser-js');
const geoip = require('geoip-lite');

exports.logUserActivity = async (req, res, next) => {
    try {
        const token = req.cookies.token || (req.headers.authorization ? req.headers.authorization.split(" ")[1] : null);

        let rawIp = req.headers['x-forwarded-for'] || req.ip || req.connection.remoteAddress || "";
        if (typeof rawIp === "string" && rawIp.includes(",")) rawIp = rawIp.split(",")[0];
        if (rawIp === '::1') rawIp = '127.0.0.1';
        const location = geoip.lookup(rawIp);
        const uaString = req.headers['user-agent'] || "unknown";
        const parser = new UAParser(uaString);
        const browser = parser.getBrowser();
        const os = parser.getOS();
        const cpu = parser.getCPU();
        const device = parser.getDevice();

        let platform = "Browser"; // default = normal browser
        if (/linkedinbot/i.test(uaString)) platform = "LinkedIn";
        else if (/facebookexternalhit/i.test(uaString)) platform = "Facebook";
        else if (/whatsapp/i.test(uaString)) platform = "WhatsApp";
        else if (/twitterbot/i.test(uaString)) platform = "Twitter";
        else if (/googlebot/i.test(uaString)) platform = "Google";
        else if (/bingbot/i.test(uaString)) platform = "Bing";

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
                fullname: {
                    firstname: user?.fullname?.firstname || "",
                    lastname: user?.fullname?.lastname || ""
                },
                email: user.email,
                route: req.originalUrl,
                method: req.method,
                platform : platform,
                ip: rawIp,
                location: location || null,
                browser: browser.name || "unknown",
                browserVersion: browser.version || "unknown",
                os: os.name || "unknown",
                osVersion: os.version || "unknown",
                deviceType: device.type || "desktop",
                deviceVendor: device.vendor || "unknown",
                deviceModel: device.model || "unknown",
                cpuArch: cpu.architecture || "unknown",
                isAdmin: user.isAdmin,
                isRecruiter: user?.isRecruiter || false,
                companyName: user?.companyName || "nope",
            });
        }
        else {
            await UserActivity.create({
                email: "---STRANGER---",
                route: req.originalUrl,
                method: req.method, ip: rawIp,
                platform : platform,
                location: location || null,
                browser: browser.name || "unknown",
                browserVersion: browser.version || "unknown",
                os: os.name || "unknown",
                osVersion: os.version || "unknown",
                deviceType: device.type || "desktop",
                deviceVendor: device.vendor || "unknown",
                deviceModel: device.model || "unknown",
                cpuArch: cpu.architecture || "unknown",
            });
        }
    } catch (err) {
        console.error('Failed to log user activity:', err);
    }
    next();
};

