import { GenericError } from "@errors/generic-error";
import { UserRepository } from "@repositories/user-repository";
import { UserService } from "@services/user-service";
import { Request, Response } from "express";
import { IUserRepository, IUserService, User } from "types/users-types";


const userRepository: IUserRepository = new UserRepository();
const userService: IUserService = new UserService(userRepository)

export const findUserById = async (req: Request, res: Response) => {
    const id:string = req.params.id;
    try {
        const user = await userService.findUserById(id);
        res.json(user);
    } catch (error) {
        console.error('User Controller Error: ', error);
        throw new GenericError("Identificador de Usuario inválido")
    }
};

export const findUsers = async (req: Request, res: Response) => {
    try {
        const users = await userService.findUsers();
        res.json(users);
    } catch (error) {
        console.error('User Controller Error: ', error);
        throw new GenericError("Error al intentar recuperar los usuarios de la DB")
    }
};

export const createUser = async (req: Request, res: Response) => {
    const newUser:User = req.body;
    try {
        const result = await userService.createUser(newUser);
        res.json(result);
    } catch (error) {
        console.error('User Controller Error: ', error);
        throw new GenericError("Error al intentar registrar un nuevo usuario en la DB")
    }
}

export const updateUser = async (req: Request, res: Response) => {
    const id:string = req.params.id;
    const data:Partial<User> = req.body;
    try {
        const result = await userService.updateUser(id, data);
        res.json(result);
    } catch (error) {
        console.error('User Controller Error: ', error);
        throw new GenericError("Error al intentar modificar los datos del usuario en la DB")
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    const id:string = req.params.id;
    try {
        const result = await userService.deleteUser(id);
        res.json(result);
    } catch (error) {
        console.error('User Controller Error: ', error);
        throw new GenericError("Error al intentar eliminar el usuario de la DB")
    }
}