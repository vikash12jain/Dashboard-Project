const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const UserModel = require('../Models/User.model');
const BlacklistToken = require('../Models/BlackListToken.model');

const JWT_SECRET = process.env.JWT_SECRET;
const generateToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET, {
        expiresIn: '24h',
    });
};

exports.registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password } = req.body;

    try {
        const userExists = await UserModel.findOne({ email });

        if (userExists) {
            return res.status(400).send('User with this credential already exists!');
        }

        const user = await UserModel.create({
            fullname,
            email,
            password,
        });

        if (user) {
            const token = generateToken(user._id);
            res.cookie('token', token, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000,
                secure: true,
                sameSite: "None",
            });
            console.log(token, user)
            res.status(200).json({
                token,
                user: {
                    message: 'User registered successfully',
                    _id: user._id,
                    email: user.email,
                    fullname: {
                        firstname: user.fullname.firstname,
                        lastname: user.fullname.lastname,
                    },
                    isAdmin: user.isAdmin
                }
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

exports.loginUser = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).send('Invalid email or password');
        }

        const isPassowordMatched = await user.ComparePassword(password);
        if (user && isPassowordMatched) {
            const token = generateToken(user._id);
            res.cookie('token', token, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000,
                secure: true,
                sameSite: "None",
            });

            res.status(200).json({
                token,
                user: {
                    _id: user._id,
                    email: user.email,
                    fullname: {
                        firstname: user.fullname.firstname,
                        lastname: user.fullname.lastname,
                    },
                    isAdmin: user.isAdmin
                }
            });
        } else {
            res.status(401).json('Invalid email or password');

        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

exports.userProfile = (req, res) => {
    if (req.user) {
        res.status(200).json({
            _id: req.user._id,
            fullname: req.user.fullname,
            email: req.user.email,
            isAdmin: req.user.isAdmin,
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

exports.logoutUser = async (req, res) => {
    try {
        let token;

        if (req.cookies?.token) {
            token = req.cookies.token;
        } else if (req.headers?.authorization?.startsWith("Bearer ")) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (token) {
            await BlacklistToken.create({ token });
        }

        res.clearCookie("token");
        return res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

exports.getAllUsers = async (req, res) => {
    const users = await UserModel.find({}).select('-password').sort('email');
    res.status(200).json(users);
};

exports.getSingleUser = async (req, res) => {
    const user = await UserModel.findById(req.params.id).select('-password');
    if (!user) {
        res.status(404);
        throw new Error("User not found.");
    }
    res.status(200).json(user);
};

exports.updateUserByAdmin = async (req, res) => {
    const { firstname, lastname, email, isAdmin } = req.body;
    const { id } = req.params;

    const user = await UserModel.findById(id).select('+password');
    if (!user) {
        res.status(404);
        throw new Error("User not found: Please check the ID and try again.");
    }
    user.fullname.firstname = firstname || user.fullname.firstname;
    user.fullname.lastname = lastname || user.fullname.lastname;
    user.email = email || user.email;
    if (isAdmin !== undefined) {
        user.isAdmin = isAdmin;
    }

    const updatedUser = await user.save();

    res.status(200).json({
        _id: updatedUser._id,
        fullname: updatedUser.fullname,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        message: "User updated successfully."
    });
};

exports.deleteUser = async (req, res) => {
    const user = await UserModel.findById(req.params.id);

    if (!user) {
        res.status(404);
        throw new Error("The user you are trying to delete does not exist.");
    }

    await user.deleteOne();

    res.status(200).json({ message: "User deleted successfully." });
};

exports.registerAdmin = async (req, res) => {
    const { fullname, email, password, isAdmin } = req.body;

    try {
        const userExists = await UserModel.findOne({ email });

        if (userExists) {
            return res.status(400).send('User with this email already exists!');
        }

        const user = await UserModel.create({
            fullname,
            email,
            password,
            isAdmin: isAdmin || false,
        });

        if (user) {
            res.status(201).json({
                message: 'User registered by admin successfully',
                _id: user._id,
                email: user.email,
                fullname: user.fullname,
                isAdmin: user.isAdmin
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Something went wrong' });
    }
};