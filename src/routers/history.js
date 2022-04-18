const express = require('express');
const { 
    getActivities, 
    addActivity, 
    removeActivity, 
    updateActivity, 
    getSummary 
} = require('../models/history');
const { userVerify } = require('../models/user');

const historyRouter = express.Router()

historyRouter.use('/', async (req, res, next) => {
    let data;
    if(req.method == 'GET'){
        data = req.query;
    } else {
        data = req.body;
    }
    const verifyRes = await userVerify(data.userId, data.token);
    if(verifyRes){
        next();
    } else {
        res.status(403).send({error: 'permission denied'});
    }
});

// get activities
historyRouter.get('/', async (req, res, next) => {
    const searchData = req.query;
    const getActivitiesRes = await getActivities(searchData);
    if(getActivitiesRes.error){
        res.status(getActivitiesRes.status).send(getActivitiesRes);
    } else {
        res.status(200).send(getActivitiesRes);
    }
});

// add new activity
historyRouter.post('/', async (req, res, next) => {
    const addData = req.body;
    const addActivityRes = await addActivity(addData);
    if(addActivityRes.error){
        res.status(addActivityRes.status).send(addActivityRes);
    } else {
        res.status(200).send(addActivityRes);
    }
});

// update activity
historyRouter.put('/', async (req, res, next) => {
    const updateData = req.body;
    const updateActivityRes = await updateActivity(updateData);
    if(updateActivityRes.error){
        res.status(updateActivityRes.status).send(updateActivityRes);
    } else {
        res.status(200).send(updateActivityRes);
    }
});

// remove activity
historyRouter.delete('/', async (req, res, next) => {
    const removeData = req.body;
    const removeActivityRes = await removeActivity(removeData);
    if(removeActivityRes.error){
        res.status(removeActivityRes.status).send(removeActivityRes);
    } else {
        res.status(200).send(removeActivityRes);
    }
});

// get user summary
historyRouter.get('/summary', async (req, res, next) => {
    const userData = req.query;
    console.log()
    const getSummaryRes = await getSummary(userData);
    if(getSummaryRes.error){
        res.status(getSummaryRes.status).send(getSummaryRes);
    } else {
        res.status(201).send(getSummaryRes);
    }
});

module.exports = historyRouter;