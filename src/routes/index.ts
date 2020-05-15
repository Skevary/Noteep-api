import {Application, Router} from "express";
import auth from "./_auth";

export const routerInit = (app: Application) => {
    const root = Router();

    root.use('/auth', auth);
    // root.use('/meta', routes);
    // root.use('/posts', routes);

    app.use('/', root);
};
