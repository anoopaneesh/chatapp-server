import User from '../models/User'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Document, Types } from 'mongoose'
export default {
    signup:async ({username,password}:IUser) => {
        
            let existingUser = await User.findOne({username}).exec()
        if(existingUser){
            throw Error("Username is taken")
        }
        let hpass = await bcrypt.hash(password,10)
        const user = new User({username,password:hpass})
        await user.save()
        return jwt.sign(user.toJSON(), process.env.JWT_SECRET!)
        
    },
    login:async({username,password}:IUser) => {
       
            let existingUser = await User.findOne({username}).exec()
            if(!existingUser){
                throw Error('User does not exist')
            }
            let isPasswordMatching = await bcrypt.compare(password,existingUser.password)
            if(isPasswordMatching){
                return jwt.sign(existingUser.toJSON(), process.env.JWT_SECRET!)
            }else{
                throw Error('Password incorrect')
            }
        
    }
}