import { Repository } from "./repository-types";

export interface Role{
    id:string,
    name:string
}


// persistencia
export interface IRoleRepository extends Repository<Role>{}

// lógica
export interface IRoleService{
    createRole(role:Role): Promise<Role>;
    findRoles():Promise<Role[]>;
    findRoleById(id:string):Promise<Role | null>;
    updateRole(id:string, role:Partial<Role>): Promise<Role | null>;
    deleteRole(id:string): Promise<boolean>;
}