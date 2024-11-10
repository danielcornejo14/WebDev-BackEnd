import { Request, Response, NextFunction } from "express";
import { jwtVerify } from "jose";
import { environment } from "../helpers/environment";

export const jwtVerifyer = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.headers.authorization;
    if (!token) {
        res.status(401).send({ error: "No token provided" });
        return;
    }

    try {
        const { payload } = await jwtVerify(token, environment.JWT_SECRET);
        const data = req.body;

        req.body = { data: data, payload: payload};
        next();
    } catch (error) {
        res.status(403).send({ error: "Invalid token" });
        return;
    }
};
