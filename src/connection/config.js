export const conf = {
    production: "mongodb://" + process.env.MONGO_DB + ":27017/teacher-finder-api",
    development: "mongodb://" + process.env.MONGO_DB  + ":27017/teacher-finder-api",
}
