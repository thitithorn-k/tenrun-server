const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const {userVerify} = require('./user');

const historySchema = new mongoose.Schema({
    'name': String,
    'detail': String,
    'history_type': String,
    'date': Date,
    'duration': Number,
    'userId': ObjectId,
})
const historyModel = mongoose.model('Histories', historySchema, 'histories');

const getHistory = async (searchData) => {
    const verified = await userVerify(searchData.userId, searchData.session);
    if(verified){
        const res = await historyModel.find({'userId': ObjectId(searchData.userId)});
        return res;
    } else {
        return {status: 403, error: 'permission denied'}
    }
}

const createHistory = async (activityData) => {
    const res = await historyModel.create()
}

module.exports = { getHistory };