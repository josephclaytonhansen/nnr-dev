import { Link } from 'react-router-dom'
import {ListGroup, Row, Col, InputGroup, Form, Container, Badge, FormGroup, FormControl, Button, Image, Modal} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faCheck, faFlag, faClock, faStar } from '@fortawesome/free-solid-svg-icons'
import 'balloon-css'
import GFV from '../GFV'
import '../../css/Recipe.css'
import { toast } from 'react-toastify'
import { useCreateRecipeMutation, useDeleteRecipeMutation, useUpdateRecipeMutation } from '../../slices/recipesApiSlice'
import { useHistory } from 'react-router-dom'
import {useState} from 'react'
import { useEffect } from 'react'

const Internal = ({recipe}) => {

    const history = useHistory()

    const [updateRecipe, {isLoading: loadingUpdateRecipe}] = useUpdateRecipeMutation()
    const [createRecipe, {isLoading: loadingCreateRecipe}] = useCreateRecipeMutation()
    const [deleteRecipe, {isLoading: loadingDeleteRecipe}] = useDeleteRecipeMutation()

    const [modalShow, setModalShow] = useState(false)

    const deleteCommentHandler = async (index) => {
        let temp = [...comments]
        temp.splice(index, 1)
        setComments(temp)
        recipe.comments = comments
    }

    const submitHandler = async(e) => {
        console.log(recipe._id)
        e.preventDefault()
        if(recipe._id){
            try{
                recipe.name = name
                recipe.timeToMake = timeToMake
                recipe.ingredients = ingredients
                recipe.instructions = instructions
                recipe.feeds = feeds
                recipe.image = image
                recipe.content = content
                recipe.meal = meal
                recipe.cuisine = cuisine
                recipe.tags = tags
                recipe.source = source
                recipe.comments = comments

                const res = await updateRecipe({id: recipe._id, data: recipe}).unwrap()
                toast.success("Recipe updated")
            } catch(err){
                toast.error(err?.data?.message || err.error)
            }
        } else {
            try{
                const res = await createRecipe(recipe).unwrap()
                toast.success("Recipe created")
            } catch(err){
                toast.error(err?.data?.message || err.error)
            }
        }
    }

    const deleteHandler = async(e) => {
        e.preventDefault()
        if(recipe._id){
            try{
                const res = await deleteRecipe(recipe._id).unwrap()
                toast.success("Recipe deleted")
                history.push('/')
            } catch(err){
                toast.error(err?.data?.message || err.error)
            }
        }
    }

    const [glutenFree, setGlutenFree] = useState(recipe.isGlutenFree)
    const [vegetarian, setVegetarian] = useState(recipe.isVegetarian)
    const [dogSafe, setDogSafe] = useState(recipe.dogSafe)
    const [name, setName] = useState(recipe.name)
    const [timeToMake, setTimeToMake] = useState(recipe.timeToMake)
    const [ingredients, setIngredients] = useState(recipe.ingredients)
    const [instructions, setInstructions] = useState(recipe.instructions)
    const [feeds, setFeeds] = useState(recipe.feeds)
    const [image, setImage] = useState(recipe.image)
    const [content, setContent] = useState(recipe.content)
    const [meal, setMeal] = useState(recipe.meal)
    const [cuisine, setCuisine] = useState(recipe.cuisine)
    const [tags, setTags] = useState(recipe.tags)
    const [source, setSource] = useState(recipe.source)
    const [comments, setComments] = useState(recipe.comments)


    const toggle = (what) => {
        if (what === 'gluten free' || what === 'not gluten free'){
            setGlutenFree(!glutenFree)
            recipe.isGlutenFree = glutenFree
        } else if (what === 'vegetarian' || what === 'not vegetarian'){
            setVegetarian(!vegetarian)
            recipe.isVegetarian = vegetarian
        } else if (what === 'safe for dogs' || what === 'not safe for dogs'){
            setDogSafe(!dogSafe)
            recipe.dogSafe = dogSafe
        }
    }

    const updateIngredient = (index, field, value) => {
        let temp = [...ingredients]
        temp[index][field] = value
        setIngredients(temp)
        recipe.ingredients = ingredients
    }

    const updateIngredientName = (index, name) => {
        updateIngredient(index, 'name', name)
    }

    const updateIngredientAmount = (index, amount) => {
        updateIngredient(index, 'amount', amount)
    }

    const updateIngredientUnit = (index, unit) => {
        updateIngredient(index, 'unit', unit)
    }

    const addIngredient = (name='', amount='', unit='') => {
        let temp = [...ingredients]
        temp.push({name:name, amount:amount, unit:unit})
        setIngredients(temp)
        recipe.ingredients = ingredients
    }

    const deleteIngredient = (index) => {
        let temp = [...ingredients]
        temp.splice(index, 1)
        setIngredients(temp)
        recipe.ingredients = ingredients
    }

    const updateInstruction = (index, field, value) => {
        let temp = [...instructions]
        temp[index][field] = value
        setInstructions(temp)
        recipe.instructions = instructions
    }

    const updateInstructionName = (index, name) => {
        updateInstruction(index, 'name', name)
    }

    const updateInstructionDetails = (index, details) => {
        updateInstruction(index, 'details', details)
    }

    const addInstruction = (name='', details='') => {
        let temp = [...instructions]
        temp.push({name:name, details:details})
        setInstructions(temp)
        recipe.instructions = instructions
    }

    const deleteInstruction = (index) => {
        let temp = [...instructions]
        temp.splice(index, 1)
        setInstructions(temp)
        recipe.instructions = instructions
    }

    return(
        <Container>
            <Row>
                <Col>
                    <Form onSubmit={submitHandler}>
                        <ListGroup>
                            <ListGroup.Item className = 'list-group-hover'>
                        <Row>
                            <Col lg = {5} sm = {12}>
                                <Form.Group controlId='name'>
                                    <Row className = "justify-content-center align-content-center align-items-center">
                                        <Col lg = {2} md = {4}>
                                        <Form.Label className = 'm-0'><strong>Name</strong></Form.Label>
                                        </Col>
                                        <Col lg = {10} md = {8}>
                                        <Form.Control type='text' placeholder='Enter name' value={name} onChange = {(e) => {setName(e.target.value)}}></Form.Control>
                                        </Col>
                                    </Row>
                                </Form.Group>
                            </Col>
                            <Col lg = {4} sm = {12}>
                                <Form.Group controlId='timeToCook'>
                                    <Row className = "justify-content-center align-content-center align-items-center">
                                        <Col lg = {5} md = {4}>
                                        <Form.Label className = 'm-0'><strong>Time to Make</strong></Form.Label>
                                        </Col>
                                        <Col lg = {7} md = {8}>
                                        <Form.Control type='number' value={timeToMake} onChange = {(e) => {setTimeToMake(e.target.value)}} ></Form.Control>
                                        </Col>
                                    </Row>
                                </Form.Group>
                            </Col>
                            <Col lg = {3} sm = {12}>
                                <GFV fontSize='2rem' recipe={recipe} style={{marginTop:'.5rem'}}  onClicks={toggle} onClicksUse={true}/>
                            </Col>
                        </Row>
                        </ListGroup.Item>
                        <ListGroup.Item className = 'list-group-hover'>
                        <Row className = "my-3 gx-5">
                            <Col lg = {6} md = {12}>
                                <Form.Group controlId='ingredients'>
                                    <Row className = 'my-3'>
                                        <Col sm={12}>  
                                            <Form.Label><h3>Ingredients</h3></Form.Label>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md = {2}>
                                            <Form.Label><strong>Amount</strong></Form.Label>
                                        </Col>
                                        <Col md = {3}>
                                            <Form.Label><strong>Unit</strong></Form.Label>
                                        </Col>
                                        <Col md = {6}>
                                            <Form.Label><strong>Ingredient</strong></Form.Label>
                                        </Col>
                                    </Row>
                                    {ingredients.map((ingredient, index) => (
                                        <Row className='my-1'>
                                        <Col md = {2}>
                                            
                                            <Form.Control type='number' value={ingredient.amount} onChange={(e) => {
                                                updateIngredientAmount(index, e.target.value)
                                            }} ></Form.Control>
                                        </Col>
                                        <Col md = {3}>
                                            <Form.Control type='text' value={ingredient.unit} placeholder='single' onChange={(e) => {
                                                updateIngredientUnit(index, e.target.value)
                                            }} ></Form.Control>
                                        </Col>
                                        <Col md = {6}>
                                            <Form.Control type='text' value={ingredient.name} onChange={(e) => {
                                                updateIngredientName(index, e.target.value)
                                            }}></Form.Control>
                                        </Col>
                                        <Col md = {1}>
                                            <Button variant='danger' onClick={(e) => {deleteIngredient(index)}}><FontAwesomeIcon icon={faTrashAlt}/></Button>
                                        </Col>
                                    </Row>
                                    ))}
                                    
                                </Form.Group>  
                                <Button variant='success' onClick={addIngredient}>Add</Button>                     
                            </Col>
                            <Col lg = {6} md = {12}>
                                <Form.Group controlId='instructions'>
                                    <Row className = 'my-3'>
                                        <Col sm={12}>
                                            <Form.Label><h3>Instructions</h3></Form.Label>
                                        </Col>
                                    </Row>
                                    
                                    <Row>
                                        <Col md = {6}>
                                            <Form.Label><strong>Step</strong></Form.Label>
                                        </Col>
                                        <Col md = {5}>
                                            <Form.Label><strong>Details</strong></Form.Label>
                                        </Col>
                                    </Row>
                                    {instructions.map((instruction, index) => (
                                        <Row className='my-1'>
                                        <Col md = {6}>
                                            <Form.Control type='text' as="textarea" value={instruction.name} onChange={(e) => {
                                                updateInstructionName(index, e.target.value)
                                            }} ></Form.Control>
                                        </Col>
                                        <Col md = {5}>
                                            <Form.Control type='text' as="textarea" value={instruction.details} onChange={(e) => {
                                                updateInstructionDetails(index, e.target.value)
                                            }}></Form.Control>
                                        </Col>
                                        <Col md = {1}>
                                            <Button variant='danger' onClick={(e) => {deleteInstruction(index)}}><FontAwesomeIcon icon={faTrashAlt}/></Button>
                                        </Col>
                                        </Row>
                                    ))}
                                </Form.Group>
                                <Button variant='success' onClick={addInstruction}>Add</Button>
                            </Col>
                        </Row>
                        </ListGroup.Item>
                        <ListGroup.Item className = 'list-group-hover'>
                        <Row className = "my-3 gx-5 gy-2">
                            <Col lg = {2} md = {4} sm = {12}>
                                <Form.Group controlId='feeds'>
                                    <Row className = "justify-content-center align-content-center align-items-center">
                                        <Col lg = {4} md = {3}>
                                        <Form.Label className = 'm-0'><strong>Feeds</strong></Form.Label>
                                        </Col>
                                        <Col lg = {8} md = {9}>
                                        <Form.Control type='number' value={feeds} onChange = {(e) => {setFeeds(e.target.value)}} ></Form.Control>
                                        </Col>
                                        </Row>
                                        </Form.Group>
                            </Col>
                            <Col lg = {4} md = {8} sm = {12}>
                                <Form.Group controlId='source'>
                                    <Row className = "justify-content-center align-content-center align-items-center">
                                        <Col lg = {2} md = {3}>
                                        <Form.Label className = 'm-0'><strong>Source</strong></Form.Label>
                                        </Col>
                                        <Col lg = {10} md = {9}>
                                        <Form.Control type='text' value={source} onChange = {(e) => {setSource(e.target.value)}} ></Form.Control>
                                        </Col>
                                        </Row>
                                        </Form.Group>
                            </Col>
                            <Col lg = {4} md = {8} sm = {12}>
                                <Form.Group controlId='image'>
                                    <Row className = "justify-content-center align-content-center align-items-center">
                                        <Col lg = {2} md = {3}>
                                        <Form.Label className = 'm-0'><strong>Image</strong></Form.Label>
                                        </Col>
                                        <Col lg = {10} md = {9}>
                                        <Form.Control type='text' value={image} onChange = {(e) => {setImage(e.target.value)}} ></Form.Control>
                                        </Col>
                                        </Row>
                                        </Form.Group>
                            </Col>
                            <Col>
                            <Image src={image} className='img-fluid img-thumbnail' >
                            </Image>
                            </Col>
                        </Row>
                        </ListGroup.Item>
                        <ListGroup.Item className = 'list-group-hover'>
                        <Row className = "my-3 gx-5 gy-2">
                            <Col lg = {12} md = {12} sm = {12}>
                                <Form.Group controlId='content'>
                                    <Row className = "justify-content-center align-content-center align-items-center">
                                        <Col lg = {1} md = {3}>
                                        <Form.Label className = 'm-0'><strong>Content</strong></Form.Label>
                                        <p className = "fst-italic" style = {{fontSize:'70%'}}>Use Markdown</p>
                                        </Col>
                                        <Col lg = {11} md = {9}>
                                        <Form.Control as='textarea' type='text' value={content} onChange = {(e) => {setContent(e.target.value)}} ></Form.Control>
                                        </Col>
                                        </Row>
                                        </Form.Group>
                            </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item className = 'list-group-hover'>
                        <Row className = "my-3 gx-5 gy-2">
                            <Col lg = {4} md = {8} sm = {12}>
                                <Form.Group controlId='meal'>
                                    <Row className = "justify-content-center align-content-center align-items-center">
                                        <Col lg = {2} md = {3}>
                                        <Form.Label className = 'm-0'><strong>Meal</strong></Form.Label>
                                        </Col>
                                        <Col lg = {10} md = {9}>
                                        <Form.Select value={meal} onChange = {(e) => {setMeal(e.target.value)}} >
                                            <option value='breakfast'>Breakfast</option>
                                            <option value='lunch'>Lunch</option>
                                            <option value='dinner'>Dinner</option>
                                            <option value='snack'>Snack</option>
                                            <option value='dessert'>Dessert</option>
                                        </Form.Select>
                                        </Col>
                                        </Row>
                                        </Form.Group>
                            </Col>
                            <Col lg = {4} md = {8} sm = {12}>
                                <Form.Group controlId='cuisine'>
                                    <Row className = "justify-content-center align-content-center align-items-center">
                                        <Col lg = {2} md = {3}>
                                        <Form.Label className = 'm-0'><strong>Cuisine</strong></Form.Label>
                                        </Col>
                                        <Col lg = {10} md = {9}>
                                        <Form.Select value={cuisine} onChange = {(e) => {setCuisine(e.target.value)}} >
                                            <option value='american'>American</option>
                                            <option value='brazilian'>Brazilian</option>
                                            <option value='chinese'>Chinese</option>
                                            <option value='english'>English</option>
                                            <option value='french'>French</option>
                                            <option value='german'>German</option>
                                            <option value='greek'>Greek</option>
                                            <option value='indian'>Indian</option>
                                            <option value='italian'>Italian</option>
                                            <option value='japanese'>Japanese</option>
                                            <option value='korean'>Korean</option>
                                            <option value='mexican'>Mexican</option>
                                            <option value='moroccan'>Moroccan</option>
                                            <option value='thai'>Thai</option>
                                            <option value='vietnamese'>Vietnamese</option>

                                        </Form.Select>
                                        </Col>
                                        </Row>
                                        </Form.Group>
                            </Col>
                            <Col lg = {4} md = {8} sm = {12}>
                                <Form.Group controlId='tags'>
                                    <Row className = "">
                                        <Col lg = {4} md = {4}>
                                        <Form.Label className = 'm-0'><strong>Tags</strong></Form.Label>
                                        <p className = "fst-italic" style = {{fontSize:'70%'}}>Comma separated</p>
                                        </Col>
                                        <Col lg = {8} md = {8}>
                                        <Form.Control type='text' as='textarea' value={tags} onChange = {(e) => {setTags(e.target.value)}} ></Form.Control>
                                        </Col>
                                    </Row>
                                </Form.Group>
                            </Col>
                        </Row>
                        </ListGroup.Item>
                        </ListGroup>
                        <ListGroup>
                            <ListGroup.Item className = 'list-group-hover my-3'>
                                <Row className = "my-3 gx-5 gy-2">
                                    <Col lg = {12} md = {12} sm = {12}>
                                        <Form.Group controlId='comments'>
                                            <Row className = "">
                                                <Col lg = {1} md = {3}>
                                                <Form.Label className = 'm-0'><strong>Comments</strong></Form.Label>
                                                </Col>
                                                <Col lg = {11} md = {9}>
                                                    {comments.map((comment, index) => (
                                                        <Row className = "my-3 gx-5 gy-2 d-flex">
                                                        <Col lg = {6}  className = 'flex-grow-1 flex-shrink-0'>
                                                        <Form.Control type='text' as='textarea' value={comment.comment} onChange = {(e) => {setComments(e.target.value)}} ></Form.Control>
                                                        </Col>
                                                        <Col lg = {1}  className = 'flex-grow-0 flex-shrink-1'>
                                                            {comment.rating && comment.rating}<FontAwesomeIcon className ='mx-1' icon={faStar}></FontAwesomeIcon>
                                                        </Col>
                                                        <Col lg = {1} className = 'flex-grow-0 flex-shrink-1'>
                                                        {comment.flags}
                                                            {comment.flagged ? (
                                                                <FontAwesomeIcon icon={faFlag} className='text-danger mx-1'/>
                                                            ) : (
                                                                <FontAwesomeIcon icon={faCheck} className='text-success mx-1'/>
                                                            )}
                                                        </Col>
                                                        <Col lg = {1}  className = 'flex-grow-0 flex-shrink-1'>
                                                            {comment.pending ? (
                                                                <FontAwesomeIcon icon={faClock} className='text-warning'/>
                                                            ) : (
                                                                <FontAwesomeIcon icon={faCheck} className='text-success'/>
                                                            )}
                                                        </Col>
                                                        <Col lg ={2}>
                                                            {comment.user.email || comment.user || comment.user._id}
                                                        </Col>
                                                        <Col lg = {1}  className = 'flex-grow-0 flex-shrink-1'>
                                                            <Button variant='danger'><FontAwesomeIcon icon={faTrashAlt} onClick={() => deleteCommentHandler(index)}/></Button>
                                                        </Col>
                                                        </Row>
                                                    ))}
                                                </Col>
                                                </Row>
                                                </Form.Group>
                                    </Col>
                                    </Row>
                            </ListGroup.Item>
                        </ListGroup>
                        <Row className = 'd-flex'>
                            <Col className='flex-fill' xl={6}><Button type='submit' className='w-100 btn btn-lg' variant='primary'>Submit</Button></Col>
                        
                        <Col className='flex-fill' xl = {6}><Button variant='danger' className='w-100 btn btn-lg' onClick={deleteHandler}>Delete</Button></Col>
                        </Row>

                    </Form>
                </Col>
            </Row>
            
        </Container>
    )
}

export default Internal