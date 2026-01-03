/**
 * @swagger
 * tags:
 *   name: Production
 *   description: Daily, weekly, monthly, and range production management APIs (Admin, Moderator)
 */

/**
 * @swagger
 * /api/production/upsert:
 *   post:
 *     summary: Create or update daily production for a flock
 *     description: Admin or Moderator can upsert production data for a flock. Requires JWT token.
 *     tags: [Production]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - flockId
 *               - recordDate
 *             properties:
 *               flockId:
 *                 type: string
 *                 example: "1"
 *               recordDate:
 *                 type: string
 *                 format: date
 *                 example: "2026-01-06"
 *               eggsCollected:
 *                 type: integer
 *                 example: 480
 *               fertileEggs:
 *                 type: integer
 *                 example: 420
 *               infertileEggs:
 *                 type: integer
 *                 example: 50
 *               damagedEggs:
 *                 type: integer
 *                 example: 20
 *               chicksHatched:
 *                 type: integer
 *                 example: 900
 *               healthyChicks:
 *                 type: integer
 *                 example: 370
 *               unhealthyChicks:
 *                 type: integer
 *                 example: 20
 *               deaths:
 *                 type: integer
 *                 example: 3
 *               healthyAdults:
 *                 type: integer
 *                 example: 495
 *               unhealthyAdults:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       200:
 *         description: Daily production upserted successfully
 *         content:
 *           application/json:
 *             examples:
 *               productionUpserted:
 *                 summary: Example response
 *                 value:
 *                   success: true
 *                   message: "Daily production upserted successfully"
 *                   data:
 *                     id: "7"
 *                     flockId: "1"
 *                     recordDate: "2026-01-06T00:00:00.000Z"
 *                     eggsCollected: 480
 *                     fertileEggs: 420
 *                     infertileEggs: 50
 *                     damagedEggs: 20
 *                     chicksHatched: 900
 *                     healthyChicks: 370
 *                     unhealthyChicks: 20
 *                     deaths: 3
 *                     healthyAdults: 495
 *                     unhealthyAdults: 5
 *                     createdAt: "2026-01-03T11:37:41.844Z"
 *                     updatedAt: "2026-01-03T11:37:41.844Z"
 *       400:
 *         description: Missing required fields or foreign key constraint failed
 *       404:
 *         description: Flock not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/production/report:
 *   get:
 *     summary: Get production report
 *     description: Returns production report grouped by daily, weekly, monthly, or range. Supports optional flockId and date filters. Admin or Moderator only.
 *     tags: [Production]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [daily, weekly, monthly, range]
 *           default: daily
 *         description: Type of report grouping
 *       - in: query
 *         name: flockId
 *         schema:
 *           type: string
 *         description: Filter by specific flock ID
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date for filtering (YYYY-MM-DD)
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: End date for filtering (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Production report retrieved successfully
 *         content:
 *           application/json:
 *             examples:
 *               weeklyReportExample:
 *                 summary: Weekly production report
 *                 value:
 *                   success: true
 *                   type: "weekly"
 *                   report:
 *                     - period: "2026-W01"
 *                       eggsCollected: 1920
 *                       fertileEggs: 1680
 *                       infertileEggs: 200
 *                       damagedEggs: 80
 *                       chicksHatched: 1560
 *                       healthyChicks: 1480
 *                       unhealthyChicks: 80
 *                       deaths: 12
 *                       healthyAdults: 1980
 *                       unhealthyAdults: 20
 *                       flocks:
 *                         - flockId: "1"
 *                           flockSize: 500
 *                           breedId: "1"
 *                           breedName: "Broiler Cobb 500"
 *                         - flockId: "2"
 *                           flockSize: 500
 *                           breedId: "1"
 *                           breedName: "Broiler Cobb 500"
 *                     - period: "2026-W02"
 *                       eggsCollected: 480
 *                       fertileEggs: 420
 *                       infertileEggs: 50
 *                       damagedEggs: 20
 *                       chicksHatched: 900
 *                       healthyChicks: 370
 *                       unhealthyChicks: 20
 *                       deaths: 3
 *                       healthyAdults: 495
 *                       unhealthyAdults: 5
 *                       flocks:
 *                         - flockId: "1"
 *                           flockSize: 500
 *                           breedId: "1"
 *                           breedName: "Broiler Cobb 500"
 *       404:
 *         description: No production data found for the given filter
 *       500:
 *         description: Server error
 */
