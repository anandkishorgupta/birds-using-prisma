import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";
// Login controller (Admin, Moderator, Hatchery Owner)
// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({ success: false, message: "All fields are required" });

        // Find user by email
        const user = await prisma.user.findUnique({
            where: { email },
            select: {
                id: true,
                name: true,
                email: true,
                password: true,
                role: true,
                phone: true,
                // isActive: true, 
                // isBanned: true, 
            },
        });

        console.log("user", user)

        if (!user) return res.status(400).json({ message: "Invalid credential" });

        // Check password (if you want plain text, skip bcrypt.compare)
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        // if (!user.isActive || user.isBanned) {
        //   return res.status(403).json({ message: "User account is disabled or banned" });
        // }

        // Sign JWT
        const token = jwt.sign(
            { id: user.id.toString(), email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "50h" }
        );

        const options = {
            expires: new Date(Date.now() + 50 * 60 * 60 * 1000), // 50 hours
            httpOnly: true,
        };

        // Remove password before sending response
        delete user.password;

        res
            .cookie("token", token, options)
            .status(200)
            .json({
                success: true,
                token,
                user,
                message: "Logged in successfully",
            });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};


// @desc    Register a new user (Admin/Moderator creates users)
// @route   POST /api/auth/register
// @access  Private (Admin/Moderator)
export const createUser = async (req, res) => {
    try {
        const { name, email, password, phone, role } = req.body;

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return res
                .status(409)
                .json({ success: false, message: "User already exists" });
        }

        const requesterRole = req.user.role; // Role of the logged-in user

        // Role-based permissions
        const allowedRoles = {
            admin: ["moderator", "hatchery_member"],
            moderator: ["hatchery_member"],
        };

        if (!allowedRoles[requesterRole]?.includes(role)) {
            return res.status(403).json({
                success: false,
                message: `Role "${requesterRole}" cannot create a user with role "${role}"`,
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                phone,
                role,
                // You can add createdBy relation here later if your schema supports it
            },
        });

        // Hide password in response
        const { password: _, ...userWithoutPassword } = user;

        res.status(201).json({
            success: true,
            message: `${role} account created successfully`,
            user: userWithoutPassword,
        });
    } catch (error) {
        console.error("Create user error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
