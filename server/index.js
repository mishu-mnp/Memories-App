import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import mongoose from "mongoose";
import postRouter from './routes/posts.js';
import dotenv from 'dotenv'


const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

app.use(cors())

app.use('/posts', postRouter);

const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT;


mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running at PORT ${PORT}`)))
    .catch((error) => console.log(error.message))




