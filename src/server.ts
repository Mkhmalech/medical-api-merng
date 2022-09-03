import express from "express";
import routes from './routes';
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { DEV_API, PROD_API } from "./config"
// import { WS } from "./ws";
import { AuthAccount, authAdmin, authUser } from "./gateway";

// env variables
const PORT = process.env.PORT || 8060;
const API = process.env.ENV === "PROD"? PROD_API : DEV_API;
mongoose.connect(API, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => { console.log('MongoDB connected...') })
    .catch((err: any) => console.log(err));

mongoose.set('useCreateIndex', true);

const app: express.Application = express();

app.use(bodyParser.json());

// app.use(cookieParse())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Account, AccountType, Component, machinetoken');
    res.setHeader('X-Powered-By', 'ittyni.com')
    if (req.method === 'OPTIONS') return res.sendStatus(200);
    next();
});


app.use('/*', authUser);
app.use('/anbm', authAdmin);
app.use('/account', AuthAccount);

// WS(app);

console.log(API)
app.use('/', routes(express.Router()));

app.listen(PORT, () => {
    console.log(`application listening on port : env: ${process.env.ENV} Port:${PORT}`)
})
