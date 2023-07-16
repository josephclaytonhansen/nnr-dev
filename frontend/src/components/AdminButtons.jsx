import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faList, faPlus, faUsers } from "@fortawesome/free-solid-svg-icons"
import React from "react"
import {Row, Col, Button} from "react-bootstrap"
import { Link } from "react-router-dom"
import {useCreateRecipeMutation} from "../../src/slices/recipesApiSlice"
import {toast } from "react-toastify"

const AdminButtons = ({permissions}) => {
    const [createRecipe, {isLoading: loadingCreateRecipe}] = useCreateRecipeMutation()

    const isAuthor = permissions?.includes("is-author")
    const isAdmin = permissions?.includes("is-admin")
    let width = isAdmin ? '200px' : '60px'

    const createRecipeHandler = async () => {
        try{
            const res = await createRecipe({author: permissions[0], name: "new recipe"}).unwrap()
            toast.success("Recipe created")
            window.location.href = window.location.origin + `/edit/${res}`
            
        } catch(err){
            toast.error(err?.data?.message || err.error)
        }
    }

    const adminRecipesHandler = () => {
        window.location.href = window.location.origin + `/admin-recipes`
    }

    const adminUsersHandler = () => {
        window.location.href = window.location.origin + `/admin-users`
    }

    return (
<>
        {(isAuthor || isAdmin) && (<div style = {{position:'fixed', borderRadius: '12px 0 0 0', padding:'20px', bottom:'20px', right:'0px'}} className="bg-d-gray">
            
            <Row style = {{width:width, flexDirection:'row', }} className="d-flex">
                {isAuthor && (
                <Col>
                <Button className = 'bg-red button-bg-red' onClick = {createRecipeHandler}><h6 className = 'py-0 my-0'><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon></h6></Button>
                </Col>)}
                {isAdmin && (
                    <>
                <Col>
                <Button className = 'bg-red button-bg-red'><h6 className = 'py-0 my-0' onClick = {adminRecipesHandler}><FontAwesomeIcon icon={faList}></FontAwesomeIcon></h6></Button>
                </Col>
                <Col>
                <Button className = 'bg-red button-bg-red'><h6 className = 'py-0 my-0'onClick = {adminUsersHandler}><FontAwesomeIcon icon={faUsers}></FontAwesomeIcon></h6></Button>
                </Col></>)}
            </Row>
        </div>)}
        </>
    )
}

export default AdminButtons