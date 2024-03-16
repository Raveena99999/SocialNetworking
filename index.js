const express = require("express")
const app=express()
const dotenv = require("dotenv")
dotenv.config()
const port =process.env.PORT
const {connection} = require("./database/db")
const cookieParser = require("cookie-parser")
const {userRouter} =require("./routes/userRoute")
const {userprofileRouter} = require("./routes/userProfileRoute")
const {userpostsRouter} = require("./routes/userPostsRoute")
const cors = require("cors");

app.use(express.json())
app.use(cookieParser())
app.use(
    cors({
        origin: "http://127.0.0.1:5173",
        credentials: true,
        httpOnly: true,
    })
    );
    
    app.use("/userpost",userpostsRouter)
app.use("/user",userRouter)
app.use("/userprofile",userprofileRouter)
app.get("/",(req,res)=>{
    res.send("home page")
})
app.listen(port,async()=>{
    try {
        await connection
        console.log(`express server is running on port${port} and mongoose also connected`)

    } catch (error) {
        console.log(error)
    }
})