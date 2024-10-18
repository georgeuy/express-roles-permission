import { GenericError } from "@errors/generic-error";
import { PostRepository } from "@repositories/post-repository";
import { PostService } from "@services/post-service";
import { Request, Response } from "express";
import { IPostRepository, IPostService, Post } from "types/posts-types";


const postRepository: IPostRepository = new PostRepository();
const postService: IPostService = new PostService(postRepository)

export const findPostById = async (req: Request, res: Response) => {
    const id:string = req.params.id;
    try {
        const post = await postService.findPostById(id);
        res.json(post);
    } catch (error) {
        console.error('post Controller Error: ', error);
        throw new GenericError("Identificador de Post inválido")
    }
};

export const findPosts = async (req: Request, res: Response) => {

    const currentUser = req.currentUser;
    
    try {
        const posts = await postService.findPosts();
        res.json(posts);
    } catch (error) {
        console.error('post Controller Error: ', error);
        throw new GenericError("Error al intentar recuperar los post de la DB")
    }
};

export const createPost = async (req: Request, res: Response) => {
    const post:Post = {...req.body, author:req.currentUser?.id};
    try {
        const result = await postService.createPost(post);
        res.status(201).json(result);
    } catch (error) {
        console.error('post Controller Error: ', error);
        throw new GenericError("Error al intentar registrar un nuevo Post en la DB")
    }
}

export const updatePost = async (req: Request, res: Response) => {
    try {
        const result = await postService.updatePost(req.params.id, req.body);
        res.json(result);
    } catch (error) {
        console.error('post Controller Error: ', error);
        throw new GenericError("Error al intentar modificar los datos de un Post en la DB")
    }
}

export const deletePost = async (req: Request, res: Response) => {
    try {
        const result = await postService.deletePost(req.params.id);
        res.json(result);
    } catch (error) {
        console.error('post Controller Error: ', error);
        throw new GenericError("Error al intentar eliminar un Post de la DB")
    }
}