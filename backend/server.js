import express from 'express'
//import routes
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
dotenv.config()
import connectDB from './config/db.js'
import passport from 'passport'
import {notFound, errorHandler} from "./middleware/errorHandler.js"
import recipeRoutes from "./routes/recipeRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import cors from 'cors'

import session from 'express-session'
import MongoStore from 'connect-mongo'

import {Strategy as LocalStrategy} from 'passport-local'
import User from './models/userModel.js'


const corsOptions = {
  origin:' *',
  credentials: true,
  optionSuccessStatus: 200
}

const app = express()
connectDB()

app.use(cors(corsOptions))
app.options('*', cors(corsOptions))

const port = process.env.PORT || 8000

const localStrategy = new LocalStrategy(
    {usernameField: 'email',
    passwordField: 'password'},
    User.authenticate()
)

// Body parser middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({mongoUrl: process.env.MONGO_URI}),
}))

app.use(passport.initialize())
passport.use('local', localStrategy)
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
app.use(passport.session())

import rateLimit from 'express-rate-limit'

const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

// Apply the rate limiting middleware to API calls only
app.use('/api', apiLimiter)

import helmet from 'helmet'
app.use(helmet())


app.disable('x-powered-by')

//Cookie parser middleware
app.use(cookieParser(process.env.COOKIE_SECRET))

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  next()
})

app.get("/", (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
    res.send("API is running")
})


app.use("/api/recipes", recipeRoutes)

app.post('api/users/register', function (req, res) {
  res.header('Access-Control-Allow-Origin', '*')
  User.register(
    new User({ 
      email: req.body.email, 
      username: req.body.email 
    }), req.body.password, function (err, msg) {
      if (err) {
        res.send(err)
      } else {
        res.send({ message: "Successful" })
      }
    }
  )
})

app.use(notFound)
app.use(errorHandler)


app.listen(port, () => {console.log(`Server running on port ${port}`)})
