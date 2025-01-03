import { Permission } from "./permission.enum"

export interface User {
    id?: number,
    email: string,
    password: string,
    fullName?: string,
    accessToken?: string,
    permissions?: Permission[],
    _links?: {
        self: {
            href: string;
        };
    };
}