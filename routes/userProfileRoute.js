const express =require("express") 
const {UserProfileModel} = require("../models/userProfileModel")
const userprofileRouter=express.Router()
const {auth} =require("../middleware/Authmiddleware")
userprofileRouter.use(auth)
userprofileRouter.get("/",async(req,res)=>{
    try {
        const userProfile = await UserProfileModel.find()
        res.status(200).send({ msg: "All userdetails", data: userProfile });
    } catch (error) {
      res.status(404).send({ msg: error.message });
        
    }
})


userprofileRouter.post("/add", async (req, res) => {
    try {
    
    const { userId, username, ...rest } = req.body;

    if (!userId || !username) {
      return res.status(400).send({ msg: "userId and username are required" });
    }

    const userProfile = new UserProfileModel({ ...rest, userId, username });
    await userProfile.save();
    res.status(200).send({ msg: "userprofile added successfully" });
    } catch (error) {
      res.status(404).send({ msg: error.message });
    }
  });

  userprofileRouter.patch("/update/:userprofile_id", async (req, res) => {
    try {
   
    const { userprofile_id } = req.params;
    const userId = req.userId;
    
    console.log("userId from request:", userId);

    const userprofile = await UserProfileModel.findOne({ _id: userprofile_id });
    
    console.log("userId from userprofile:", userprofile.userId);

    if (userprofile.userId === userId) {
        await UserProfileModel.findByIdAndUpdate(userprofile_id, req.body);
        res.status(200).send({ msg: "userprofile updated successfully" });
    } else {
        res.status(403).send({ msg: `You are not authorized to update this userprofile` });
    }
    } catch (error) {
      res.status(404).send({ msg: error.message });
    }
  });

  userprofileRouter.delete("/delete/:userprofile_id", async (req, res) => {
    try {
      const { userprofile_id } = req.params;
      const userId = req.userId;
      const userprofile = await UserProfileModel.findOne({ _id: userprofile_id });
      if (userprofile.userId === userId) {
        await UserProfileModel.findByIdAndDelete({ _id: userprofile_id  }, req.body);
        res.status(200).send({ msg: "userprofile deleted successfully" });
      } else {
        res
          .status(200)
          .send({ msg: `You are not authorized to delete this userprofile` });
      }
    } catch (error) {
      res.status(404).send({ msg: error.message });
    }
  });

module.exports={userprofileRouter}