import prisma from "../lib/prisma.js";


/**
 * @desc    Create or update daily production for a flock
 * @route   POST /api/production/upsert
 * @access  Private (Admin / Moderator)
 */
export const upsertDailyProduction = async (req, res) => {
    try {
        const {
            flockId,
            recordDate,
            eggsCollected,
            fertileEggs,
            infertileEggs,
            damagedEggs,
            chicksHatched,
            healthyChicks,
            unhealthyChicks,
            deaths,
            healthyAdults,
            unhealthyAdults,
        } = req.body;

        // Validate required fields
        if (!flockId || !recordDate) {
            return res.status(400).json({
                success: false,
                message: "flockId and recordDate are required",
            });
        }

        const flockIdBigInt = BigInt(flockId);

        // ✅ 1. Check if flock exists
        const flock = await prisma.flock.findUnique({
            where: { id: flockIdBigInt },
            select: { id: true },
        });

        if (!flock) {
            return res.status(404).json({
                success: false,
                message: `Flock with id ${flockId} does not exist`,
            });
        }

        // ✅ 2. Prepare data for upsert
        const productionData = {
            flockId: flockIdBigInt,
            recordDate: new Date(recordDate),
            eggsCollected,
            fertileEggs,
            infertileEggs,
            damagedEggs,
            chicksHatched,
            healthyChicks,
            unhealthyChicks,
            deaths,
            healthyAdults,
            unhealthyAdults,
        };

        // ✅ 3. Upsert daily production
        const data = await prisma.dailyProduction.upsert({
            where: {
                flockId_recordDate: {
                    flockId: flockIdBigInt,
                    recordDate: new Date(recordDate),
                },
            },
            update: productionData,
            create: productionData,
        });

        res.status(200).json({
            success: true,
            message: "Daily production upserted successfully",
            data,
        });
    } catch (error) {
        console.error("Upsert daily production error:", error);

        if (error.code === "P2003") {
            return res.status(400).json({
                success: false,
                message: "Foreign key constraint failed. Check if flock exists.",
            });
        }

        res.status(500).json({ success: false, message: "Server error" });
    }
};






/**
 * @desc    Get production report with filters
 * @route   GET /api/production/report
 * @query   ?type=daily|weekly|monthly|range&flockId=1&startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
 * @access  Private (Admin / Moderator)
 */
export const getProductionReport = async (req, res) => {
  try {
    const { type = "daily", flockId, startDate, endDate } = req.query;

    // Validate flockId if provided
    if (flockId) {
      const flockExists = await prisma.flock.findUnique({ where: { id: BigInt(flockId) } });
      if (!flockExists) {
        return res.status(404).json({ success: false, message: "Flock not found" });
      }
    }

    // Build filters
    const filters = {};
    if (flockId) filters.flockId = BigInt(flockId);
    if (startDate) filters.recordDate = { gte: new Date(startDate) };
    if (endDate) filters.recordDate = { ...filters.recordDate, lte: new Date(endDate) };

    // Fetch records
    const records = await prisma.dailyProduction.findMany({
      where: filters,
      include: {
        flock: { select: { id: true, flockSize: true, breedId: true, breed: { select: { id: true, name: true } } } },
      },
      orderBy: { recordDate: "asc" },
    });

    if (!records.length) {
      return res.status(404).json({ success: false, message: "No production data found for the given filter" });
    }

    // Helper to get key for grouping
    const getKey = (date) => {
      const d = new Date(date);
      if (type === "daily") return d.toISOString().split("T")[0];
      if (type === "weekly") {
        const temp = new Date(d.valueOf());
        temp.setUTCDate(temp.getUTCDate() + 4 - (temp.getUTCDay() || 7));
        const yearStart = new Date(Date.UTC(temp.getUTCFullYear(), 0, 1));
        const weekNo = Math.ceil((((temp - yearStart) / 86400000 + 1) / 7));
        return `${temp.getUTCFullYear()}-W${weekNo.toString().padStart(2, "0")}`;
      }
      if (type === "monthly") return `${d.getUTCFullYear()}-${(d.getUTCMonth() + 1).toString().padStart(2, "0")}`;
      if (type === "range") return "range";
      return d.toISOString().split("T")[0];
    };

    // Group records into array
    const groupedMap = new Map();

    records.forEach((r) => {
      const key = getKey(r.recordDate);

      if (!groupedMap.has(key)) {
        groupedMap.set(key, {
          period: key,
          eggsCollected: 0,
          fertileEggs: 0,
          infertileEggs: 0,
          damagedEggs: 0,
          chicksHatched: 0,
          healthyChicks: 0,
          unhealthyChicks: 0,
          deaths: 0,
          healthyAdults: 0,
          unhealthyAdults: 0,
          flocks: [],
        });
      }

      const item = groupedMap.get(key);

      item.eggsCollected += r.eggsCollected;
      item.fertileEggs += r.fertileEggs;
      item.infertileEggs += r.infertileEggs;
      item.damagedEggs += r.damagedEggs;
      item.chicksHatched += r.chicksHatched;
      item.healthyChicks += r.healthyChicks;
      item.unhealthyChicks += r.unhealthyChicks;
      item.deaths += r.deaths;
      item.healthyAdults += r.healthyAdults;
      item.unhealthyAdults += r.unhealthyAdults;

      item.flocks.push({
        flockId: r.flock.id,
        flockSize: r.flock.flockSize,
        breedId: r.flock.breedId,
        breedName: r.flock.breed?.name || null,
      });
    });

    // Convert Map to array
    const reportArray = Array.from(groupedMap.values());

    res.status(200).json({
      success: true,
      type,
      report: reportArray,
    });
  } catch (error) {
    console.error("Get production report error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


