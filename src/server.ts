import express from "express";
import routes from './routes';
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { uri } from "./config"
import { Auth } from "./common/auth";
import path from 'path'

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => { console.log('MongoDB connected...') })
    .catch((err: any) => console.log(err));

mongoose.set('useCreateIndex', true);

const app: express.Application = express();

app.use(bodyParser.json());

// app.use(cookieParse())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Account');
    res.setHeader('X-Powered-By', 'ittyni.com')
    if (req.method === 'OPTIONS') return res.sendStatus(200);
    next();
});

app.use(Auth);

app.use('/', routes(express.Router()));

app.listen(8080, () => {
    console.log(`application listening on port : ${8080}`)
})