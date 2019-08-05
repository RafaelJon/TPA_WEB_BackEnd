const express = require('express');
const mongoose =require('mongoose');
const bodyParser = require('body-parser');

const stays = require('./routes/api/stays');
const experiences = require('./routes/api/experiences');
const saved_folder = require('./routes/api/saveds');
const reviews = require('./routes/api/reviews');

const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());

app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method === 'OPTIONS'){
        res.header ('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

// DB Config
const db = require('./config/keys').mongoURI;

//Connect to Mongo
mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

//Use Routes
app.use('/api/stays',stays);
app.use('/api/experiences',experiences);
app.use('/api/saveds',saved_folder);
app.use('/api/reviews',reviews);


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));