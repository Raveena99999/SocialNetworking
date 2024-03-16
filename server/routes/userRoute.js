const express= require("express")
const userRouter = express.Router()
const {UserModel} =require("../models/userModel")
const bcrypt = require("bcrypt");
const accessTokenKey = process.env.ACCESS_TOKEN_KEY;
const refreshTokenKey = process.env.REFRESH_TOKEN_KEY;
const jwt = require("jsonwebtoken");
const { BlacklistModel } = require("../models/blacklistModel");

userRouter.post("/register",async(req,res)=>{
    try {
        const { password } = req.body;
        console.log(req.body);
        bcrypt.hash(password, 6, async function (err, hash) {
          if (err) {
            res.status(400).send({ msg: err.message });
          } else {
            const user = new UserModel({ ...req.body, password: hash });
            await user.save();
            res.status(200).send({ msg: "You are register successfully" });
          }
        });
      } catch (error) {
        res.send({ err: "error" });
      }
})



userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await UserModel.findOne({ email });
      if (user) {
        const isPasswordCorrect = await bcrypt.compare(password, user.password);       
  if(isPasswordCorrect){
    var accessToken = jwt.sign({ email: user.email, userId: user._id }, accessTokenKey, {
        expiresIn: "1h",
      });
      var refreshToken = jwt.sign(
        { email:user.email, userId: user._id },
        refreshTokenKey,
        {
          expiresIn: "7d",
        }
      );
      res.cookie("accessToken", accessToken,{httpOnly:true,sameSite:"none",secure:true});
      res.cookie("refreshToken", refreshToken,{httpOnly:true,sameSite:"none",secure:true});
      res.status(200).send({
        msg: "Login Successful",
      });
  
  }
  else{
    throw new Error("Incorrect password")
  }
 
      }
      else{
        res.status(400).send({msg:"user not found"})
      }
    } catch (error) {
      res.status(500).send({ err:error.message });
    }
  });


  userRouter.get("/logout",async(req,res)=>{
    try {
      const accessToken = req.cookies["accessToken"]
      const refreshToken = req.cookies["refreshToken"]
      const blacklist = new BlacklistModel({
        accessToken,refreshToken
      })
      await blacklist.save()
      res.status(200).send({msg:"you logged out successfully"})
      
    } catch (error) {
      console.log({error:error.message})
    }
   
  })

  module.exports = {userRouter}