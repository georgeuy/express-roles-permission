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
        // verificar si existe el trabajo
        const user = await userService.findUserByEmail(email, "_id email username +password");
        if(!user) throw new GenericError("Usuario o email incorrecto", 400);

        // comparar passwords
        const passwordMatch = await user.comparePassword(password);
        if(!passwordMatch) throw new GenericError("Usuario o email incorrecto", 400);
        
        // crear el accessToken (válido por 1 hora)
        const token = jwt.sign(
            {
                id:user._id,
                email:user.email,
                username: user.username,
            }, 
            process.env.JWT_SECRET as string,
            {
                expiresIn:'1h'
            }
        );

        // crear el refreshToken (válido por 30 dias)
        const refreshToken = jwt.sign(
            {id:user._id},
            process.env.REFRESH_TOKEN_SECRET as string,
            { expiresIn: '30d' }
        );

        // Establecer el refresh token como cookie HTTP-only
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true, // Evita acceso desde JavaScript
            secure: process.env.NODE_ENV === 'production', // Solo en HTTPS en producción
            sameSite: 'strict', // Protege contra CSRF
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 días
        });

        res.json({token, refreshToken});
    } catch (error) {
        console.error('User Controller Error: ', error);
        if(error instanceof GenericError) throw error;
        throw new GenericError("Error al procesar el acceso del usuario")
    }
};


export const refreshAccessToken = async (req: Request, res: Response) => {
    
    const refreshToken = req.cookies.refreshToken; // Leer la cookie
    
    try {
        if (!refreshToken) throw new GenericError('Refresh token requerido', 400);

        // Verificar el refresh token
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string) as { id: string };

        // Generar un nuevo access token
        const token = jwt.sign(
            { id: decoded.id },
            process.env.JWT_SECRET as string,
            { expiresIn: '1h' }
        );

        res.json({ token });
    } catch (error) {
        console.error('Refresh Token Error: ', error);
        throw new GenericError('Token inválido o expirado', 401);
    }
};