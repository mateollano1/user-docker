var router = require('express').Router();
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const userService = require('../services/user');


/**
 * @swagger
 * /api/usuarios:
 *  get:
 *    description: Get all usuarios
 *    produces: 
 *      - application/json
 *    responses:
 *      '200':
 *        description: A succesfull response
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 */
router.get('/', (req, res) => {
    try {
        data = userService.getUsers()
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json(data);
    }
})

router.post('/', async(req, res) => {
    try {
        console.log(req.body);

        data = await userService.createUser(req.body)
        return res.status(200).json(data);
    } catch (error) {

    }
})

module.exports = { router }