import { GenericError } from "@errors/generic-error";
import { RoleRepository } from "@repositories/role-repository";
import { RoleService } from "@services/role-service";
import { Request, Response } from "express";
import { IRoleRepository, IRoleService, Role } from "types/roles-types";

const roleRepository: IRoleRepository = new RoleRepository();
const roleService: IRoleService = new RoleService(roleRepository)

export const findRoleById = async (req: Request, res: Response) => {
    const id:string = req.params.id;
    try {
        const role = await roleService.findRoleById(id);
        res.json(role);
    } catch (error) {
        console.error('Role Controller Error: ', error);
        throw new GenericError("Identificador de Role inválido");
    }

};

export const findRoles = async (req: Request, res: Response) => {
    try {
        const roles = await roleService.findRoles();
        res.json(roles);
    } catch (error) {
        console.error('Role Controller Error: ', error);
        throw new GenericError("Error intentando recuperar los Roles de la BD");
    }
};

export const createRole = async (req: Request, res: Response) => {
    const newrole:Role = req.body;
    try {
        const result = await roleService.createRole(newrole);
        res.json(result);
    } catch (error) {
        console.error('Role Controller Error: ', error);
        throw new GenericError("Error al intentar registrar el Role en la DB"); 
    }
}

export const updateRole = async (req: Request, res: Response) => {
    const id:string = req.params.id;
    const data:Partial<Role> = req.body;
    try {
        const result = await roleService.updateRole(id, data);
        res.json(result);
    } catch (error) {
        console.error('Role Controller Error: ', error);
        throw new GenericError("Error al intentar modificar el Role en la DB"); 
    }
}


export const deleteRole = async (req: Request, res: Response) => {
    const id:string = req.params.id;
    try {
        const result = await roleService.deleteRole(id);
        res.json(result);
    } catch (error) {
        console.error('Role Controller Error: ', error);
        throw new GenericError("Error al intentar eliminar el Role de la DB"); 
    }
}