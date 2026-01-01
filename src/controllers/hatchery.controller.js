import prisma from "../lib/prisma.js";


/**
 * @desc    Create a new hatchery and assign to a hatchery member
 * @route   POST /api/hatcheries
 * @access  Private (Admin and Moderator)
 */
export const createHatchery = async (req, res) => {
    try {
        const { name, location, registrationNumber, yearEstablished, ownerId } = req.body;

        const requesterRole = req.user.role; // role of logged-in user

        // Only admin or moderator can create hatchery
        if (!["admin", "moderator"].includes(requesterRole)) {
            return res.status(403).json({
                success: false,
                message: "Only admin or moderator can create a hatchery",
            });
        }

        // Check if registrationNumber already exists
        const existingHatchery = await prisma.hatchery.findUnique({
            where: { registrationNumber },
        });

        if (existingHatchery) {
            return res.status(409).json({
                success: false,
                message: "Hatchery with this registration number already exists",
            });
        }

        // Check if owner exists and is a hatchery_member
        const owner = await prisma.user.findUnique({
            where: { id: BigInt(ownerId) },
        });

        if (!owner || owner.role !== "hatchery_member") {
            return res.status(400).json({
                success: false,
                message: "Owner must be a valid hatchery member",
            });
        }

        // Create hatchery
        const hatchery = await prisma.hatchery.create({
            data: {
                name,
                location,
                registrationNumber,
                ownerId: BigInt(ownerId),
                renewalStatus: true,
                yearEstablished,
            },
            include: {
                owner: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        role: true,
                        phone: true,
                    },
                },
            },
        });

        res.status(201).json({
            success: true,
            message: "Hatchery created successfully",
            hatchery,
        });
    } catch (error) {
        console.error("Create hatchery error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};


/**
 * @desc    Get all hatcheries with owner info
 * @route   GET /api/hatcheries
 * @access  Private (Admin, Moderator, Hatchery Member)
 */
export const getAllHatcheries = async (req, res) => {
    try {
        const hatcheries = await prisma.hatchery.findMany({
            include: {
                owner: { select: { id: true, name: true, email: true, role: true, phone: true } },
            },
            orderBy: { name: "asc" },
        });

        res.status(200).json({ success: true, hatcheries });
    } catch (error) {
        console.error("Get all hatcheries error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};



/**
 * @desc    Get a single hatchery by ID (id of hatchery) with owner info
 * @route   GET /api/hatcheries/:id
 * @access  Private (admin and moderator)
 */
export const getHatcheryById = async (req, res) => {
  try {
    const { id } = req.params;

    const hatchery = await prisma.hatchery.findUnique({
      where: { id: BigInt(id) },
      include: {
        owner: { select: { id: true, name: true, email: true, role: true, phone: true } },
      },
    });

    if (!hatchery) {
      return res.status(404).json({ success: false, message: "Hatchery not found" });
    }

    res.status(200).json({ success: true, hatchery });
  } catch (error) {
    console.error("Get hatchery by ID error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};