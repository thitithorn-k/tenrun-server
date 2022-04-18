const express = require('express');
const { createUser, getUser, loginUser, userVerify } = require('../models/user');

const userRouter = express.Router();

userRouter.post('/', async (req, res, next) => {
    const newUser = req.body;
    const createUserRes = await createUser(newUser);
    if(createUserRes.error){
        res.status(createUserRes.status).send(createUserRes);
    } else {
        res.status(201).send(createUserRes);
    }
});

userRouter.get('/', async (req, res, next) => {
    const userData = req.query;
    const findUserRes = await getUser(userData.id);
    if(findUserRes.error){
        res.status(findUserRes.status).send(findUserRes)
    } else {
        res.status(200).send(findUserRes);
    }
});

userRouter.post('/login', async(req, res, next) => {
    const userData = req.body;
    const loginRes = await loginUser(userData.email, userData.password);
    if(loginRes.error){
        res.status(loginRes.status).send(loginRes);
    } else {
        res.status(200).send(loginRes);
    }
});

userRouter.get('/verify', async(req, res, next) => {
    const userData = req.query;
    const verifyRes = await userVerify(userData.userId, userData.session);
    if(verifyRes.error){
        res.status(verifyRes.status).send(verifyRes);
    } else {
        res.status(200).send(verifyRes);
    }
});

module.exports = userRouter;