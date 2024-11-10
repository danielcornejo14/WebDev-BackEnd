import { UserRole } from "./user-role";


export interface User {
    id: number;
    email: string;
    password: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
}