import express from "express";
import dotenv, { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

//routes
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import matchRoutes from './routes/matchRoutes.js'
import messageRoutes from './routes/messageRoutes.js'
import { ConnectDB } from "./lib/mongoDB.js";

// dotenv config
dotenv.config();

// app config
const app = express();
const PORT = process.env.PORT || 5000;


//middlewares
app.use(express.json({limit: '60mb'}));
app.use(express.urlencoded({extended: true, limit: '60mb'}))
app.use(cors())
app.use(cookieParser())


// database config
ConnectDB();



// routes
app.use("api/auth", authRoutes)
app.use("api/users", userRoutes)
app.use("api/matches", matchRoutes)
app.use("api/messages", messageRoutes)


//server listen
app.listen(PORT, () => {
    console.log(`server running on the port ${PORT}`)
})
