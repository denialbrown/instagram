/**
 * @swagger
 * /signup:
 *   post:
 *     summary: signup user  
 *     tags: [authUser]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: abc
 *               userName:
 *                 type: string
 *                 example: xyz
 *               email:
 *                 type: string
 *                 example: abc@gmail.com
 *               password:
 *                 type: string
 *                 example: 1234
 *               country:
 *                 type: string
 *                 example: india
 *               profileImg:
 *                 type: string
 *                 format:  binary
 *     responses:
 *       200:
 *         description: signup sucessfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 responseCode:
 *                   type: integer
 *                   example: 200
 *                 responseMessage:
 *                    type: string
 *                    example: signup sucessfully
 *                 responseData:
 *                   type: object
 *                   properties:
 *                     loginToken:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MjE1Y2I3NjAxZDg2OTJhZjkzMGVkMTkiLCJhY3Rpb24iOiJhY2Nlc3MiLCJpYXQiOjE2NDU1OTc4MTksImV4cCI6MTY0NTY0MTAxOX0.Zve63LUqIOh3lwhBfgQLbVE73PgbaY0tCPQ7y2vQVsk
 *       500:
 *         description: signup failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 responsecode:
 *                   type: integer
 *                 responseMessage:
 *                    type: string
 */
/**
 * @swagger
 * /logIn:
 *   post:
 *     summary: logIn user  
 *     tags: [authUser]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: abc@gmail.com
 *               password:
 *                 type: string
 *                 example: 1234
 *     responses:
 *       200:
 *         description: logIn sucessfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 responseCode:
 *                   type: integer
 *                   example: 200
 *                 responseMessage:
 *                    type: string
 *                    example: logIn sucessfully
 *                 responseData:
 *                   type: object
 *                   properties:
 *                     loginToken:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MjE1Y2I3NjAxZDg2OTJhZjkzMGVkMTkiLCJhY3Rpb24iOiJhY2Nlc3MiLCJpYXQiOjE2NDU1OTc4MTksImV4cCI6MTY0NTY0MTAxOX0.Zve63LUqIOh3lwhBfgQLbVE73PgbaY0tCPQ7y2vQVsk
 *       500:
 *         description: logIn failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 responsecode:
 *                   type: integer
 *                 responseMessage:
 *                    type: string
 */
/**
 * @swagger
 * /forgotPassword:
 *   post:
 *     summary: forgotPassword   
 *     tags: [authUser]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: abc@gmail.com
 *     responses:
 *       200:
 *         description: forgotPassword sucessfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 responseCode:
 *                   type: integer
 *                   example: 200
 *                 responseMessage:
 *                    type: string
 *                    example: reset password link send sucessfully
 *       500:
 *         description: forgotPassword failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 responsecode:
 *                   type: integer
 *                 responseMessage:
 *                    type: string
 */
/**
 * @swagger
 * /resetPassword/{userId}/{token}:
 *   post:
 *     summary: reset Password   
 *     tags: [authUser]
 *     parameters:
 *      - in: path
 *        name: userId
 *        required: true
 *        default: 62395a01adb56e8f5964ea45
 *      - in: path
 *        name: token
 *        required: true
 *        default: 62395a01adb56e8f5964ea45
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 example: 1234
 *               confirmPassword:
 *                 type: string
 *                 example: 1234
 *     responses:
 *       200:
 *         description: resetPassword sucessfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 responseCode:
 *                   type: integer
 *                   example: 200
 *                 responseMessage:
 *                    type: string
 *                    example: password  reset sucessfully
 *                 responseData:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 6266484f5809e1ede8f2b00c
 *       500:
 *         description: resetPassword failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 responsecode:
 *                   type: integer
 *                 responseMessage:
 *                    type: string
 */

/**
 * @swagger
 * /signup/google:
 *   post:
 *     summary: signup with google
 *     tags: [authUser]
 *     requestBody:
 *       required: true
 *       content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: abc 
 *     responses:
 *       200:
 *         description: signup with google sucessfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 responseCode:
 *                   type: integer
 *                   example: 200
 *                 responseMessage:
 *                   type: string
 *                   example: user signup sucessfully
 *                 responseData:
 *                   type: object
 *                   properties:
 *                     loginToken:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MjE1Y2I3NjAxZDg2OTJhZjkzMGVkMTkiLCJhY3Rpb24iOiJhY2Nlc3MiLCJpYXQiOjE2NDU1OTc4MTksImV4cCI6MTY0NTY0MTAxOX0.Zve63LUqIOh3lwhBfgQLbVE73PgbaY0tCPQ7y2vQVsk
 *       500:
 *         description: signup with google failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 responsecode:
 *                   type: integer
 *                 responseMessage:
 *                   type: string
 */