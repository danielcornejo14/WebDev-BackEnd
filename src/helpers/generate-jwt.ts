import { User } from "../models/users/user";
import { SignJWT } from "jose";
import { environment } from "./environment";

export const generateJwt = (user: User) => {
    const payload = {
        id: user.id,
        email: user.email,
        role: user.role
    };
    return new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("2h")
        .sign(environment.JWT_SECRET);
}