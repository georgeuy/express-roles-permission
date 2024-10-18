import { PostModel } from "@models/post";
import { Query } from "types/repository-types";
import { IPostRepository, Post } from "types/posts-types";

export class PostRepository implements IPostRepository{
    
    async create(data: Post): Promise<Post> {
        const newPost = new PostModel(data);
        return await newPost.save();
    }
    
    async find(query:Query): Promise<Post[]> {
        return await PostModel.find(query ?? {}).populate({
            path:'author',
            populate: {
                path:'roles'
            }
        }).exec();
    }

    async findById(id: string): Promise<Post | null> {
        return await PostModel.findById(id).populate('author').exec();
    }

    async findOne(query:Query): Promise<Post | null> {
        return await PostModel.findOne(query).populate('author').exec();
    }
    
    async update(id: string, data: Partial<Post>): Promise<Post | null> {
        return await PostModel.findByIdAndUpdate(id, data, {new: true}).exec();
    }

    async delete(id: string): Promise<boolean> {
        const deleted = await PostModel.findByIdAndDelete(id).exec();
        return deleted !== null;
    }

}