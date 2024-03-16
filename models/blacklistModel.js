const mongoose =require("mongoose")
const blacklistSchema = mongoose.Schema({
    accessToken:{type:String},
    refreshToken:{type:String}
})
const BlacklistModel = mongoose.model("blacklistuser",blacklistSchema)
module.exports={BlacklistModel}