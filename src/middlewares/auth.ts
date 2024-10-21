import { GenericError } from "@errors/generic-error";
import { UserRepository } from "@repositories/user-repository";
import { UserService } from "@services/user-service";
import {Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Method, permissions } from "../types/permissions-type";
import { IUserRepository, IUserService, User } from "types/users-types";

const userRepository: IUserRepository = new UserRepository();
const userService: IUserService = new UserService(userRepository)


export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    /*const bearer = req.headers.authorization?.trim().split(' ');
    const token = bearer && bearer.length === 2 ? bearer[1] : null;*/
    const token = req.headers.authorization?.replace(/^Bearer\s+/, '') as string;
    try {
        // obtener los datos del token
        const tokenData = jwt.verify(token, process.env.JWT_SECRET as string) as User;

        // Obtener usuario de la DB
        const user = await userService.findUserById(`${tokenData.id}`);

        //Retornar error si no existe
        if(!user) next(new GenericError(`Usuario no encontrado`,400));

        // Agregar usuario al req       
        req.currentUser = user;

        // continuar
        next();
    } catch (error:any) {
        console.log('Middleware verifyToken: ', error);
        next(new GenericError("Acceso restringido", 401));
    }
};



export const getPermissions = async (req: Request, res: Response, next: NextFunction) => {

    // variables necesarias
    const {currentUser, method, path} = req;
    const {roles} = currentUser!;
    
    try {
        
        // extraer módulo del path de la URL
        const currentModule = path.replace(/^\/([^\/]+).*/,'$1');

        // definir el permiso correspondiente de acuerdo a la petición HTTP
        const findMethod = permissions.find(x => x.method === Method[method as keyof typeof Method]);

        // incluir el permiso únicamente si ya no se encuentra en el array de permisos necesarios
        if(!findMethod?.permissions.includes(`${currentModule}_${findMethod.scope}`)){
            findMethod?.permissions.push(`${currentModule}_${findMethod.scope}`);
        }

        // obtener los permisos del usuario que realizó la petición
        //const rolePermissions = roles?.map(r => r.permissions);
        
        // unir las listas de permisos en una sola en caso de que el usuario tenga más de un role
        //const flatPermissions = rolePermissions?.flat();
        
        // Eliminar repetidos en caso de que el usuario tenga más de un role 
        //const mergedPermissions = Array.from(new Set(flatPermissions));
        
        // Otra form de hacer lo anterior es lo siguiente
        const mergedRolesPermissions = Array.from(new Set(roles?.flatMap(x => x.permissions)));
        
        // Comenzar con permisos individuales del usuario si los tiene
        let userPermissions: string[] = [];
        if (currentUser && currentUser.permissions && currentUser.permissions.length > 0) {
            userPermissions = currentUser.permissions;
        }


        // Unificar permisos del usuario y roles en una sola lista priorizada
        const combinedPermissions = Array.from(new Set([...mergedRolesPermissions, ...userPermissions]));


        // Verificar si el método requiere algún permiso otorgado
        const permissionGranted = findMethod?.permissions.some(x => combinedPermissions.includes(x));


        if(!permissionGranted) next(new GenericError('Permisos insuficientes', 401));

        //console.log('granted:',permissionGranted);
        
        next();        

    } catch (error) {
        console.log('Middleware getPermissions: ',error);
        next(new GenericError('Algo ha salido mal durante el proceso de autenticación'));
        
    }


}
