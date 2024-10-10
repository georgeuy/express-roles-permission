import mongoose, { Schema } from "mongoose";
import { User } from "types/users-types";

const UserSchema: Schema = new Schema<User>(
    {
        
        name:{
            type:String,
            required: true
        },
        username:{
            type:String,
            required: true,
            unique: true
        },
        email:{
            type:String,
            required: true,
            unique: true
        }
    },
    {
        timestamps: true
    }
);


export const UserModel = mongoose.model<User>("User", UserSchema);