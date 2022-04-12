module.exports = {
    mongoUri: 'mongodb+srv://tenrun.4rutj.mongodb.net/',
    mongoOptions: {
        user: process.env.mongo_user,
        pass: process.env.mongo_pass,
        dbName: 'tenrun',
        retryWrites: true,
        w: 'majority',
    },
};