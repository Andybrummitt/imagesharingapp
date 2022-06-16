const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const apiErrorHandler = require('./error/apiErrorHandler');

const connectDB = require('./config/db');

//  NEED TO INITIALISE MULTER FOR IMAGE UPLOADS

connectDB();

const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json()) 

app.use('/api/posts', require('./routes/postRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use(apiErrorHandler)

app.listen(port, () => {
    console.log('server listening on port ' + port)
})

