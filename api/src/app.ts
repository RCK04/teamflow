import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import router from './server/routes/main';
import connectDB from './server/config/db';
const app = express();

connectDB();

app.use(express.json());
app.use('/', router);


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
