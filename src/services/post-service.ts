import { Query } from "types/repository-types";
import { IPostRepository, IPostService, Post } from "types/posts-types";


export class PostService implements IPostService{

    private postRepository: IPostRepository;

    constructor(postRepository:IPostRepository){
        this.postRepository = postRepository;
    }
    
    async createPost(post: Post): Promise<Post> {
        return this.postRepository.create(post);
    }

    async findPosts(query?: Query): Promise<Post[]> {
        return this.postRepository.find(query);
    }

    async findPostById(id:string): Promise<Post | null> {
        return this.postRepository.findById(id);
    }

    async updatePost(id: string, post: Partial<Post>): Promise<Post | null> {
        return this.postRepository.update(id, post);
    }

    async deletePost(id: string): Promise<boolean> {
        return this.postRepository.delete(id);
    }

}