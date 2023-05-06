import express from 'express'
import { getPost,addPost, getAllPost } from '../controllers/post.js'
const router=express.Router()
router.get("/",getPost)
router.post("/",addPost)
router.get('/all',getAllPost)
export default router