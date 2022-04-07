const express = require('express');
const { getHistory } = require('../models/history');

const historyRouter = express.Router()

historyRouter.get('/', async (req, res, next) => {
    const searchData = req.query;
    const getHistoryRes = await getHistory(searchData);
    if(getHistoryRes.error){
        res.status(getHistoryRes.status).send(getHistoryRes);
    } else {
        res.status(200).send(getHistoryRes);
    }
})

module.exports = historyRouter;