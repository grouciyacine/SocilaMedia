import {db} from '../connect.js'
import jwt from 'jsonwebtoken'
export const getUser=(req,res)=>{
const userId=req.params.userId;
const q="select * from users where id=? "
db.query(q,[userId],(err,data)=>{
    if(err) return res.status(500).json(err)
    const {password, ...info}=data[0]
    return res.json(info)
})
}

export const updateUser=(req,res)=>{
    const userId=req.params.userId;
    const token=req.cookies.accessToken
    if(!token) return res.status(401).json("not logged in!")
    jwt.verify(token,'secretKey',(err,userInfo)=>{
        if(err) return res.status(403).json('token is not valid')
    const q="update users SET `name`=?,`cityname`=?,`website`=?,`profilepi`=?,`coverpi`=? where id=?"

    db.query(q,[
req.body.name,
req.body.city,
        req.body.website,
        req.body.profilePic,
        req.body.coverPic,
        userInfo.id
    ],(err,data)=>{
        if(err) res.status(400).json(err)
        if(data?.affectedRows>0) return res.json("updated")
        return res.status(403).json("you have update only your post")
    }
    )
})
}
    