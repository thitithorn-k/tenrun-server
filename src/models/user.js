const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const userSchema = mongoose.Schema({
    'email': String,
    'password': String,
    'gender': String,
    'weight': Number,
    'height': Number,
    'dob': Date,
    'session': ObjectId,
});

const userModel = mongoose.model('Users', userSchema, 'users')

const validateData = (data) => {
    const validateEmail = (email) => {
        // credit https://stackoverflow.com/a/46181/17971976
        return email.match(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };
    if(!validateEmail(data.email)) return false;
    if(data.password.length < 8) return false;
    if(data.dob === '') return false;
    return true;
}


const createUser = async (userData) => {
    const validated = validateData(userData);
    if(!validated) return {status: 400, error: 'invalid data'};
    const res = await userModel.find({'email': userData.email});
    if(res.length > 0){
        return {status: 409 ,error: 'this email already exits'};
    } else {
        const createResult = await userModel.create(userData);
        if(createResult.email === userData.email){
            return {status: 'Register successfully'}; //create new user successfully
        } else {
            return {status: 500, error: 'error during create user'};
        }
    }
}

const getUser = async (userId) => {
    if(ObjectId.isValid(userId)){
        const id = new ObjectId(userId)
        const res = await userModel.findOne({'_id': id}, {'_id': 1});
        if(res.length > 0){
            return res;
        } else {
            return {status: 404, error: 'user not found'};
        }
    } else {
        return {status: 400, error: 'invalid user id'};
    }
    
}

const loginUser = async (email, password) => {
    const res = await userModel.findOne({'email': email, 'password': password}, {'_id': 1, 'session': 1});
    if(res){
        const newSession = new ObjectId();
        const addSessionRes = await userModel.updateOne({'email': email, 'password': password}, {'$set': {'session': newSession}});
        if(addSessionRes.acknowledged){
            return {status: 'Login successfully', '_id': res._id.toString(), 'session': newSession.toString()};
        } else {
            return { status: 500, error: 'error when trying to add session'};
        }
    } else {
        return {status: 404, error: 'email or password is incorrect'}
    }
}

const userVerify = async (userId, session) => {
    if(!ObjectId.isValid(userId) || !ObjectId.isValid(session)) return false;
    const res = await userModel.findOne({'_id': ObjectId(userId), 'session': ObjectId(session)}, {'_id': 1});
    if(res){
        return true;
    } else {
        return false;
    }
}

module.exports = {createUser, getUser, loginUser, userVerify};