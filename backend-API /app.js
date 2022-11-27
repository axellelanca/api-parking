const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const dotenv = require('dotenv');
// const path = require('path');

// Env file
dotenv.config();

const parkingRoutes = require('./routes/parking');
const authRoutes = require('./routes/auth');


// Express app
const app = express();

let corsOption = {
    origin: 'http://localhost',
    optionsSuccessStatus: 200,
    credentials: true,
    methods: 'GET, HEAD,PUT,PATCH,POST,DELETE',
}

app.use(bodyParser.json()); //application/json


//Routes
app.use('/parking', parkingRoutes);
app.use('/auth', authRoutes);

// Settings to avoid CORS errors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept, Origin, X-Requested-With');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.use(cors({
    origin: '*'
}));

app.use(cors(corsOption));

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message =error.message;
    const data = error.data;
    res.status(status).json({message: message, data: data});
});



// DB connection and server
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@api-park.wwqtzae.mongodb.net/?retryWrites=true&w=majority`)
    .then(result => {
        app.listen(process.env.PORT);
        console.log(`Your port is ${process.env.PORT}`)
    })
    .catch(err => console.log(err));

