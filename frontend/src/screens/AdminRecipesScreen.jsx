import React from "react"
import { useGetRecipesQuery, useGetRandomRecipeQuery, useGetRecipesByMealQuery,
useGetRecipesByAuthorQuery, useGetRecipesByCuisineQuery, useGetRecipesByIngredientQuery,
useGetRecipesByTagQuery, useGetRecipesVegetarianQuery, useGetRecipesGlutenFreeQuery} from "../slices/recipesApiSlice"
import ReactMarkdown from "react-markdown"
import {Table, Row, Col, Container, ListGroup } from "react-bootstrap"
import remarkGfm from "remark-gfm"
import {Link} from "react-router-dom"

const AdminRecipesListScreen = () => {
    const {data: recipes, isLoading: loadingRecipes, error: errorRecipes} = useGetRecipesQuery()
    const {data: randomRecipe, isLoading: loadingRandomRecipe, error: errorRandomRecipe} = useGetRandomRecipeQuery()
    const {data: breakfast, isLoading: loadingBreakfast, error: errorBreakfast} = useGetRecipesByMealQuery("breakfast")
    const {data: lunch, isLoading: loadingLunch, error: errorLunch} = useGetRecipesByMealQuery("lunch")
    const {data: dinner, isLoading: loadingDinner, error: errorDinner} = useGetRecipesByMealQuery("dinner")
    const {data: dessert, isLoading: loadingDessert, error: errorDessert} = useGetRecipesByMealQuery("dessert")
    const {data: author, isLoading: loadingAuthor, error: errorAuthor} = useGetRecipesByAuthorQuery("60d5f0b4e6c9c9b9b0f3e0b1")
    const {data: cuisine, isLoading: loadingCuisine, error: errorCuisine} = useGetRecipesByCuisineQuery("american")
    const {data: tag, isLoading: loadingSource, error: errorSource} = useGetRecipesByTagQuery("pumpkin")
    const {data: vegetarian, isLoading: loadingVegetarian, error: errorVegetarian} = useGetRecipesVegetarianQuery(true)
    const {data: glutenFree, isLoading: loadingGlutenFree, error: errorGlutenFree} = useGetRecipesGlutenFreeQuery(true)
    const {data: ingredient, isLoading: loadingIngredient, error: errorIngredient} = useGetRecipesByIngredientQuery("eggs")
    return(
        <Container>
            <Row>
                <Col>
            <h1>Recipes</h1>
            <h2>All Recipes</h2>
            <Table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>CONTENT</th>
                        </tr>
                </thead>
                <tbody>
                    {recipes && (recipes.map((recipe) => (
                        <tr key={recipe._id}>
                            <td>{recipe._id}</td>
                            <td><Link to={`/recipes/id/${recipe._id}`}>{recipe.name}</Link></td>
                            <td>{<ReactMarkdown children={recipe.content} remarkPlugins={[remarkGfm]}></ReactMarkdown>}</td>
                        </tr>
                        
                    )))}
                    </tbody>
            </Table>
            <h2>Random Recipe</h2>
            {randomRecipe && (
                <div>
                    <p><Link to={`/recipes/${randomRecipe.slug}`}>{randomRecipe.name}</Link></p>
                </div>
            )}
            </Col>
            </Row>
            <Row>
                <Col md = {3}>
            <h2>Breakfast</h2>
            {breakfast && (breakfast.map((recipe) => (
                <div key={recipe._id}>
                    <p><Link to={`/recipes/${recipe.slug}`}>{recipe.name}</Link></p>
                </div>
            )))}
                </Col>
                <Col md = {3}>
            <h2>Lunch</h2>
            {lunch && (lunch.map((recipe) => (
                <div key={recipe._id}>
                    <p><Link to={`/recipes/${recipe.slug}`}>{recipe.name}</Link></p>
                </div>
            )))}
                </Col>
                <Col md = {3}>
            <h2>Dinner</h2>
            {dinner && (dinner.map((recipe) => (
                <div key={recipe._id}>
                    <p><Link to={`/recipes/${recipe.slug}`}>{recipe.name}</Link></p>
                </div>
            )))}
                </Col>
                <Col md = {3}>
            <h2>Dessert</h2>
            {dessert && (dessert.map((recipe) => (
                <div key={recipe._id}>
                    <p><Link to={`/recipes/${recipe.slug}`}>{recipe.name}</Link></p>
                </div>
            )))}
                </Col>
            </Row>
            <Row>
                <Col md = {3}>
            <h2>Author: SAMPLE</h2>
            {author && (author.map((recipe) => (
                <ListGroup variant="flush">
                <ListGroup.Item key={recipe._id}><Link to={`/recipes/${recipe.slug}`}>{recipe.name}</Link></ListGroup.Item>
                </ListGroup>
            )))}
                </Col>
                <Col md = {3}>
            <h2>Cuisine: American</h2>
            {cuisine && (cuisine.map((recipe) => (
                <ListGroup variant="flush">
                <ListGroup.Item key={recipe._id}><Link to={`/recipes/${recipe.slug}`}>{recipe.name}</Link></ListGroup.Item>
                </ListGroup>
            )))}
                </Col>
                <Col md = {3}>
            <h2>Tag: pumpkin</h2>
            {tag && (tag.map((recipe) => (
                 <ListGroup variant="flush">
                 <ListGroup.Item key={recipe._id}><Link to={`/recipes/${recipe.slug}`}>{recipe.name}</Link></ListGroup.Item>
                 </ListGroup>
            )))}
                </Col>
                <Col md = {3}>
            <h2>Gluten Free</h2>
            {glutenFree && (glutenFree.map((recipe) => (
                 <ListGroup variant="flush">
                 <ListGroup.Item key={recipe._id}><Link to={`/recipes/${recipe.slug}`}>{recipe.name}</Link></ListGroup.Item>
                 </ListGroup>
            )))}
                </Col>
                <Col md = {3}>
            <h2>Vegetarian</h2>
            {vegetarian && (vegetarian.map((recipe) => (
                 <ListGroup variant="flush">
                 <ListGroup.Item key={recipe._id}><Link to={`/recipes/${recipe.slug}`}>{recipe.name}</Link></ListGroup.Item>
                 </ListGroup>
            )))}
                </Col>
                <Col md = {3}>
            <h2>Ingredient: eggs</h2>
            {ingredient && (ingredient.map((recipe) => (
                 <ListGroup variant="flush">
                 <ListGroup.Item key={recipe._id}><Link to={`/recipes/${recipe.slug}`}>{recipe.name}</Link></ListGroup.Item>
                 </ListGroup>
            )))}
                </Col>


            </Row>
        </Container>
    )
}

export default AdminRecipesListScreen