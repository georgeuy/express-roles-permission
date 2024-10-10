import { UserRepository } from '@repositories/user-repository';
import { UserService } from '@services/user-service';
import { Router } from 'express';
import { IUserRepository, IUserService, User } from 'types/users-types';

const router = Router()

const userRepository: IUserRepository = new UserRepository();
const userService: IUserService = new UserService(userRepository)

export default () => {

    router.get("/health", (req, res)=>{
        res.send("API Saludable");
    });

    router.get('/users/:id', async (req, res) => {
        const id:string = req.params.id;
        const user = await userService.findUserById(id);
        res.json(user);
    });
    
    router.get('/users', async (req, res) => {
        const users = await userService.findUsers();
        res.json(users);
    });

    router.post('/users', async (req, res) => {
        const newUser:User = req.body;
        const result = await userService.createUser(newUser);

        res.json(result);
    })

    router.put('/users/:id', async (req, res) => {
        const id:string = req.params.id;
        const data:Partial<User> = req.body;
        const result = await userService.updateUser(id, data);
        res.json(result);
    })


    router.delete('/users/:id', async (req, res) => {
        const id:string = req.params.id;
        const result = await userService.deleteUser(id);
        res.json(result);
    })

    return router;

}

