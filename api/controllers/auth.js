import { db } from "../connect.js"
import  bcrypt from  'bcryptjs'
import jwt  from "jsonwebtoken"

export const register=(req,res)=>{
//check use if exist
const q="SELECT * FROM users WHERE username = ?"
db.query(q,[req.body.username],(err,data)=>{
    if(err) return res.status(500).json(err)
    if(data.length) res.status(409).json({msg:'user already exist'})
    //create a new user
//hash password

const saltRound=10
const salt= bcrypt.genSaltSync(saltRound)
const hashedPassword=bcrypt.hashSync(req.body.password,salt)

const q="INSERT INTO users (`username`,`email`,`password`,`name`) VALUE (?)"
const values=[req.body.username,req.body.email,hashedPassword,req.body.name]
db.query(q,[values],(err,data)=>{
    if(err) return res.status(500).json(err)
    return res.status(200).json("user has been created")
})
})

}
export const login=(req,res)=>{
    const q ="select * from users where username=?"
    db.query(q,[req.body.username],(err,data)=>{
        if(err) return res.status(500).json(err)
        if(data.length===0) return  res.status(409).json('your account not exist')
        const checkpassword=bcrypt.compare(req.body.password,data[0].password)
        if(!checkpassword) res.status(400).json('wrong password or username')
    const token= jwt.sign({id:data[0].id},"secretKey")
    const {password,...others}=data[0]
res.cookie("accessToken",token,{
    httpOnly:true,
}).status(200).json(others)    
})
}
export const logout=(req,res)=>{
    res.clearCookie("accessToken",{
        secure:true,
        sameSite:"none"
    }).status(200).json("User has been logged out")
}
//0:30m