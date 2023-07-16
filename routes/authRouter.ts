import express from 'express'
import authHelper from '../helpers/authHelper'
const router = express.Router()

router.post('/login',(req,res) => {
    const user : IUser ={
        username: req.body.username,
        password:req.body.password
    }
    authHelper.login(user).then((token)=>{
        res.json({status:'ok',token})
    }).catch(err => {
        console.log(err)
        res.status(400).json({status:"error",message:err.message})
    })
})

router.post('/signup',(req,res) => {
    const user : IUser ={
        username: req.body.username,
        password:req.body.password
    }
    authHelper.signup(user).then((token)=>{
        res.json({status:'ok',token})
    }).catch(err => {
        res.status(400).json({status:"error",message:err.message})
    })
})  

export default router