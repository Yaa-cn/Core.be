import express from "express"
import routes from "./routes/routes.js"
import dotenv from "dotenv"
import cors from "cors"
import connectDatabase from "./config/db.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())

connectDatabase()

app.use(express.json())
app.use("/api", routes)


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})