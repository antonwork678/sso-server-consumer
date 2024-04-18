require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const errorMiddleware = require('./middlewares/errorMiddleware')
const oathRouter = require('./routers/oathRouter')
const dbService = require("./services/BDService")
const session = require("express-session")
const redisStore = require('./utils/redis')

const app = express()

const PORT = process.env.PORT || 5000

app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))
app.use(express.json())
app.use(cookieParser())
app.use(
    session({
        store: redisStore,
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false,
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 3,
        }
    })
)

app.use('/oath', oathRouter)

app.use(errorMiddleware)

async function start() {
    try {
        await dbService.Init(process.env.MONGO_URI)

        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
    } catch(e) {
        console.log('Server error', e.message)
        process.exit(1)
    }
}


start()