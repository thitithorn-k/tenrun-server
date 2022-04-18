module.exports = {
    mongoUri: process.env.mongo_uri,
    mongoOptions: {
        user: process.env.mongo_user,
        pass: process.env.mongo_pass,
        dbName: process.env.mongo_dbname,
        retryWrites: true,
        w: 'majority',
    },
};