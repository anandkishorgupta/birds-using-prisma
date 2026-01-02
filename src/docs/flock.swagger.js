/**
 * @swagger
 * tags:
 *   name: Flocks
 *   description: Flock management APIs (Admin & Moderator)
 */

/**
 * @swagger
 * /api/flocks:
 *   post:
 *     summary: Create a new flock
 *     description: Admin or Moderator can create a flock for a specific hatchery and breed. Requires JWT token.
 *     tags: [Flocks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - hatcheryId
 *               - breedId
 *               - flockSize
 *               - maleChicks
 *               - femaleChicks
 *               - purpose
 *               - source
 *               - intakeDate
 *             properties:
 *               hatcheryId:
 *                 type: string
 *                 example: "3"
 *               breedId:
 *                 type: string
 *                 example: "1"
 *               flockSize:
 *                 type: integer
 *                 example: 500
 *               maleChicks:
 *                 type: integer
 *                 example: 250
 *               femaleChicks:
 *                 type: integer
 *                 example: 250
 *               purpose:
 *                 type: string
 *                 example: "Broiler"
 *               source:
 *                 type: string
 *                 example: "local"
 *               intakeDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-01-01T08:00:00.000Z"
 *               dateOfShipment:
 *                 type: string
 *                 format: date-time
 *                 nullable: true
 *                 example: null
 *     responses:
 *       201:
 *         description: Flock created successfully
 *         content:
 *           application/json:
 *             examples:
 *               flockCreated:
 *                 summary: Example response
 *                 value:
 *                   success: true
 *                   message: "Flock created successfully"
 *                   flock:
 *                     id: "2"
 *                     hatcheryId: "3"
 *                     breedId: "1"
 *                     flockSize: 500
 *                     maleChicks: 250
 *                     femaleChicks: 250
 *                     purpose: "Broiler"
 *                     source: "local"
 *                     intakeDate: "2026-01-01T08:00:00.000Z"
 *                     dateOfShipment: null
 *                     createdAt: "2026-01-02T06:17:09.755Z"
 *                     updatedAt: "2026-01-02T06:17:09.755Z"
 *                     hatchery:
 *                       id: "3"
 *                       name: "Green Valley Hatchery"
 *                       location: "Kathmandu, Nepal"
 *                     breed:
 *                       id: "1"
 *                       name: "Broiler Cobb 500"
 *       403:
 *         description: Only admin or moderator can create a flock
 *       404:
 *         description: Hatchery or Breed not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/flocks:
 *   get:
 *     summary: Get all flocks
 *     description: Admin or Moderator can retrieve all flocks with their hatchery and breed details.
 *     tags: [Flocks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all flocks
 *         content:
 *           application/json:
 *             examples:
 *               allFlocks:
 *                 summary: Example response
 *                 value:
 *                   success: true
 *                   flocks:
 *                     - id: "1"
 *                       hatcheryId: "3"
 *                       breedId: "1"
 *                       flockSize: 500
 *                       maleChicks: 250
 *                       femaleChicks: 250
 *                       purpose: "Broiler"
 *                       source: "local"
 *                       intakeDate: "2026-01-01T08:00:00.000Z"
 *                       dateOfShipment: null
 *                       createdAt: "2026-01-01T08:36:40.065Z"
 *                       updatedAt: "2026-01-01T08:36:40.065Z"
 *                       hatchery:
 *                         id: "3"
 *                         name: "Green Valley Hatchery"
 *                         location: "Kathmandu, Nepal"
 *                       breed:
 *                         id: "1"
 *                         name: "Broiler Cobb 500"
 *                     - id: "2"
 *                       hatcheryId: "3"
 *                       breedId: "1"
 *                       flockSize: 500
 *                       maleChicks: 250
 *                       femaleChicks: 250
 *                       purpose: "Broiler"
 *                       source: "local"
 *                       intakeDate: "2026-01-01T08:00:00.000Z"
 *                       dateOfShipment: null
 *                       createdAt: "2026-01-02T06:17:09.755Z"
 *                       updatedAt: "2026-01-02T06:17:09.755Z"
 *                       hatchery:
 *                         id: "3"
 *                         name: "Green Valley Hatchery"
 *                         location: "Kathmandu, Nepal"
 *                       breed:
 *                         id: "1"
 *                         name: "Broiler Cobb 500"
 *       500:
 *         description: Server error
 */
