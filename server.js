import express from "express"
import routes from "./routes/routes.js"
import dotenv from "dotenv"
import cors from "cors"
import connectDatabase from "./config/db.js"
import session from "express-session"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.set("trust proxy", 1)

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        // secure: true,
        // sameSite: 'none'
    }
}))

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

connectDatabase()

app.use(express.json())
app.use("/api", routes)

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})