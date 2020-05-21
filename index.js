//Load express module with `require` directive
var express = require('express')
const userRoutes = require('./routes/user');
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
var bodyParser = require('body-parser')
var morgan = require('morgan')
var app = express()
const mongoose = require('mongoose')
const userService = require('./services/user');
const port = process.env.PORT || 8081;
const db_link = "mongodb://mongo:27017/helloworlddb";
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
mongoose.connect(db_link, options).then(function() {
        console.log('MongoDB is connected');
    })
    .catch(function(err) {
        console.log(err);
    });
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "User API",
            description: "User api swagger Class",
            contact: {
                name: "Mateo Llano"
            },
            servers: ["http://localhost:8081"]
        }
    },
    basePath: "/",
    apis: ["index.js"]
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.urlencoded({ extended: false }))
    // parse application/json
app.use(bodyParser.json())

app.use(morgan('dev'));
app.use(express.json())
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * definitions:
 *   User:
 *     type: object
 *     required: 
 *       - name
 *       - lastname
 *       - phone
 *       - city
 *       - mail
 *     properties:
 *       nombre:
 *         type: string
 *       lastName:
 *         type: string
 *       phone:
 *         type: string
 *       city:
 *         type: string
 *       mail:
 *         type: string
 */


/**
 * @swagger
 * /users:
 *  get:
 *    description: Get all users
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
app.get('/users', async(req, res) => {
    try {
        data = await userService.getUsers()
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json(data);
    }
})

/**
 * @swagger
 * /users:
 *  post:
 *    description: Create a usuario
 *    produces: 
 *      - application/json
 *    parameters:
 *      - name: user
 *        description: new object user
 *        in: body
 *        type: object
 *        required: true
 *        schema:
 *          $ref: '#/definitions/User'
 *    responses:
 *      '201':
 *        description: A succesfull response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/User'
 *      '500':
 *        description: Error in server
 *        content:
 *          type: object
 */
app.post('/users', async(req, res) => {
    try {
        console.log(req.body);

        data = await userService.createUser(req.body)
        return res.status(200).json(data);
    } catch (error) {

    }
})

/**
 * @swagger
 * /users/{id}:
 *  delete:
 *    description: Delete a user by id
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        type: string
 *    produces: 
 *      - application/json
 *    responses:
 *      '200':
 *        description: A succesfull response
 *        content:
 *          application/json:
 *             schema:
 *               $ref: '#/definitions/User'
 *      '500':
 *        description: Error in server
 *        content:
 *          type: object
 */
app.delete('/users/:id', async function(req, res) {
    let usuarioId = req.params.id;
    try {
        let user = await userService.deleteUser(usuarioId)
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500);
    }
})

/**
 * @swagger
 * /users/{id}:
 *  put:
 *    description: Update users by id
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        type: string
 *      - name: User
 *        in: body
 *        type: object
 *        schema:
 *          $ref: '#/definitions/User'
 *    produces: 
 *      - application/json
 *    responses:
 *      '201':
 *        description: A usuario is updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/User'
 *      '500':
 *        description: Error in server
 *        content:
 *          type: object
 */
app.put('/users/:id', async function(req, res, next) {
    let id = req.params.id;
    let user = req.body;
    try {
        let data = await userService.putUser(id, user)
        return res.status(200).json(data);

    } catch (error) {
        return res.status(500)

    }

})

app.get('/', function(req, res) {
        res.send('Hello World!')
    })
    //Launch listening server on port 8081
app.listen(8081, function() {
    console.log('app listening on port 8081!')
})