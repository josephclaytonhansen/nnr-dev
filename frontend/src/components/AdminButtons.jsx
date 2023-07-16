import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faList, faPlus, faUsers } from "@fortawesome/free-solid-svg-icons"
import React from "react"
import {Row, Col, Button} from "react-bootstrap"
import { Link } from "react-router-dom"

const AdminButtons = () => {
    return (
        <div style = {{position:'fixed', borderRadius: '12px 0 0 0', padding:'20px', bottom:'20px', right:'0px'}} className="bg-d-gray">
            <Row style = {{width:'200px', flexDirection:'row', }} className="d-flex">
                <Col>
                <Button className = 'bg-red button-bg-red'><h6 className = 'py-0 my-0'><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon></h6></Button>
                </Col>
                <Col>
                <Button className = 'bg-red button-bg-red'><h6 className = 'py-0 my-0'><FontAwesomeIcon icon={faList}></FontAwesomeIcon></h6></Button>
                </Col>
                <Col>
                <Button className = 'bg-red button-bg-red'><h6 className = 'py-0 my-0'><FontAwesomeIcon icon={faUsers}></FontAwesomeIcon></h6></Button>
                </Col>
            </Row>
        </div>
    )
}

export default AdminButtons