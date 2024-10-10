import { Repository } from "./repository-types";

export interface User{
    id:string,
    name:string,
    username: string,
    email:string
}


// persistencia
export interface IUserRepository extends Repository<User>{}

// lógica
export interface IUserService{
    createUser(user:User): Promise<User>;
    findUsers():Promise<User[]>;
    findUserById(id:string):Promise<User | null>;
    updateUser(id:string, user:Partial<User>): Promise<User | null>;
    deleteUser(id:string): Promise<boolean>;
}