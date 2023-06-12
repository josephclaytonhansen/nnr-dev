import express from 'express'
//import routes
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
dotenv.config()
import connectDB from './config/db.js'
import passport from 'passport'
import {notFound, errorHandler} from "./middleware/errorHandler.js"
import recipeRoutes from "./routes/recipeRoutes.js"


const port = process.env.PORT || 5000

const app = express()
connectDB()

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
    res.header('Access-Control-Allow-Origin', req.headers.origin)
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

app.get("/", (req, res) => {
    res.send("API is running")
})

app.use("/api/recipes", recipeRoutes)

app.post("/api/users/register", passport.authenticate('local-signup', {session: false}), (req, res, next) => {
    res.json({
        user: req.user
    })
})

app.post(
    "/api/users/login",
    passport.authenticate('local-login', { session: false }),
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
app.post("/api/comment", passport.authenticate('jwt', {session: false}), (req, res, next) => {
    res.json({
        message: "Comment posted"
    })
})

app.use(notFound)
app.use(errorHandler)


app.listen(port, () => {console.log(`Server running on port ${port}`)})
