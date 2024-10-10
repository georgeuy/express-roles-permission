import { findRoleById, findRoles, createRole, updateRole, deleteRole } from '@controllers/role-controller';
import { createUser, deleteUser, findUserById, findUsers, updateUser } from '@controllers/user-controller';
import { Router } from 'express';


const router = Router()


export default () => {

    // users
    router.get('/users/:id', findUserById);
    router.get('/users', findUsers);
    router.post('/users', createUser);
    router.put('/users/:id', updateUser)
    router.delete('/users/:id', deleteUser)

    // roles
    router.get('/roles/:id', findRoleById);
    router.get('/roles', findRoles);
    router.post('/roles', createRole);
    router.put('/roles/:id', updateRole)
    router.delete('/roles/:id', deleteRole)


    return router;

}

