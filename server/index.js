import express from "express";
import dotenv, { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import {createServer} from 'http'
import { ConnectDB } from "./lib/mongoDB.js";
import { initializeSocket } from "./socket/socket.server.js";
import path from "path";

//routes
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import matchRoutes from './routes/matchRoutes.js'
import messageRoutes from './routes/messageRoutes.js'

// dotenv config
dotenv.config();

// app config
const app = express();
const httpServer = createServer(app)
const PORT = process.env.PORT || 5000;

//deployment code
const __dirname = path.resolve();



initializeSocket(httpServer)


//middlewares
app.use(express.json({limit: '60mb'}));
app.use(express.urlencoded({extended: true, limit: '60mb'}))
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,

}))
app.use(cookieParser())


// database config
ConnectDB();



// routes
app.get("/", async (req, res) => res.send("testing with vercel deployment"))
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/matches", matchRoutes)
app.use("/api/messages", messageRoutes)

//deployment code
if(process.env.NODE_ENV == 'production'){
    app.use(express.static(path.join(__dirname, '../client/dist')))

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client/dist/index.html'))
    })
}


//server listen
httpServer.listen(PORT, () => {
    console.log(`server running on the port ${PORT}`)
})
