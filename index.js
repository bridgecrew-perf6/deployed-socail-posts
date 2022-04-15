import Express  from "express";
import cors from 'cors';
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from 'dotenv';

import postrouter from './routes/postroutes.js';
import userrouter from './routes/userroutes.js';

const app=Express();
app.use(cors());
app.use(Express.static("public"));
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
dotenv.config();

app.use('/posts',postrouter);
app.use('/user',userrouter)
app.get('/',(req,res)=>{res.send('APP IS RUNNING')});
const CONNECTION_URL =process.env.CONNECTION_URL;
const PORT = process.env.PORT|| 5000;

mongoose.connect(CONNECTION_URL,( { useNewUrlParser: true, useUnifiedTopology: true }))
.then(()=>app.listen(PORT,()=>console.log(`listing to port:${PORT}`)))
.catch((err)=>console.log(err));
