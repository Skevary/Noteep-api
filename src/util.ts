import {cleanEnv, port, str} from "envalid";

export default cleanEnv(process.env, {
    DB_USER: str(),
    DB_PASS: str(),
    jwtSecret: str(),
    PORT: port({default: 3958})
});
