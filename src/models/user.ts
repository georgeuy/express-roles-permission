import mongoose, { Schema } from "mongoose";
import { User } from "types/users-types";
import bcrypt from 'bcrypt';

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
        },
        password:{
            type:String,
            required: true,
            trim: true,
            //select: false  // Evita que se incluya el password en las consultas SQL. Si se requiere en alguna consulta deberá llamarse con .select('+password')
        }
    },
    {
        timestamps: true,
        versionKey: false,
        toJSON: {
            transform: function(doc, ret) {
                delete ret.password;
                return ret;
            }
        }
    }
);


UserSchema.pre<User>('save', async function(next){
    if(this.isModified("password") || this.isNew ){
        const salt = await bcrypt.genSalt(12);
        const hash = await bcrypt.hash(this.password, salt);
        this.password = hash;
    }
    next();
});

// Otra forma de quitar el password pero es más riesgosa ya que el passwor se oculta en la capa de negocios
/*UserSchema.methods.toJSON = function(){
    const userObj = this.toObject();
    delete userObj.password;
    return userObj;
};*/


UserSchema.method("comparePassword", async function (password:string):Promise<boolean> {
    return (await bcrypt.compare(password, this.password as string));
})


export const UserModel = mongoose.model<User>("User", UserSchema);