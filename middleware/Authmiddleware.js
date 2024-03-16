const accessTokenKey = process.env.ACCESS_TOKEN_KEY;
const refreshTokenKey = process.env.REFRESH_TOKEN_KEY;
const jwt = require("jsonwebtoken");
const {BlacklistModel} = require("../models/blacklistModel")
const auth = async (req, res, next) => {
    try {
        const {accessToken, refreshToken} = req.cookies
        const blackListedToken = await BlacklistModel.findOne({accessToken})
        if(blackListedToken){
            res.status(404).send({msg:"Please Login Again"})
        }else{
            jwt.verify(accessToken, accessTokenKey, function(err, decoded) {
                if(decoded){
                    next();
                }else{
                    jwt.verify(refreshToken, refreshTokenKey, function(err, decoded) {
                        if(decoded){
                            jwt.sign({ email: decoded.email, userId: decoded.userId }, accessTokenKey, { expiresIn: "1h" }, function(err, token) {
                                if(token){
                                    res.cookie("accessToken", accessToken,{ httpOnly: true,
                                        secure: true,
                                        sameSite: "none",});
                                    next()
                                }else{
                                    res.status(500).send({msg:err.message})
                                }
                              });
                        }else{
                            res.status(404).send({msg:`Please Login Again`})
                        }
                      });
                }
              });
        }
    } catch (error) {
        console.log({err: error.message});
    }
  };
  
  module.exports = { auth };
  