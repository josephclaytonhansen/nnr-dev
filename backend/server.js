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
import staticServe from 'serve-static'
import cors from 'cors'

import fs from 'fs'
import http from 'http'
import https from 'https'

var privateKey  = fs.readFileSync('selfsigned.key', 'utf8')
var certificate = fs.readFileSync('selfsigned.crt', 'utf8')

var credentials = {key: privateKey, cert: certificate}

import session from 'express-session'
import MongoStore from 'connect-mongo'

const app = express()
connectDB()

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  secure: false,
  store: new MongoStore({mongoUrl: process.env.MONGO_URI}),
  cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      expires: 1000 * 60 * 60 * 24 * 7, // 1 week
      secure: false,
      sameSite: 'none',
      path: '/',
  },
}))

// Used for setting up your static site
app.use(staticServe('_domain', {'index': ['index.html', 'index.html']}))

// Read the link below about express behind a proxy
app.set('trust proxy', true)
app.set('trust proxy', 'loopback')



import recipeRoutes from "./routes/recipeRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import commentRoutes from "./routes/commentRoutes.js"

import {Strategy as LocalStrategy} from 'passport-local'
import User from './models/userModel.js'

import { COOKIE_OPTIONS } from './config/authenticate.js'


const corsOptions = {
  origin:'https://nonsensefreerecipes.com',
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

const recipesLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 200,
	standardHeaders: true,
	legacyHeaders: false,
})

const usersLimiter = rateLimit({
  windowMs: 30 * 60 * 1000,
  max: 210,
  standardHeaders: true,
  legacyHeaders: false,
})

const loginLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
})

const commentLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 500,
  standardHeaders: true,
  legacyHeaders: false,
})

if (process.env.NODE_ENV === 'production') {
  app.use('/api/recipes', recipesLimiter)
  app.use('/api/users', usersLimiter)
  app.use('/api/users/login', loginLimiter)
  app.use('/api/users/register', loginLimiter)
  app.use('/api/comments', commentLimiter)
}

import helmet from 'helmet'
app.use(helmet())


app.disable('x-powered-by')

//Cookie parser middleware
app.use(cookieParser(process.env.COOKIE_SECRET))

app.use(function(req, res, next) {
  if (process.env.NODE_ENV === 'production') {
  console.log("\nRate limit remaining: ", req.rateLimit.remaining, "\nTo path:",  req.path)
  } else {
    console.log(req.path)
  }
  res.header('Access-Control-Allow-Origin', 'https://nonsensefreerecipes.com')
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Set-Cookie')
  next()
})

app.get("/", (req, res) => {
  res.set('Access-Control-Allow-Origin', 'https://nonsensefreerecipes.com')
    res.send("API is running")
})


app.use("/api/recipes", recipeRoutes)


app.use("/api/users", userRoutes)

app.use("/api/comments", commentRoutes)

app.use(notFound)
app.use(errorHandler)

cron.schedule('*/30 * * * *', () => {
  console.log('\nRemoving authSessions');
  User.find().then(users => {
    users.forEach(user => {
      console.log("Removing authSession for user: ", user.email)
      user.authSession = null
      user.save()
      })
    })
  })


  cron.schedule('0 6 * * *', () => {
    console.log('\nUsers\n')
    User.find().then(users => {
      users.forEach(user => {
        console.log(user)
        })
    })
    console.log('\nRecipes\n')
    Recipe.find().then(recipes => {
      recipes.forEach(recipe => {
        console.log(recipe)
        })
    })
  })

  var httpServer = http.createServer(app)
  var httpsServer = https.createServer(credentials, app)
  
  httpServer.listen(8000)
  httpsServer.listen(8443)

//app.listen(port, () => {console.log(`Server running on port ${port}`)})
