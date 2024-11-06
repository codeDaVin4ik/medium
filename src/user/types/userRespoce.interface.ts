import { UserType } from "./user.type";

export interface UserResponceIterface {
    user: UserType & {token: string};
}