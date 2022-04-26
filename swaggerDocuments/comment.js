/**
 * @swagger
 * /add/comment/{postId}:
 *   post:
 *     summary: add comment   
 *     tags: [comment]
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
 *               comment:
 *                 type: string
 *                 example: xyz
 *     responses:
 *       200:
 *         description: comment added sucessfully
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
 *                    example: comment added sucessfully
 *                 responseData:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 6266484f5809e1ede8f2b00c
 *       500:
 *         description: comment add failed
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
 * /list/comment/{postId}:
 *   get:
 *     summary: list comment 
 *     tags: [comment]
 *     parameters:
 *      - in: path
 *        name: postId
 *        required: true
 *        default: 62395a01adb56e8f5964ea45 
 *     responses:
 *       200:
 *         description: list comment sucessfully
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
 *                    example: list comment sucessfully
 *                 responseData:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 62395a01adb56e8f5964ea45
 *                     caption:
 *                       type: string
 *                       example: 1234
 *       500:
 *         description: list comment failed
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
 * /delete/comment/{commentId}:
 *   delete:
 *     summary: comment adddress
 *     tags: [comment]
 *     parameters:
 *      - in: path
 *        name: commentId
 *        required: true
 *        default: 62395a01adb56e8f5964ea45  
 *     responses:
 *       200:
 *         description:  comment deleted sucessfully
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
 *                    example:  comment deleted sucessfully
 *       500:
 *         description:  comment delete failed
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