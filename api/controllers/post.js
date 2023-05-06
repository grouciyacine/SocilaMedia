import jwt from 'jsonwebtoken'
import moment from 'moment/moment.js'
import {db} from '../connect.js'

export const getAllPost=(req,res)=>{
    const userId=req.query.userId
    const token=req.cookies.accessToken
    if(!token) return res.status(401).json("not logged in!")
    jwt.verify(token,'secretKey',(err,userInfo)=>{
        if(err) return res.status(403).json('token is not valid')
        const q=`SELECT p.*,u.id AS userid , name , profilepi FROM post AS p JOIN users AS u ON (u.id=p.userId) 
    LEFT  JOIN relationshipe AS r ON (p.userId = r.floweruserid) WHERE r.floweduserid=? OR p.userId=? 
    ORDER BY p.createdAt DESC`
db.query(q,[userInfo.id,userInfo.id],(err,data)=>{
    if(err) return res.status(500).json(err)
    return res.status(200).json(data)
})
}) 
}
export const getPost=(req,res)=>{
    const userId=req.query.userId
    const token=req.cookies.accessToken
    if(!token) return res.status(401).json("not logged in!")
    jwt.verify(token,'secretKey',(err,userInfo)=>{
        if(err) return res.status(403).json('token is not valid')
    
        const q= userId!=="undefined" ? `SELECT p.*,u.id AS userid , name , profilepi FROM post AS p JOIN users AS u ON (u.id=p.userid) where p.userid=? ORDER BY p.createdAt DESC  ` 
        :`SELECT p.*,u.id AS userid , name , profilepi FROM post AS p JOIN users AS u ON (u.id=p.userid) 
    LEFT JOIN relationshipe AS r ON (p.userid = r.floweduserid) WHERE r.floweruserid=? OR p.userid=? 
    ORDER BY p.createdAt DESC`
const values= userId!=="undefined" ? [userId] : [userInfo.id,userInfo.id]
db.query(q,[values],(err,data)=>{
    if(err) return res.status(500).json(err)
    return res.status(200).json(data)
})

    })

}
export const addPost=(req,res)=>{
    const token=req.cookies.accessToken
    if(!token) return res.status(401).json("not logged in!")
    jwt.verify(token,'secretKey',(err,userInfo)=>{
        if(err) return res.status(403).json('token is not valid')
    
        const q="INSERT INTO post (`desc`,`img`,`createdAt`,`userid`) VALUES (?)";
        const values=[req.body.desc,req.body.img,moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),userInfo.id] 

db.query(q,[values],(err,data)=>{
    if(err) return res.status(500).json(err)
    return res.status(200).json('post has been created')
})

    })

}