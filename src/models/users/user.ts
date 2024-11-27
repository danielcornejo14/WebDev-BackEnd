import { UserRole } from "./user-role";


export interface User {
    id: number | string;
    email: string;
    password: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
}