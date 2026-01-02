/**
 * @swagger
 * tags:
 *   name: Hatchery
 *   description: Hatchery management APIs (Admin, Moderator, Hatchery Member)
 */

/**
 * @swagger
 * /api/hatcheries:
 *   post:
 *     summary: Create a new hatchery
 *     description: Admin or Moderator can create a hatchery and assign it to a hatchery member. Requires JWT token.
 *     tags: [Hatchery]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - location
 *               - registrationNumber
 *               - yearEstablished
 *               - ownerId
 *             properties:
 *               name:
 *                 type: string
 *                 example: Green city Hatchery
 *               location:
 *                 type: string
 *                 example: Kathmandu, Nepal
 *               registrationNumber:
 *                 type: string
 *                 example: NH123456789
 *               yearEstablished:
 *                 type: integer
 *                 example: 2018
 *               ownerId:
 *                 type: string
 *                 example: "3"
 *     responses:
 *       201:
 *         description: Hatchery created successfully
 *         content:
 *           application/json:
 *             examples:
 *               hatcheryCreated:
 *                 summary: Example response
 *                 value:
 *                   success: true
 *                   message: "Hatchery created successfully"
 *                   hatchery:
 *                     id: "4"
 *                     name: "Green city Hatchery"
 *                     location: "Kathmandu, Nepal"
 *                     registrationNumber: "NH123456789"
 *                     ownerId: "3"
 *                     renewalStatus: true
 *                     yearEstablished: 2018
 *                     createdAt: "2026-01-02T06:14:42.517Z"
 *                     updatedAt: "2026-01-02T06:14:42.517Z"
 *                     owner:
 *                       id: "3"
 *                       name: "raju"
 *                       email: "raju@gmail.com"
 *                       role: "hatchery_member"
 *                       phone: "123456789"
 *       400:
 *         description: Invalid owner or owner is not a hatchery member
 *       403:
 *         description: Only admin or moderator can create a hatchery
 *       409:
 *         description: Hatchery with registration number already exists
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/hatcheries:
 *   get:
 *     summary: Get all hatcheries
 *     description: Returns all hatcheries with owner information. Admin and Moderator only.
 *     tags: [Hatchery]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all hatcheries
 *         content:
 *           application/json:
 *             examples:
 *               allHatcheries:
 *                 summary: Example response
 *                 value:
 *                   success: true
 *                   hatcheries:
 *                     - id: "4"
 *                       name: "Green city Hatchery"
 *                       location: "Kathmandu, Nepal"
 *                       registrationNumber: "NH123456789"
 *                       ownerId: "3"
 *                       renewalStatus: true
 *                       yearEstablished: 2018
 *                       createdAt: "2026-01-02T06:14:42.517Z"
 *                       updatedAt: "2026-01-02T06:14:42.517Z"
 *                       owner:
 *                         id: "3"
 *                         name: "raju"
 *                         email: "raju@gmail.com"
 *                         role: "hatchery_member"
 *                         phone: "123456789"
 *                     - id: "3"
 *                       name: "Green Valley Hatchery"
 *                       location: "Kathmandu, Nepal"
 *                       registrationNumber: "NH123456"
 *                       ownerId: "3"
 *                       renewalStatus: true
 *                       yearEstablished: 2018
 *                       createdAt: "2026-01-01T07:49:20.940Z"
 *                       updatedAt: "2026-01-01T07:49:20.940Z"
 *                       owner:
 *                         id: "3"
 *                         name: "raju"
 *                         email: "raju@gmail.com"
 *                         role: "hatchery_member"
 *                         phone: "123456789"
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/hatcheries/{id}:
 *   get:
 *     summary: Get a hatchery by ID
 *     description: Returns a single hatchery with owner info. Admin and Moderator only.
 *     tags: [Hatchery]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Hatchery ID
 *         schema:
 *           type: string
 *           example: "4"
 *     responses:
 *       200:
 *         description: Hatchery details
 *         content:
 *           application/json:
 *             examples:
 *               hatcheryById:
 *                 summary: Example response
 *                 value:
 *                   success: true
 *                   hatchery:
 *                     id: "4"
 *                     name: "Green city Hatchery"
 *                     location: "Kathmandu, Nepal"
 *                     registrationNumber: "NH123456789"
 *                     ownerId: "3"
 *                     renewalStatus: true
 *                     yearEstablished: 2018
 *                     createdAt: "2026-01-02T06:14:42.517Z"
 *                     updatedAt: "2026-01-02T06:14:42.517Z"
 *                     owner:
 *                       id: "3"
 *                       name: "raju"
 *                       email: "raju@gmail.com"
 *                       role: "hatchery_member"
 *                       phone: "123456789"
 *       404:
 *         description: Hatchery not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/hatcheries/flocks:
 *   get:
 *     summary: Get all hatcheries with flocks and breed details
 *     description: Returns hatcheries with flocks and associated breed information. Admin and Moderator only.
 *     tags: [Hatchery]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of hatcheries with flocks
 *         content:
 *           application/json:
 *             examples:
 *               hatcheriesWithFlocks:
 *                 summary: Example response
 *                 value:
 *                   success: true
 *                   data:
 *                     - hatcheryId: "4"
 *                       hatcheryName: "Green city Hatchery"
 *                       location: "Kathmandu, Nepal"
 *                       flocks:
 *                         - flockId: "1"
 *                           flockSize: 200
 *                           maleChicks: 100
 *                           femaleChicks: 100
 *                           purpose: "Egg Production"
 *                           source: "Local Supplier"
 *                           intakeDate: "2026-01-01T07:00:00.000Z"
 *                           breed:
 *                             breedId: "2"
 *                             name: "Local Desi"
 *                         - flockId: "2"
 *                           flockSize: 150
 *                           maleChicks: 75
 *                           femaleChicks: 75
 *                           purpose: "Meat Production"
 *                           source: "Supplier X"
 *                           intakeDate: "2026-01-02T07:00:00.000Z"
 *                           breed:
 *                             breedId: "1"
 *                             name: "Broiler Cobb 500"
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/hatcheries/{id}:
 *   put:
 *     summary: Update a hatchery
 *     description: Admin or Moderator can update hatchery information by ID.
 *     tags: [Hatchery]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Hatchery ID
 *         schema:
 *           type: string
 *           example: "4"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Green city Hatchery Updated
 *               location:
 *                 type: string
 *                 example: Kathmandu, Nepal
 *               registrationNumber:
 *                 type: string
 *                 example: NH123456789
 *               yearEstablished:
 *                 type: integer
 *                 example: 2018
 *               renewalStatus:
 *                 type: boolean
 *                 example: true
 *               ownerId:
 *                 type: string
 *                 example: "3"
 *     responses:
 *       200:
 *         description: Hatchery updated successfully
 *       400:
 *         description: Invalid owner or owner is not hatchery member
 *       403:
 *         description: Only admin or moderator can update a hatchery
 *       404:
 *         description: Hatchery not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/hatcheries/{id}:
 *   delete:
 *     summary: Delete a hatchery
 *     description: Only admin can delete a hatchery by ID.
 *     tags: [Hatchery]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Hatchery ID
 *         schema:
 *           type: string
 *           example: "4"
 *     responses:
 *       200:
 *         description: Hatchery deleted successfully
 *       403:
 *         description: Only admin can delete a hatchery
 *       404:
 *         description: Hatchery not found
 *       500:
 *         description: Server error
 */
