import recipes from "./data/recipes.js"
import Recipe from "./models/recipeModel.js"
import User from "./models/userModel.js"
import users from "./data/users.js"
import connectDB from "./config/db.js"
import dotenv from "dotenv"
dotenv.config()
connectDB()

const importData = async () => {
    try {
        await Recipe.deleteMany()
        await User.deleteMany()
        const createdRecipes = await Recipe.insertMany(recipes)
        const createdUsers = await User.insertMany(users)
        console.log(createdRecipes)
        console.log(createdUsers)
        process.exit()
        
    } catch (error) {
        console.log(`${error}`)
        process.exit(1)
        
    }
}

const destroyData = async () => {
    try {
        await Recipe.deleteMany()
        await User.deleteMany()
        process.exit()
        
    } catch (error) {
        console.log(`${error}`)
        process.exit(1)
        
    }       
}

if (process.argv[2] === "-d") {
    destroyData()
} else {
    importData()
}