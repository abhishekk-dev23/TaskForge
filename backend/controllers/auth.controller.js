import bcrypt from "bcryptjs";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import asyncHandler from "../utils/asyncHandler.js";

const register = asyncHandler(async (req, res) => {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(409).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role: role || "user",
    });

    res.status(201).json({
        message: "Registration successful",
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
    });
});

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken({ userId: user._id, role: user.role });

    res.status(200).json({
        message: "Login successful",
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
    });
});

const getMe = asyncHandler(async (req, res) => {
    res.status(200).json({ user: req.user });
});

const logout = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: "Logout successful. Remove token on client.",
    });
});

export { register, login, getMe, logout };
