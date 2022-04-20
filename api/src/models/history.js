const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const {userVerify} = require('./user');

const historySchema = new mongoose.Schema({
    'name': {
        type: String,
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
});
const historyModel = mongoose.model('Histories', historySchema, 'histories');

const getActivities = async (searchData) => {
    let countRes;
    let res;
    if(searchData.activitiesFilter !== ''){
        const filterDate = new Date(searchData.activitiesFilter).toISOString().split('T')[0];
        countRes = await historyModel.count({'userId': ObjectId(searchData.userId), 'date':filterDate });
        res = await historyModel.find({'userId': ObjectId(searchData.userId), 'date':filterDate }, {}, {skip: searchData.page*5, limit: 5}).sort('-_id');
    } else {
        countRes = await historyModel.count({'userId': ObjectId(searchData.userId)});
        res = await historyModel.find({'userId': ObjectId(searchData.userId)}, {}, {skip: searchData.page*5, limit: 5}).sort({date: -1, _id: 1});
    }
    return {
        count: countRes,
        data: res
    };
}

const addActivity = async (activityData) => {
    const newData = activityData.addData;
    newData.userId = ObjectId(activityData.userId);
    const res = await historyModel.create(activityData.addData);
    if(res._id){
        return {status: 'add activity successfuly'};
    } else {
        return {status: 500, error: 'error when create'};
    }
}

const removeActivity = async (removeData) => {
    const res = await historyModel.deleteOne({'_id': ObjectId(removeData.removeId), 'userId': ObjectId(removeData.userId)});
    if(res.acknowledged){
        return {status: 'remove activity successfuly'};
    } else {
        return {status: 500, error: 'error when remove'};
    }
}

const updateActivity = async (updateData) => {
    const newData = updateData.data;
    newData.userId = ObjectId(updateData.userId);
    const res = await historyModel.updateOne({'_id': ObjectId(updateData.activityId)}, newData);
    if(res.acknowledged){
        return {status: 'update activity successfuly'};
    } else {
        return {status: 500, error: 'error when update'};
    }
}

const getSummary = async (userData) => {
    const dateNow = new Date();
    const sevenDayBefore = new Date();
    sevenDayBefore.setDate(sevenDayBefore.getDate() - 7);
    const monthStart = dateNow.getMonth() + 1;
    const monthEnd = dateNow.getMonth() + 2;
    const year = dateNow.getFullYear();

    const group = {
        $group: {
            '_id': '$activity_type',
            'duration': {'$sum': '$duration'},
            'count': {'$sum': 1},
        }
    }

    const todaySum = await historyModel.aggregate([
        {
            $match: 
            {
                'userId': ObjectId(userData.userId),
                date: {$gte: new Date(`${year}-${monthStart}-${dateNow.getDate()}`)},
            }
        }, 
        group
    ]);
    const sevenSum = await historyModel.aggregate([
        {
            $match: 
            {
                'userId': ObjectId(userData.userId),
                date: {$gte : new Date(`${year}-${monthStart}-${dateNow.getDate()-6}`), $lte : new Date(`${year}-${monthStart}-${dateNow.getDate()}`)},
            }
        }, 
        group
    ]);
    const monthSum = await historyModel.aggregate([
        {
            $match: 
            {
                'userId': ObjectId(userData.userId),
                date: {$gte : new Date(`${year}-${monthStart}`), $lt : new Date(`${year}-${monthEnd}`)},
            }
        }, 
        group
    ]);
    return {today: todaySum, seven: sevenSum, month: monthSum};
}

module.exports = { getActivities, addActivity, removeActivity, updateActivity, getSummary };