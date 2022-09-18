import { User } from "../../src/users/entities";

export interface UserAuth {
    user: User;
    token: string;
}
