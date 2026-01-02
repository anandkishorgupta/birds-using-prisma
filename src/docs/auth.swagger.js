/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication and authorization endpoints
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user (Admin / Moderator / Hatchery Member)
 *     description: Authenticates a user using email and password and returns a JWT token.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@gmail.com
 *               password:
 *                 type: string
 *                 example: admin
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "1"
 *                     name:
 *                       type: string
 *                       example: admin
 *                     email:
 *                       type: string
 *                       example: admin@gmail.com
 *                     role:
 *                       type: string
 *                       example: admin
 *                     phone:
 *                       type: string
 *                       example: "1234567890"
 *                 message:
 *                   type: string
 *                   example: Logged in successfully
 *       400:
 *         description: Invalid credentials or missing fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid credentials
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user (Admin --> Moderator, Admin --> Hatchery_member, Moderator --> Hatchery_member)
 *     description: Admin can create Moderators; Moderator can create Hatchery Members. Requires JWT token in Authorization header.
 *     tags: [Auth]
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
 *               - email
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *                 example: rajan
 *               email:
 *                 type: string
 *                 example: rajan@gmail.com
 *               password:
 *                 type: string
 *                 example: rajan
 *               phone:
 *                 type: string
 *                 example: "123456789"
 *               role:
 *                 type: string
 *                 enum: [moderator, hatchery_member]
 *                 example: moderator
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: moderator account created successfully
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "6"
 *                     name:
 *                       type: string
 *                       example: rajan
 *                     email:
 *                       type: string
 *                       example: rajan@gmail.com
 *                     phone:
 *                       type: string
 *                       example: "123456789"
 *                     role:
 *                       type: string
 *                       example: moderator
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2026-01-02T05:59:13.885Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2026-01-02T05:59:13.885Z"
 *       403:
 *         description: Unauthorized role (e.g., moderator trying to create admin)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Role "moderator" cannot create a user with role "admin"
 *       409:
 *         description: User already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: User already exists
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Server error
 */
