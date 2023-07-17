import { Nav, NavDropdown, NavLink, Navbar, Container, Form, FormControl, FormGroup, Button, ProgressBar } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUser} from '@fortawesome/free-solid-svg-icons'
import { useHistory } from "react-router-dom"
import {toast} from 'react-toastify'
import { useEffect, useState } from "react"

const Header = () => {
    const history = useHistory()
    const handleKeyDown = async (e) => {
        if (e.key === 'Enter'){
        e.preventDefault()
        //for some reason history isn't working here
        const sanitized = e.target.value.replace(/[^a-zA-Z ]/g, "")
        window.location.href = `/search/${sanitized}`
    }}



        const [scrollPosition, setPosition] = useState({ scrollX: 0, scrollY: 0 })
     
        useEffect(() => {
         function updatePosition() {
            const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
             setPosition({ scrollX: window.scrollX, scrollY: scrollPercent })
         }
     
         window.addEventListener('scroll', updatePosition)
         updatePosition()
     
         return () => window.removeEventListener('scroll', updatePosition)
        }, [])
     

    return(
        <header>
            <Navbar className='bg-purple main-header' variant = "dark" fixed='top' expand='lg' >
                <Container fluid style={{width:'80vw', maxWidth:'1320px'}}> 
                <Nav className="me-auto">
                    <Navbar.Text>
                    <Navbar.Brand href="/">Nonsense Free Recipes</Navbar.Brand>
                    </Navbar.Text>
                </Nav>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        <Nav.Link href="/recipes">All</Nav.Link>
                        <NavDropdown title="By Meal" id="">
                            <NavDropdown.Item href="/meal/breakfast">Breakfast</NavDropdown.Item>
                            <NavDropdown.Item href="/meal/lunch">Lunch</NavDropdown.Item>
                            <NavDropdown.Item href="/meal/dinner">Dinner</NavDropdown.Item>
                            <NavDropdown.Item href="/meal/dessert">Dessert</NavDropdown.Item>
                            <NavDropdown.Item href="/meal/snack">Snack</NavDropdown.Item>
                        </NavDropdown>
                    
                    <NavDropdown title="Cuisines" id="">
                        <NavDropdown.Item href="/cuisines/american">American</NavDropdown.Item>
                        <NavDropdown.Item href="/cuisines/brazilian">Brazilian</NavDropdown.Item>
                        <NavDropdown.Item href="/cuisines/chinese">Chinese</NavDropdown.Item>
                        <NavDropdown.Item href="/cuisines/english">English</NavDropdown.Item>
                        <NavDropdown.Item href="/cuisines/french">French</NavDropdown.Item>
                        <NavDropdown.Item href="/cuisines/german">German</NavDropdown.Item>
                        <NavDropdown.Item href="/cuisines/greek">Greek</NavDropdown.Item>
                        <NavDropdown.Item href="/cuisines/indian">Indian</NavDropdown.Item>
                        <NavDropdown.Item href="/cuisines/italian">Italian</NavDropdown.Item>
                        <NavDropdown.Item href="/cuisines/japanese">Japanese</NavDropdown.Item>
                        <NavDropdown.Item href="/cuisines/korean">Korean</NavDropdown.Item>
                        <NavDropdown.Item href="/cuisines/mexican">Mexican</NavDropdown.Item>
                        <NavDropdown.Item href="/cuisines/moroccan">Moroccan</NavDropdown.Item>
                        <NavDropdown.Item href="/cuisines/thai">Thai</NavDropdown.Item>
                        <NavDropdown.Item href="/cuisines/vietnamese">Vietnamese</NavDropdown.Item>

                    </NavDropdown>
                    <NavDropdown title="Restrictions" id="">
                        <NavDropdown.Item href="/gluten-free">Gluten Free</NavDropdown.Item>
                        <NavDropdown.Item href="/vegetarian">Vegetarian</NavDropdown.Item>
                        <NavDropdown.Item href="/dog-safe">Dog Safe</NavDropdown.Item>
                    </NavDropdown>
                        <Form className="d-flex ps-md-3">
                        <Form.Control type="search" placeholder="Search" className="me-2 bg-l-cream" aria-label="Search"
                        onKeyDown={handleKeyDown}/>
                        <Nav.Link href="/login"><FontAwesomeIcon icon={faUser} /></Nav.Link>
                    </Form>
                    </Nav>
                    </Navbar.Collapse>

                    

                    
                </Container>
            </Navbar>
            <ProgressBar className = 'header-scroll' now = {scrollPosition.scrollY} style = {{position:'fixed', top:'60px', width: '100vw',zIndex:9999}}/>
        </header>
    )
}

export default Header
