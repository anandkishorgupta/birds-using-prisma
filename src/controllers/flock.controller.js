import prisma from "../lib/prisma.js";

/**
 * @desc    Create a new flock
 * @route   POST /api/flocks
 * @access  Private (Admin & Moderator)
 */
export const createFlock = async (req, res) => {
  try {
    const {
      hatcheryId,
      breedId,
      flockSize,
      maleChicks,
      femaleChicks,
      purpose,
      source,
      intakeDate,
    //   dateOfShipment,
    } = req.body;

    const requesterRole = req.user.role;
    if (!["admin", "moderator"].includes(requesterRole)) {
      return res.status(403).json({
        success: false,
        message: "Only admin or moderator can create a flock",
      });
    }

    // Validate hatchery
    const hatchery = await prisma.hatchery.findUnique({ where: { id: BigInt(hatcheryId) } });
    if (!hatchery) {
      return res.status(404).json({ success: false, message: "Hatchery not found" });
    }

    // Validate breed
    const breed = await prisma.breed.findUnique({ where: { id: BigInt(breedId) } });
    if (!breed) {
      return res.status(404).json({ success: false, message: "Breed not found" });
    }

    const flock = await prisma.flock.create({
      data: {
        hatcheryId: BigInt(hatcheryId),
        breedId: BigInt(breedId),
        flockSize,
        maleChicks,
        femaleChicks,
        purpose,
        source,
        intakeDate: new Date(intakeDate),
        // dateOfShipment: dateOfShipment ? new Date(dateOfShipment) : null,
      },
      include: {
        hatchery: { select: { id: true, name: true, location: true } },
        breed: { select: { id: true, name: true } },
      },
    });

    res.status(201).json({ success: true, message: "Flock created successfully", flock });
  } catch (error) {
    console.error("Create flock error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


/**
 * @desc    Get all flocks
 * @route   GET /api/flocks
 * @access  Private (admin/moderator)
 */
export const getAllFlocks = async (req, res) => {
  try {
    const flocks = await prisma.flock.findMany({
      include: {
        hatchery: { select: { id: true, name: true, location: true } },
        breed: { select: { id: true, name: true } },
      },
      orderBy: { intakeDate: "desc" },
    });

    res.status(200).json({ success: true, flocks });
  } catch (error) {
    console.error("Get all flocks error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
