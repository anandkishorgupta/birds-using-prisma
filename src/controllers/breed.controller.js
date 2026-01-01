//  this contains the standard data rates 

import prisma from "../lib/prisma.js";

// @desc    Create a new breed
// @route   POST /api/breeds
// @access  Private (Admin only)
export const createBreed = async (req, res) => {
  try {
    const {
      name,
      fertilityRate,
      infertilityRate,
      eggDamageRate,
      hatchabilityRate,
      healthyChickRate,
      unhealthyChickRate,
      mortalityRate,
      healthyAdultRate,
      unhealthyAdultRate,
    } = req.body;

    // Check if breed already exists
    const existingBreed = await prisma.breed.findUnique({
      where: { name },
    });

    if (existingBreed) {
      return res
        .status(409)
        .json({ success: false, message: "Breed already exists" });
    }

    // Create new breed
    const breed = await prisma.breed.create({
      data: {
        name,
        fertilityRate,
        infertilityRate,
        eggDamageRate,
        hatchabilityRate,
        healthyChickRate,
        unhealthyChickRate,
        mortalityRate,
        healthyAdultRate,
        unhealthyAdultRate,
      },
    });

    res.status(201).json({
      success: true,
      message: "Breed created successfully",
      breed,
    });
  } catch (error) {
    console.error("Create breed error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


/**
 * @desc    Get all breeds
 * @route   GET /api/breeds
 * @access  Private (only by admin)
 */
export const getAllBreeds = async (req, res) => {
  try {
    const breeds = await prisma.breed.findMany({
      orderBy: { name: "asc" },
    });
    res.status(200).json({ success: true, breeds });
  } catch (error) {
    console.error("Get breeds error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


/**
 * @desc    Get a single breed by ID
 * @route   GET /api/breeds/:id
 * @access  Private (only by admin)
 */
export const getBreedById = async (req, res) => {
  try {
    const { id } = req.params;

    const breed = await prisma.breed.findUnique({ where: { id: BigInt(id) } });

    if (!breed) {
      return res.status(404).json({ success: false, message: "Breed not found" });
    }

    res.status(200).json({ success: true, breed });
  } catch (error) {
    console.error("Get breed by ID error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};



/**
 * @desc    Update a breed
 * @route   PUT /api/breeds/:id
 * @access  Private (Admin only)
 */
export const updateBreed = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const breed = await prisma.breed.update({
      where: { id: BigInt(id) },
      data: updateData,
    });

    res.status(200).json({ success: true, message: "Breed updated successfully", breed });
  } catch (error) {
    console.error("Update breed error:", error);

    if (error.code === "P2025") {
      // Prisma error when record not found
      return res.status(404).json({ success: false, message: "Breed not found" });
    }

    res.status(500).json({ success: false, message: "Server error" });
  }
};


/**
 * @desc    Delete a breed
 * @route   DELETE /api/breeds/:id
 * @access  Private (Admin only)
 */
export const deleteBreed = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.breed.delete({ where: { id: BigInt(id) } });

    res.status(200).json({ success: true, message: "Breed deleted successfully" });
  } catch (error) {
    console.error("Delete breed error:", error);

    if (error.code === "P2025") {
      return res.status(404).json({ success: false, message: "Breed not found" });
    }

    res.status(500).json({ success: false, message: "Server error" });
  }
};
