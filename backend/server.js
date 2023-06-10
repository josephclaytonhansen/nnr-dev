import express from 'express'
//import routes
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
dotenv.config()
import connectDB from './config/db.js'
import passport from 'passport'
import passportLocal from 'passport-local'
import {notFound, errorHandler} from "./middleware/errorHandler.js"
import recipeRoutes from "./routes/recipeRoutes.js"

const port = process.env.PORT || 5000

const app = express()
connectDB()


/* const helmet = require('helmet')
app.use(helmet())
app.disable('x-powered-by') */

// Body parser middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Cookie parser middleware
app.use(cookieParser())


app.use("/api/recipes", recipeRoutes)

app.use(function(req, res, next) {  
    res.header('Access-Control-Allow-Origin', req.headers.origin)
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

app.get("/", (req, res) => {
    res.send("API is running")
})

app.use(notFound)
app.use(errorHandler)


app.listen(port, () => {console.log(`Server running on port ${port}`)})
