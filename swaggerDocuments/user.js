/**
 * @swagger
 * /changePassword:
 *   post:
 *     summary: change Password   
 *     tags: [user]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 example: 1234
 *               newPassword:
 *                 type: string
 *                 example: 1234
 *               confirmPassword:
 *                 type: string
 *                 example: 1234
 *     responses:
 *       200:
 *         description: changePassword sucessfully
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
 *                    example: password  change sucessfully
 *                 responseData:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 6266484f5809e1ede8f2b00c
 *       500:
 *         description: changePassword failed
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
 * /update/userProfile:
 *   post:
 *     summary: update userProfile  
 *     tags: [user]
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
 *               bio:
 *                 type: string
 *                 example: i am a sport player.
 *               password:
 *                 type: string
 *                 example: 1234
 *               country:
 *                 type: string
 *                 example: india
 *               dateOfBirth:
 *                 type: string
 *                 example:  dd/mm/yyyy
 *               profileImg:
 *                 type: string
 *                 format:  binary
 *     responses:
 *       200:
 *         description: user profile updated sucessfully
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
 *                    example: user profile updated sucessfully
 *                 responseData:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 62395a01adb56e8f5964ea45
 *       500:
 *         description: userprofile update failed
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