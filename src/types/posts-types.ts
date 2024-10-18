import { Document, ObjectId } from "mongoose";
import { Query, Repository } from "./repository-types";


export interface Post extends Document{
    title:string;
    description?: string;
    content: string;
    featureImage?: string;
    author: ObjectId;
}


// persistencia
export interface IPostRepository extends Repository<Post>{
    findOne(query:Query): Promise<Post|null>;
}

// lógica
export interface IPostService{
    createPost(post:Post): Promise<Post>;
    findPosts(query?: Query):Promise<Post[]>;
    findPostById(id:string):Promise<Post | null>;
    updatePost(id:string, post:Partial<Post>): Promise<Post | null>;
    deletePost(id:string): Promise<boolean>;
}
