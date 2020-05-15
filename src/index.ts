import express, {Router} from 'express';
import mongoose, {Document, Schema, model, connect} from 'mongoose';
import cookieParser from "cookie-parser";
import cors from "cors";
import logger from "morgan";

import config from "./util";
import {routerInit} from "./routes";

const app = express();
const router = Router();

/* Mongo */

export interface Post {
    author: string;
    content: string;
    title: string;
}

const postSchema = new Schema({
    author: String,
    content: String,
    title: String,
});

const PostModel = model<Post & Document>('Post', postSchema);

initializeMiddlewares();
connectToTheDatabase();
// routerInit(app);

app.use('/', router);

router.get('/testCon', async (req, res) => {
    return res.send({msg: 'Con Done!'})
});

router.get('/addPost', async (req, res) => {
    console.log(req.body);
    const payload: Post = {
        author: 'Num1',
        content: 'Num1',
        title: 'From Num1:'
    };

    const data = new PostModel(payload);
    const result = await data.save();
    console.log('From Saved: ', result);
    res.send(result);

});


app.listen(config.PORT, () => {
    console.log(`Server is listening on ${config.PORT}`);
});


function initializeMiddlewares() {
    app.use(logger('dev'));
    app.use(cors({origin: true, credentials: true}));
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(cookieParser());

}

function connectToTheDatabase() {
    const {DB_USER, DB_PASS} = config;
    const [name, pass] = [DB_USER, encodeURIComponent(DB_PASS)];
    const uri = `mongodb+srv://${name}:${pass}@cluster0-v9brj.mongodb.net/test?retryWrites=true&w=majority`;
    console.log(uri);
    connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}
