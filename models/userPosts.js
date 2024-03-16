const mongoose = require("mongoose");

const userPostsSchema = mongoose.Schema({
    textContent: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    // userId: { type: String },

}
  
);

const UserPostsModel = mongoose.model("userpost", userPostsSchema);

module.exports = { UserPostsModel };
