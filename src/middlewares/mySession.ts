import { NextFunction, Request, Response } from "express";
import { jwtVerify } from "jose";

const key = new TextEncoder().encode(process.env.AUTH_SECRET_1);

export const getSession = async (req: Request): Promise<cookieUser> => {
    try {
        const token = req.cookies["__Secure-authjs.session-token"];
        const { payload } = await jwtVerify(token, key, { algorithms: ["HS256"] });
        return {
            name: payload.name as string,
            image: payload.picture as string,
            id: payload.sub as string,
            email: payload.email as string,
        }
    } catch (error) {
        return undefined;
    }
};

const mySession = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies["authjs.session-token"];
        const { payload } = await jwtVerify(token, key, { algorithms: ["HS256"] });
        req.user = {
            name: payload.name,
            image: payload.picture,
            id: payload.sub,
            email: payload.email,
        }
    } catch (error) {
        req.user = undefined;
    } finally {
        next();
    }
};

export default mySession;