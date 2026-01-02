/**
 * @swagger
 * tags:
 *   name: Breed
 *   description: Breed management APIs (Admin only)
 */

/**
 * @swagger
 * /api/breeds:
 *   post:
 *     summary: Create a new breed
 *     description: Admin can create a new breed with standard data rates. Requires JWT token.
 *     tags: [Breed]
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
 *               - fertilityRate
 *               - infertilityRate
 *               - eggDamageRate
 *               - hatchabilityRate
 *               - healthyChickRate
 *               - unhealthyChickRate
 *               - mortalityRate
 *               - healthyAdultRate
 *               - unhealthyAdultRate
 *             properties:
 *               name:
 *                 type: string
 *                 example: Local Desi 3
 *               fertilityRate:
 *                 type: number
 *                 example: 85.5
 *               infertilityRate:
 *                 type: number
 *                 example: 14.5
 *               eggDamageRate:
 *                 type: number
 *                 example: 3.2
 *               hatchabilityRate:
 *                 type: number
 *                 example: 78.4
 *               healthyChickRate:
 *                 type: number
 *                 example: 90
 *               unhealthyChickRate:
 *                 type: number
 *                 example: 10
 *               mortalityRate:
 *                 type: number
 *                 example: 5.5
 *               healthyAdultRate:
 *                 type: number
 *                 example: 92
 *               unhealthyAdultRate:
 *                 type: number
 *                 example: 8
 *     responses:
 *       201:
 *         description: Breed created successfully
 *         content:
 *           application/json:
 *             examples:
 *               breedCreated:
 *                 summary: Example of created breed
 *                 value:
 *                   success: true
 *                   message: "Breed created successfully"
 *                   breed:
 *                     id: "4"
 *                     name: "Local Desi 3"
 *                     fertilityRate: 85.5
 *                     infertilityRate: 14.5
 *                     eggDamageRate: 3.2
 *                     hatchabilityRate: 78.4
 *                     healthyChickRate: 90
 *                     unhealthyChickRate: 10
 *                     mortalityRate: 5.5
 *                     healthyAdultRate: 92
 *                     unhealthyAdultRate: 8
 *                     createdAt: "2026-01-02T06:05:15.968Z"
 *                     updatedAt: "2026-01-02T06:05:15.968Z"
 *       409:
 *         description: Breed already exists
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/breeds:
 *   get:
 *     summary: Get all breeds
 *     description: Returns a list of all breeds. Admin only.
 *     tags: [Breed]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all breeds
 *         content:
 *           application/json:
 *             examples:
 *               allBreeds:
 *                 summary: Example response for all breeds
 *                 value:
 *                   success: true
 *                   breeds:
 *                     - id: "1"
 *                       name: "Broiler Cobb 500"
 *                       fertilityRate: 90
 *                       infertilityRate: 10
 *                       eggDamageRate: 2
 *                       hatchabilityRate: 85
 *                       healthyChickRate: 95
 *                       unhealthyChickRate: 5
 *                       mortalityRate: 3.5
 *                       healthyAdultRate: 96.5
 *                       unhealthyAdultRate: 3.5
 *                       createdAt: "2026-01-01T07:08:36.585Z"
 *                       updatedAt: "2026-01-01T07:08:36.585Z"
 *                     - id: "2"
 *                       name: "Local Desi"
 *                       fertilityRate: 85.5
 *                       infertilityRate: 14.5
 *                       eggDamageRate: 3.2
 *                       hatchabilityRate: 78.4
 *                       healthyChickRate: 90
 *                       unhealthyChickRate: 10
 *                       mortalityRate: 5.5
 *                       healthyAdultRate: 92
 *                       unhealthyAdultRate: 8
 *                       createdAt: "2026-01-01T07:12:31.902Z"
 *                       updatedAt: "2026-01-01T07:12:31.902Z"
 *                     - id: "3"
 *                       name: "Local Desi 2"
 *                       fertilityRate: 85.5
 *                       infertilityRate: 14.5
 *                       eggDamageRate: 3.2
 *                       hatchabilityRate: 78.4
 *                       healthyChickRate: 90
 *                       unhealthyChickRate: 10
 *                       mortalityRate: 5.5
 *                       healthyAdultRate: 92
 *                       unhealthyAdultRate: 8
 *                       createdAt: "2026-01-02T06:04:47.138Z"
 *                       updatedAt: "2026-01-02T06:04:47.138Z"
 *                     - id: "4"
 *                       name: "Local Desi 3"
 *                       fertilityRate: 85.5
 *                       infertilityRate: 14.5
 *                       eggDamageRate: 3.2
 *                       hatchabilityRate: 78.4
 *                       healthyChickRate: 90
 *                       unhealthyChickRate: 10
 *                       mortalityRate: 5.5
 *                       healthyAdultRate: 92
 *                       unhealthyAdultRate: 8
 *                       createdAt: "2026-01-02T06:05:15.968Z"
 *                       updatedAt: "2026-01-02T06:05:15.968Z"
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/breeds/{id}:
 *   get:
 *     summary: Get a single breed by ID
 *     description: Returns details of a single breed. Admin only.
 *     tags: [Breed]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           example: "1"
 *         required: true
 *         description: Breed ID
 *     responses:
 *       200:
 *         description: Breed details
 *         content:
 *           application/json:
 *             examples:
 *               breedById:
 *                 summary: Example response for breed ID 1
 *                 value:
 *                   success: true
 *                   breed:
 *                     id: "1"
 *                     name: "Broiler Cobb 500"
 *                     fertilityRate: 90
 *                     infertilityRate: 10
 *                     eggDamageRate: 2
 *                     hatchabilityRate: 85
 *                     healthyChickRate: 95
 *                     unhealthyChickRate: 5
 *                     mortalityRate: 3.5
 *                     healthyAdultRate: 96.5
 *                     unhealthyAdultRate: 3.5
 *                     createdAt: "2026-01-01T07:08:36.585Z"
 *                     updatedAt: "2026-01-01T07:08:36.585Z"
 *       404:
 *         description: Breed not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/breeds/{id}:
 *   put:
 *     summary: Update a breed
 *     description: Admin can update a breed by ID. Requires JWT token.
 *     tags: [Breed]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Breed ID
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
 *                 example: "Local Desi Updated"
 *               fertilityRate:
 *                 type: number
 *                 example: 86
 *               infertilityRate:
 *                 type: number
 *                 example: 14
 *               eggDamageRate:
 *                 type: number
 *                 example: 3.1
 *               hatchabilityRate:
 *                 type: number
 *                 example: 79
 *               healthyChickRate:
 *                 type: number
 *                 example: 91
 *               unhealthyChickRate:
 *                 type: number
 *                 example: 9
 *               mortalityRate:
 *                 type: number
 *                 example: 5
 *               healthyAdultRate:
 *                 type: number
 *                 example: 93
 *               unhealthyAdultRate:
 *                 type: number
 *                 example: 7
 *     responses:
 *       200:
 *         description: Breed updated successfully
 *         content:
 *           application/json:
 *             examples:
 *               updatedBreed:
 *                 summary: Example updated breed response
 *                 value:
 *                   success: true
 *                   message: "Breed updated successfully"
 *                   breed:
 *                     id: "4"
 *                     name: "Local Desi Updated"
 *                     fertilityRate: 86
 *                     infertilityRate: 14
 *                     eggDamageRate: 3.1
 *                     hatchabilityRate: 79
 *                     healthyChickRate: 91
 *                     unhealthyChickRate: 9
 *                     mortalityRate: 5
 *                     healthyAdultRate: 93
 *                     unhealthyAdultRate: 7
 *                     createdAt: "2026-01-02T06:05:15.968Z"
 *                     updatedAt: "2026-01-02T06:30:00.000Z"
 *       404:
 *         description: Breed not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/breeds/{id}:
 *   delete:
 *     summary: Delete a breed
 *     description: Admin can delete a breed by ID. Requires JWT token.
 *     tags: [Breed]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Breed ID
 *         schema:
 *           type: string
 *           example: "4"
 *     responses:
 *       200:
 *         description: Breed deleted successfully
 *         content:
 *           application/json:
 *             examples:
 *               deletedBreed:
 *                 summary: Example delete response
 *                 value:
 *                   success: true
 *                   message: "Breed deleted successfully"
 *       404:
 *         description: Breed not found
 *       500:
 *         description: Server error
 */
