const mongoose = require("mongoose");

const userProfileSchema = mongoose.Schema(
  {
    username: { type: String, required: true },
    bio: { type: String, required: true },
    // userId: { type: Number, required: true },
    profilePictureUrl: {type:String}
  },
  {
    versionKey: false,
  }
);

const UserProfileModel = mongoose.model("userprofile", userProfileSchema);

module.exports = { UserProfileModel };
