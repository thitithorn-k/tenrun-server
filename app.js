const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const bodyParser = require('body-parser');

const historyRouter = require('./src/routers/history');
const userRouter = require('./src/routers/user');

const app = express();
const coreOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
}

app.use(bodyParser.json({extended: true}));
app.use(cors(coreOptions));

app.use('/history', historyRouter);
app.use('/user', userRouter);

const boot = () => {
    const { mongoUri, mongoOptions } = require('./config');
    mongoose.connect(mongoUri, mongoOptions);

    const PORT = 4000;
    app.listen(4000, () => {
        console.log(`Server is running at port ${PORT}`)
    })
}

boot();