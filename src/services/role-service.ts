import { Query } from "types/repository-types";
import { IRoleRepository, IRoleService, Role } from "types/roles-types";


export class RoleService implements IRoleService{

    private roleRepository: IRoleRepository;

    constructor(roleRepository:IRoleRepository){
        this.roleRepository = roleRepository;
    }
    
    async createRole(role: Role): Promise<Role> {
        return this.roleRepository.create(role);
    }

    async findRoles(query?: Query): Promise<Role[]> {
        return this.roleRepository.find(query);
    }

    async findRoleById(id:string): Promise<Role | null> {
        return this.roleRepository.findById(id);
    }

    async updateRole(id: string, Role: Partial<Role>): Promise<Role | null> {
        return this.roleRepository.update(id, Role);
    }

    async deleteRole(id: string): Promise<boolean> {
        return this.roleRepository.delete(id);
    }

}