const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
require('dotenv').config();
const notFound = require('./middlewares/not-found');
const errorHandlerMiddleware = require('./middlewares/error-handler');

const PORT = process.env.PORT || 3000;
//middelewares
app.use(express.json());

//routes
app.use('/api/v1/tasks', tasks);

app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async() => {
    try{
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, (err) => {
            console.log(`listning on port http://localhost:${PORT}`);
        });
    }catch(error){
        console.log(error);
    }
}

start();



