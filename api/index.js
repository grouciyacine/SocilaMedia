import express from 'express'
import userRoutes from './routes/users.js'
import authRoutes from './routes/auth.js'
import commentsRoutes from './routes/comments.js'
import likesRoutes from './routes/likes.js'
import postRouter from './routes/posts.js'
import storiesRouter from './routes/stories.js' 
import relationshipsRouter from './routes/relationships.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import multer from 'multer'


const app=express()
//middleware

app.use((req,res,next)=>{
res.header("Access-Control-Allow-Credentials",true)
next()
})
app.use(cors({
    origin:"http://localhost:3000"
}))
app.use(express.json())
app.use(cookieParser())

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'../client/public/upload')
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+file.originalname)
    }
    
})

const upload =multer({storage:storage})

app.post("/api/upload",upload.single("file"),(req,res)=>{
    const file=req.file;
    res.status(200).json(file.filename)
})

app.use('/api/users',userRoutes)
app.use('/api/auth',authRoutes)
app.use('/api/comments',commentsRoutes)
app.use('/api/likes',likesRoutes)
app.use('/api/users',userRoutes)
app.use('/api/post',postRouter)
app.use('/api/relationships',relationshipsRouter)

app.listen(8800,()=>{
    console.log("API Work")
})