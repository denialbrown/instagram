const express = require('express');
const app = express()
require("dotenv").config()
const fileupload = require('express-fileupload')
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const mongoose = require("mongoose");


app.use(express.json())
app.use(express.urlencoded({
    extended: true
}));
app.use(fileupload())
app.use("/uploads", express.static("./uploads"));

app.use('/api',require('./routes/authUser'))
app.use('/api',require('./routes/user'))
app.use('/api',require('./routes/post'))
app.use('/api',require('./routes/comment'))

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Instagram API ',
    },
    servers: [
        {
            url: 'http://localhost:3000/api',
            description: 'Development server',
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
    },
    security: [{
        bearerAuth: []
    }],
};

const options = {
    swaggerDefinition,
    apis: ['./swaggerDocuments/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);
app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

var url = process.env.MONGODB_URL;
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function (err, db) {

    if (err) throw err;
    app.listen(3000, () => {

        console.log('Server is up on PORT 3000');

    })

});


