const express = require("express")
const userpostsRouter = express.Router()
const {UserPostsModel} =require("../models/userPosts")
const {auth} = require ("../middleware/Authmiddleware")
userpostsRouter.use(auth)

userpostsRouter.get("/",async(req,res)=>{
    try {
        const userPost = await UserPostsModel.find()
        // res.json(userPost)
        res.status(200).send({ msg: "All userposts", data: userPost });
    } catch (error) {
      res.status(404).send({ msg: error.message });
        
    }
})
userpostsRouter.post("/posts",async(req,res)=>{
  
    try {
        const { textContent } = req.body;
        const post = new UserPostsModel({ textContent });
        await post.save()
        res.status(201).json({msg:"Post Added.."});
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
})


userpostsRouter.patch('/update/:post_id', async(req, res) => {
    


    try {
        const { post_id } = req.params;
        const userId = req.userId;
        const post = await UserPostsModel.findOne({ _id: post_id });
        if (post.userId === userId) {
          await UserPostsModel.findByIdAndUpdate({ _id: post_id }, req.body);
          res.status(200).send({ msg: "post updated successfully" });
        } else {
          res
            .status(200)
            .send({ msg: `You are not authorized to update this post` });
        }
      } catch (error) {
        res.status(404).send({ msg: error.message });
      }
    
});


userpostsRouter.delete("/delete/:post_id", async (req, res) => {
    try {
      const { post_id } = req.params;
      const userId = req.userId;
      const post = await UserPostsModel.findOne({ _id: post_id });
      if (userId === post.userId) {
        await UserPostsModel.findByIdAndDelete({ _id: post_id });
        res.status(200).send({ msg: "post deleted successfully" });
      } else {
        res
          .status(200)
          .send({ msg: `You are not authorized to delete this post` });
      }
    } catch (error) {
      res.status(404).send({ msg: error.message });
    }
  });
module.exports = {userpostsRouter}