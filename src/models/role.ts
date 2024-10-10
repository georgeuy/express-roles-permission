import mongoose, { Schema } from "mongoose";
import { Role } from "types/roles-types";

const RoleSchema: Schema = new Schema<Role>(
    {
        name:{
            type:String,
            required: true
        }
    },
    {
        timestamps: true,
        versionKey:false
    }
);


export const RoleModel = mongoose.model<Role>("Role", RoleSchema);