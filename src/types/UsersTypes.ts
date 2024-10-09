import { Repository } from "./RepositoryTypes";

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
    createUser(user:User): Promise<User>,
    findUsers():Promise<User[]>
}