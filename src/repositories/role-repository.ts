import { RoleModel } from "@models/role";
import { IRoleRepository, Role } from "types/roles-types";

export class RoleRepository implements IRoleRepository{
    
    async create(data: Role): Promise<Role> {
        const newRole = new RoleModel(data)
        return await newRole.save();
    }
    
    async find(): Promise<Role[]> {
        return await RoleModel.find().exec();
    }

    async findById(id: string): Promise<Role | null> {
        return await RoleModel.findById(id).exec();
    }
    
    async update(id: string, data: Partial<Role>): Promise<Role | null> {
        return await RoleModel.findByIdAndUpdate(id, data, {new: true}).exec();
    }

    async delete(id: string): Promise<boolean> {
        const deleted = await RoleModel.findByIdAndDelete(id).exec();
        return deleted !== null;
    }

}