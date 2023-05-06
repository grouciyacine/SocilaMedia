import { db } from "../connect.js"  
import jwt from 'jsonwebtoken'
import moment from 'moment'

export const getComments=(req,res)=>{
const q=`SELECT c.*,u.id AS userId,name,profilepi FROM comments AS c JOIN users AS u 
ON (c.userid=u.id) WHERE c.posid=?  ORDER BY c.creatat DESC`
db.query(q,[req.query.postid],(err,data)=>{
    if(err) return res.status(500).json(err)
    return res.status(200).json(data)
})
}

export const addComments=(req,res)=>{
    const token=req.cookies.accessToken
    if(!token) return res.status(401).json("not logged in!")
    jwt.verify(token,'secretKey',(err,userInfo)=>{
        if(err) return res.status(403).json('token is not valid')
        const q="INSERT INTO comments(`description`,`creatat`,`userid`,`posid`) VALUES (?)";
        const values=[req.body.desc,moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),userInfo.id,req.body.posid] 
db.query(q,[values],(err,data)=>{
    if(err) return res.status(500).json(err)
    return res.status(200).json('comment has been created')
})
})
}
//1h:35