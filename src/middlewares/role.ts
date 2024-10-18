import { GenericError } from "@errors/generic-error";
import { RoleRepository } from "@repositories/role-repository";
import { RoleService } from "@services/role-service";
import {Request, Response, NextFunction } from "express";
import { ObjectId } from "mongoose";
import { IRoleRepository, IRoleService, Role } from "types/roles-types";

const roleRepository: IRoleRepository = new RoleRepository();
const roleService: IRoleService = new RoleService(roleRepository)

export const checkRoles = async (req: Request, res: Response, next: NextFunction) => {

    const roles: string[] = req.body?.roles ? req.body.roles : [];
    const role: string[] = Array.isArray(roles) && roles.length !== 0 ? roles.map(x => x.toString().trim().replace(/\s/,'-').toLowerCase()) : ["user"];

    try {
        
        const foundRoles = await roleService.findRoles({name:{$in:role}});
        if(foundRoles.length === 0) {next(new GenericError("Role inválido", 404))};

        req.body.roles = foundRoles.map(r => r._id);

        next();

    } catch (error:any) {
        console.log('Middleware checkRoles: ', error);
        next(new GenericError("Algo ha salido mal", 500));
    }
    

}