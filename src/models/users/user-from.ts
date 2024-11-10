import { UserRole } from "./user-role";

export interface UserFrom {
    email: string;
    password: string;
    role: UserRole;
}