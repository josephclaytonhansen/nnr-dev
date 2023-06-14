import express from 'express'
//import routes
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
dotenv.config()
import connectDB from './config/db.js'
import passport from 'passport'
import {notFound, errorHandler} from "./middleware/errorHandler.js"
import recipeRoutes from "./routes/recipeRoutes.js"
import cors from 'cors'


const port = process.env.PORT || 8080

const app = express()
connectDB()

const corsOptions = {
    origin:' *',
    credentials: true,
    optionSuccessStatus: 200
}

app.use(cors(corsOptions))
app.options('*', cors(corsOptions))

import rateLimit from 'express-rate-limit'

const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

// Apply the rate limiting middleware to API calls only
app.use('/api', apiLimiter)

/* const helmet = require('helmet')
app.use(helmet())
 */

app.disable('x-powered-by')

// Body parser middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Cookie parser middleware
app.use(cookieParser())

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  next()
})

app.get("/", (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
    res.send("API is running")
})

app.use("/api/recipes", recipeRoutes)



app.post("/api/users/register", passport.authenticate('local-signup'), (req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*')
    res.json({
        user: req.user
    })
})

app.post(
    "/api/users/login",
    passport.authenticate('local-login'),
    (req, res, next) => {
      // login
      jwt.sign({user: req.user}, process.env.JWT_SECRET, {expiresIn: '1h'}, (err, token) => {
        if(err) {
          return res.json({
            message: "Failed to login",
            token: null,
          });
        }
        res.json({
          token
        })
      })
    }
   )

//Passport protected routes
//Comment
app.post("/api/comment", passport.authenticate('can-comment'), (req, res, next) => {
    res.json({
        message: "Comment posted"
    })
})

//Create recipe
app.post("/api/recipe", passport.authenticate('can-author'), (req, res, next) => {
  res.json({
      message: "Recipe posted"
  })
})

app.use(notFound)
app.use(errorHandler)


app.listen(port, () => {console.log(`Server running on port ${port}`)})
