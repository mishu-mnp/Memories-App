import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import mongoose from "mongoose";
import postRouter from './routes/posts.js';



const app = express();

app.use('/posts', postRouter);

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

app.use(cors())

const CONNECTION_URL = 'mongodb+srv://mishu23:mishucodes2023@cluster0.rooc0wr.mongodb.net/?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;


mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running at PORT ${PORT}`)))
    .catch((error) => console.log(error.message))




