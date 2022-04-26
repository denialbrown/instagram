/**
 * @swagger
 * /add/post:
 *   post:
 *     summary: add post   
 *     tags: [post]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format:  binary
 *               caption:
 *                 type: string
 *                 example: 1234
 *     responses:
 *       200:
 *         description: post added sucessfully
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
 *                    example: post added sucessfully
 *                 responseData:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 6266484f5809e1ede8f2b00c
 *       500:
 *         description: post add failed
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
 * /get/post/{postId}:
 *   get:
 *     summary: get post 
 *     tags: [post]
 *     parameters:
 *      - in: path
 *        name: postId
 *        required: true
 *        default: 62395a01adb56e8f5964ea45 
 *     responses:
 *       200:
 *         description: get post sucessfully
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
 *                    example: get post sucessfully
 *                 responseData:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 62395a01adb56e8f5964ea45
 *                     caption:
 *                       type: string
 *                       example: 1234
 *                     file:
 *                       type: string
 *                       example: path
 *                     userProfile:
 *                       type: string
 *                       example: path
 *                     userName:
 *                       type: string
 *                       example: abc
 *                     like:
 *                       type: integer
 *                       example: 1
 *                     sorry:
 *                       type: integer
 *                       example: 1
 *                     heart:
 *                       type: integer
 *                       example: 1
 *                     sad:
 *                       type: integer
 *                       example: 1
 *                     celebration:
 *                       type: integer
 *                       example: 1
 *                     wow:
 *                       type: integer
 *                       example: 1
 *                     oops:
 *                       type: integer
 *                       example: 1
 *                     strong:
 *                       type: integer
 *                       example: 1
 *                     dislike:
 *                       type: integer
 *                       example: 1
 *       500:
 *         description: get post failed
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
/**
 * @swagger
 * /delete/post/{postId}:
 *   delete:
 *     summary: delete adddress
 *     tags: [post]
 *     parameters:
 *      - in: path
 *        name: postId
 *        required: true
 *        default: 62395a01adb56e8f5964ea45  
 *     responses:
 *       200:
 *         description:  post deleted sucessfully
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
 *                    example:  post deleted sucessfully
 *       500:
 *         description:  post delete failed
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
/**
 * @swagger
 * /add/reaction/{postId}:
 *   post:
 *     summary: add reaction   
 *     tags: [post]
 *     parameters:
 *      - in: path
 *        name: postId
 *        required: true
 *        default: 62395a01adb56e8f5964ea45
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               like:
 *                 type: string
 *                 example: 0
 *               heart:
 *                 type: string
 *                 example: 0
 *               sorry:
 *                 type: string
 *                 example: 0
 *               sad:
 *                 type: string
 *                 example: 0
 *               celebration:
 *                 type: string
 *                 example: 0
 *               strong:
 *                 type: string
 *                 example: 0
 *               wow:
 *                 type: string
 *                 example: 0
 *               oops:
 *                 type: string
 *                 example: 0
 *               dislike:
 *                 type: string
 *                 example: 0
 *     responses:
 *       200:
 *         description: reaction added sucessfully
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
 *                    example: reaction added sucessfully
 *                 responseData:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 6266484f5809e1ede8f2b00c
 *       500:
 *         description: reaction add failed
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
