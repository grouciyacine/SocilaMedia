import {db} from '../connect.js'
import jwt from 'jsonwebtoken'
export const getLikes=(req,res)=>{
const q="SELECT userid FROM likes WHERE postid=? "
db.query(q,[req.query.postid],(err,data)=>{
    if(err) return res.status(200).json(err)
    return res.status(200).json(data?.map(like=>like.userid))
})
}

export const addLikes=(req,res)=>{
    const token=req.cookies.accessToken
    if(!token) return res.status(401).json("not logged in!")
    jwt.verify(token,'secretKey',(err,userInfo)=>{
        if(err) return res.status(403).json('token is not valid')
    
        const q="INSERT INTO likes(`userid`,`postid`) VALUES (?)";
        const values=[userInfo.id,req.query.postid] 

db.query(q,[values],(err,data)=>{
    if(err) return res.status(500).json(err)
    return res.status(200).json('like has been created')
})

    })

}
export const deleteLikes=(req,res)=>{
    console.log('work')
    const token=req.cookies.accessToken
    if(!token) return res.status(401).json("not logged in!")
    jwt.verify(token,'secretKey',(err,userInfo)=>{
        if(err) return res.status(403).json('token is not valid')
    
        const q="DELETE  FROM likes WHERE `userid` = ? AND `postid` = ?";

db.query(q,[userInfo.id,req.query.postid],(err,data)=>{
    if(err) return res.status(500).json(err)
    return res.status(200).json('like has been desliked')
})

    })

}