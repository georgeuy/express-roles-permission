import { Document, ObjectId } from "mongoose";
import { Query, Repository } from "./repository-types";
import { Role } from "./roles-types";
import { Post } from "./posts-types";


export interface User extends Document{
    name:string;
    username: string;
    email:string;
    password:string;
    roles?: Role[];
    permissions?: string[];
    posts?:Post[];
    comparePassword(password:string): Promise<boolean>;
}


// persistencia
export interface IUserRepository extends Repository<User>{
    findOne(query:Query, fields?:string): Promise<User|null>;
}

// lógica
export interface IUserService{
    createUser(user:User): Promise<User>;
    findUsers(query?: Query):Promise<User[]>;
    findUserById(id:string):Promise<User | null>;
    findUserByEmail(email:string, fields?:string):Promise<User | null>;
    updateUser(id:string, user:Partial<User>): Promise<User | null>;
    deleteUser(id:string): Promise<boolean>;
}

