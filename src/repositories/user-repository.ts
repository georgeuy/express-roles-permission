import { UserModel } from "@models/user";
import { Query } from "types/repository-types";
import { IUserRepository, User } from "types/users-types";

export class UserRepository implements IUserRepository{
    
    async create(data: User): Promise<User> {
        const newUser = new UserModel(data);
        return await newUser.save();
    }
    
    async find(query:Query): Promise<User[]> {
        return await UserModel.find(query ?? {}).populate('roles').exec();
    }

    async findById(id: string): Promise<User | null> {
        return await UserModel.findById(id).populate('roles').exec();
    }

    async findOne(query:Query, fields?:string): Promise<User | null> {
        if(fields)
            return await UserModel.findOne(query).select(fields).select(fields).exec();
        return await UserModel.findOne(query).populate('roles').exec();
    }
    
    async update(id: string, data: Partial<User>): Promise<User | null> {
        return await UserModel.findByIdAndUpdate(id, data, {new: true}).populate('roles').exec();
    }

    async delete(id: string): Promise<boolean> {
        const deleted = await UserModel.findByIdAndDelete(id).exec();
        return deleted !== null;
    }

}