const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const {userVerify} = require('./user');

const historySchema = new mongoose.Schema({
    'name': {
        type: String,
        unique: true,
        required: true,
    },
    'detail': {
        type: String,
    },
    'activity_type': {
        type: String,
        required: true,
    },
    'date': {
        type: Date,
        required: true,
    },
    'duration': {
        type: Number,
        required: true,
    },
    'userId': {
        type: ObjectId,
        required: true,
    }
})
const historyModel = mongoose.model('Histories', historySchema, 'histories');

const getActivities = async (searchData) => {
    const verified = await userVerify(searchData.userId, searchData.session);
    if(verified){
        const res = await historyModel.find({'userId': ObjectId(searchData.userId)});
        return res;
    } else {
        return {status: 403, error: 'permission denied'}
    }
}

const addActivity = async (activityData) => {
    const verified = await userVerify(activityData.userId, activityData.session);
    if(verified){
        const newData = activityData.addData;
        newData.userId = ObjectId(activityData.userId);
        const res = await historyModel.create(activityData.addData);
        if(res._id){
            return {status: 'add activity successfuly'};
        } else {
            return {status: 500, error: 'error when create'};
        }
    } else {
        return {status: 403, error: 'permission denied'}
    }
    
}

const removeActivity = async (removeData) => {
    const verified = await userVerify(removeData.userId, removeData.session);
    if(verified){
        const res = await historyModel.deleteOne({'_id': ObjectId(removeData.removeId), 'userId': ObjectId(removeData.userId)});
        if(res.acknowledged){
            return {status: 'remove activity successfuly'};
        } else {
            return {status: 500, error: 'error when remove'};
        }
    } else {
        return {status: 403, error: 'permission denied'}
    }
}

module.exports = { getActivities, addActivity, removeActivity };