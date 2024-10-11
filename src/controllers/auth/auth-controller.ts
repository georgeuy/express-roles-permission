import { GenericError } from "@errors/generic-error";
import { UserRepository } from "@repositories/user-repository";
import { UserService } from "@services/user-service";
import { Request, Response } from "express";
import { IUserRepository, IUserService, User } from "types/users-types";
import jwt from "jsonwebtoken";


const userRepository: IUserRepository = new UserRepository();
const userService: IUserService = new UserService(userRepository)


export const signup = async (req:Request, res:Response) => {
    const {email}:User = req.body;
    try {
        const userExists = await userService.findUserByEmail(email);
        if(userExists) throw new GenericError("Email en uso", 400);
        const newUser = await userService.createUser(req.body);
        res.json(newUser);
    } catch (error) {
        console.error('User Controller Error: ', error);
        if(error instanceof GenericError) throw error;
        throw new GenericError("Error al intentar registrar un nuevo usuario en la DB")
    }
};


export const signin = async (req:Request, res:Response) => {
    const {email, password}: User = req.body;
    try {
        // verify if user exists
        const user = await userService.findUserByEmail(email, "_id email username +password");
        if(!user) throw new GenericError("Usuario o email incorrecto", 400);

        // comparar passwords
        const passwordMatch = await user.comparePassword(password);
        if(!passwordMatch) throw new GenericError("Usuario o email incorrecto", 400);
        
        const token = jwt.sign({
            id:user._id,
            email:user.email,
            username: user.username
        }, process.env.JWT_SECRET as string);

        res.json({token});
    } catch (error) {
        console.error('User Controller Error: ', error);
        if(error instanceof GenericError) throw error;
        throw new GenericError("Error al procesar el acceso del usuario")
    }
};