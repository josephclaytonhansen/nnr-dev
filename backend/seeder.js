import recipes from "./data/recipes.js"
import Recipe from "./models/recipeModel.js"
import connectDB from "./config/db.js"
import dotenv from "dotenv"
dotenv.config()
connectDB()

const importData = async () => {
    try {
        await Recipe.deleteMany()
        const createdRecipes = await Recipe.insertMany(recipes)
        console.log(createdRecipes)
        process.exit()
        
    } catch (error) {
        console.log(`${error}`)
        process.exit(1)
        
    }
}

const destroyData = async () => {
    try {
        await Recipe.deleteMany()
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