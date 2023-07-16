import mongoose from "mongoose";

const UserSchema = new mongoose.Schema<IUser>({
    username:String,
    password:String,
},{ timestamps: true })

export default mongoose.model<IUser>('user',UserSchema)