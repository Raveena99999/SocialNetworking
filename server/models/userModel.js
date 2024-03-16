const mongoose = require("mongoose")
const userSchema=mongoose.Schema({
    username: {
        type: String,
        // required: true,
      },
      email:{type:String,required:true,unique:true},
      password: {
        type: String,
        // required: true,
      },
    //   bio: String,
    //   profilePictureUrl: String,
})
const UserModel = mongoose.model("user",userSchema)
module.exports = {UserModel}
