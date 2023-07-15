import express from 'express'
//import routes
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
dotenv.config()
import connectDB from './config/db.js'
import passport from 'passport'
import {notFound, errorHandler} from "./middleware/errorHandler.js"
import cron from 'node-cron'

import cors from 'cors'

import session from 'express-session'
import MongoStore from 'connect-mongo'

const app = express()
connectDB()

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  secure: process.env.NODE_ENV === 'production',
  store: new MongoStore({mongoUrl: process.env.MONGO_URI}),
  cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      expires: 1000 * 60 * 60 * 24 * 7, // 1 week
      secure: false,
      sameSite: 'none',
      path: '/',
  },
}))

import recipeRoutes from "./routes/recipeRoutes.js"
import userRoutes from "./routes/userRoutes.js"

import {Strategy as LocalStrategy} from 'passport-local'
import User from './models/userModel.js'

import { COOKIE_OPTIONS } from './config/authenticate.js'


const corsOptions = {
  origin:'http://localhost:3000',
  credentials: true,
  optionSuccessStatus: 200
}

app.use(cors(corsOptions))
app.options('*', cors(corsOptions))

const port = process.env.PORT || 8000

const localStrategy = new LocalStrategy(
    {usernameField: 'email',
    passwordField: 'password',
    },
    function(username, password, done) {
      User.findOne({email: username}).then(user => {
        return done(null, user)
      }).catch(err => console.log(err))

    }
    
)

// Body parser middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))


passport.use('local', localStrategy)

app.use(passport.initialize())
app.use(passport.session())

import rateLimit from 'express-rate-limit'

const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 300, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
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
  console.log(req.rateLimit, req.path)
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Set-Cookie')
  next()
})

app.get("/", (req, res) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.send("API is running")
})


app.use("/api/recipes", recipeRoutes)


app.use("/api/users", userRoutes)

app.use(notFound)
app.use(errorHandler)

cron.schedule('*/30 * * * *', () => {
  console.log('Removing authSessions');
  User.find().then(users => {
    users.forEach(user => {
      console.log("Removing authSession for user: ", user.email)
      user.authSession = null
      user.save()
      })
    })
  })



app.listen(port, () => {console.log(`Server running on port ${port}`)})
