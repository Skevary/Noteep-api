import {Router} from "express";

const tmp = async (req, res) => res.send('');

const auth = Router();

auth.post('signup', tmp);
auth.post('login', tmp);
auth.post('logout', tmp);

export default auth;
