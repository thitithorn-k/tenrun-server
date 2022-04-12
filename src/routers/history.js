const express = require('express');
const { getActivities, addActivity, removeActivity } = require('../models/history');

const historyRouter = express.Router()

historyRouter.get('/', async (req, res, next) => {
    const searchData = req.query;
    const getActivitiesRes = await getActivities(searchData);
    if(getActivitiesRes.error){
        res.status(getActivitiesRes.status).send(getActivitiesRes);
    } else {
        res.status(200).send(getActivitiesRes);
    }
});

historyRouter.post('/', async (req, res, next) => {
    const addData = req.body;
    const addActivityRes = await addActivity(addData);
    if(addActivityRes.error){
        res.status(addActivityRes.status).send(addActivityRes);
    } else {
        res.status(200).send(addActivityRes);
    }
});

historyRouter.delete('/', async (req, res, next) => {
    const removeData = req.body;
    const removeActivityRes = await removeActivity(removeData);
    if(removeActivityRes.error){
        res.status(removeActivityRes.status).send(removeActivityRes);
    } else {
        res.status(200).send(removeActivityRes);
    }
});

module.exports = historyRouter;