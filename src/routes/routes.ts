import { refreshAccessToken, signin, signup } from '@controllers/auth/auth-controller';
import { findPostById, findPosts, createPost, updatePost, deletePost } from '@controllers/post-controller';
import { findRoleById, findRoles, createRole, updateRole, deleteRole } from '@controllers/role-controller';
import { createUser, deleteUser, findUserById, findUsers, updateUser } from '@controllers/user-controller';
import { getPermissions, verifyToken } from '@middlewares/auth';
import { checkRoles } from '@middlewares/role';
import { Router } from 'express';


const router = Router()


export default () => {


    //auth
    router.post('/auth/signup', checkRoles, signup);
    router.post('/auth/signin', signin);
    router.post('/auth/refresh', refreshAccessToken);


    // users
    router.get('/users/:id', verifyToken, getPermissions, findUserById);
    router.get('/users', verifyToken, getPermissions, findUsers);
    router.post('/users', verifyToken, getPermissions, checkRoles, createUser);
    router.put('/users/:id', verifyToken, getPermissions, updateUser)
    router.delete('/users/:id', verifyToken, getPermissions, deleteUser)

    // roles
    router.get('/roles/:id', verifyToken, getPermissions, findRoleById);
    router.get('/roles', verifyToken, getPermissions, findRoles);
    router.post('/roles', verifyToken, getPermissions, createRole);
    router.put('/roles/:id', verifyToken, getPermissions, updateRole)
    router.delete('/roles/:id', verifyToken, getPermissions, deleteRole)

    // posts
    router.get('/posts/:id', findPostById);
    router.get('/posts', findPosts);
    router.post('/posts', verifyToken, getPermissions, createPost);
    router.put('/posts/:id', verifyToken, getPermissions, updatePost)
    router.delete('/posts/:id', verifyToken, getPermissions, deletePost)



    return router;

}

