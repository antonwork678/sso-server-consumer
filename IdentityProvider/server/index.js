require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const errorMiddleware = require('./middlewares/errorMiddleware')
const authRouter = require('./routers/authRouter')
const dbService = require("./services/BDService")
const session = require("express-session")
const IORedis = require("ioredis")
const RedisStore = require("connect-redis").default

const redisClient = new IORedis(process.env.REDIS_URL || "redis://127.0.0.1:6379")
const redisStore = new RedisStore({ client: redisClient })

const app = express()

const PORT = process.env.PORT || 5000

app.use(cors({
    credentials: true,
    origin: function(origin, callback) {
        return callback(null, true)
    }
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

app.use('/auth', authRouter)
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