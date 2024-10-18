import mongoose, { Schema } from "mongoose";
import { Post } from "types/posts-types";


const PostSchema: Schema = new Schema<Post>(
    {
        title:{
            type:String,
            required: true
        },
        description:{
            type:String,
            required: false,
        },
        content:{
            type:String,
            required: true,
        },
        featureImage:{
            type:String,
            required: false
        },
        author:{
            type: Schema.Types.ObjectId,
            ref:'User',
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false,
    }
);


export const PostModel = mongoose.model<Post>("Post", PostSchema);