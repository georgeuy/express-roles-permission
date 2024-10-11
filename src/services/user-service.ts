import { Query } from "types/repository-types";
import { IUserRepository, IUserService, User } from "types/users-types";


export class UserService implements IUserService{

    private userRepository: IUserRepository;

    constructor(userRepository:IUserRepository){
        this.userRepository = userRepository;
    }
    
    async createUser(user: User): Promise<User> {
        return this.userRepository.create(user);
    }

    async findUsers(query?: Query): Promise<User[]> {
        return this.userRepository.find(query);
    }

    async findUserById(id:string): Promise<User | null> {
        return this.userRepository.findById(id);
    }

    async findUserByEmail(email:string, fields?:string): Promise<User | null> {
        return this.userRepository.findOne({email}, fields);
    }

    async updateUser(id: string, user: Partial<User>): Promise<User | null> {
        return this.userRepository.update(id, user);
    }

    async deleteUser(id: string): Promise<boolean> {
        return this.userRepository.delete(id);
    }

}