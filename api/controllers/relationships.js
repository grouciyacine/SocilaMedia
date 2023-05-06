import {db} from '../connect.js'
import jwt from 'jsonwebtoken'
export const getRelationships=(req,res)=>{
const q="SELECT floweruserid FROM relationshipe WHERE floweduserid=? "
db.query(q,[req.query.followedUserId],(err,data)=>{
    if(err) return res.status(200).json(err)
    return res.status(200).json(data?.map(relationship=>relationship.floweruserid))
})
}

export const addRelationships=(req,res)=>{
    const token=req.cookies.accessToken
    if(!token) return res.status(401).json("not logged in!")
    jwt.verify(token,'secretKey',(err,userInfo)=>{
        if(err) return res.status(403).json('token is not valid')
    
        const q="INSERT INTO relationshipe (`floweruserid`,`floweduserid`) VALUES (?)";
        const values=[userInfo.id,req.body.userId] 

db.query(q,[values],(err,data)=>{
    if(err) return res.status(500).json(err)
    return res.status(200).json('following has been created')
})

    })

}
export const deleteRelationships=(req,res)=>{
    console.log('work')
    const token=req.cookies.accessToken
    if(!token) return res.status(401).json("not logged in!")
    jwt.verify(token,'secretKey',(err,userInfo)=>{
        if(err) return res.status(403).json('token is not valid')
    
        const q="DELETE  FROM relationshipe WHERE `floweruserid` = ? AND `floweduserid` = ?";

db.query(q,[userInfo.id,req.query.userId],(err,data)=>{
    if(err) return res.status(500).json(err)
    return res.status(200).json('like has been desliked')
})

    })

}