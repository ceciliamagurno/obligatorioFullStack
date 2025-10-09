const mongoose = require('mongoose');

const connectMongoDB = async () => {
    const mongoConnectionString = process.env.MONGODB_CONNECTION_STRING;
    const mongoDBName = process.env.MONGODB_DATABASE_NAME;
    await mongoose.connect(`${mongoConnectionString}`,
        {
            serverSelectionTimeoutMS: 9000,
            dbName: mongoDBName
        }
    );
    console.log('Conectado a MongoDB correctamente');
};

module.exports =  connectMongoDB ;


/*CONEXION LOCAL
const mongoose = require('mongoose');

const connectMongoDB = async () => {
    const mongoConnectionString = process.env.MONGODB_CONNECTION_STRING;
    const databaseName = process.env.MONGODB_DATABASE_NAME;

    await mongoose.connect(`${mongoConnectionString}/${databaseName}`,
        {
            serverSelectionTimeoutMS: 5000,
        }
    );
    console.log('Conectado a MongoDB correctamente');
};

module.exports =  connectMongoDB ;*/



