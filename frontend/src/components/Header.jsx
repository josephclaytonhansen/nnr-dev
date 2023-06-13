import { Nav, NavDropdown, NavLink, Navbar, Container, Form, FormControl, FormGroup, Button } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {} from '@fortawesome/free-solid-svg-icons'
import { useHistory } from "react-router-dom"

const Header = () => {
    const history = useHistory()

    const handleKeyDown = (e) => {
        //if key is enter
        if(e.keyCode === 13){
            //get the value of the search bar
            const search = e.target.value
            //redirect to search page
            history.push(`/search/${search}`)
        }
    }

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
                        <Nav.Link href="/recipes">Recent</Nav.Link>
                        <NavDropdown title="By Meal" id="">
                            <NavDropdown.Item href="/recipes/breakfast">Breakfast</NavDropdown.Item>
                            <NavDropdown.Item href="/recipes/lunch">Lunch</NavDropdown.Item>
                            <NavDropdown.Item href="/recipes/dinner">Dinner</NavDropdown.Item>
                            <NavDropdown.Item href="/recipes/dessert">Dessert</NavDropdown.Item>
                        </NavDropdown>
                    
                    <NavDropdown title="Cuisines" id="">
                        <NavDropdown.Item href="/cuisines/american">American</NavDropdown.Item>
                        <NavDropdown.Item href="/cuisines/brazilian">Brazilian</NavDropdown.Item>
                        <NavDropdown.Item href="/cuisines/chinese">Chinese</NavDropdown.Item>
                        <NavDropdown.Item href="/cuisines/english">English</NavDropdown.Item>
                        <NavDropdown.Item href="/cuisines/french">French</NavDropdown.Item>
                        <NavDropdown.Item href="/cuisines/german">German</NavDropdown.Item>
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
                        <NavDropdown.Item href="/recipes/gluten-free">Gluten Free</NavDropdown.Item>
                        <NavDropdown.Item href="/recipes/vegetarian">Vegetarian</NavDropdown.Item>
                        <NavDropdown.Item href="/recipes/dog-safe">Dog Safe</NavDropdown.Item>
                    </NavDropdown>
                        <Form className="d-flex ps-md-3">
                        <Form.Control type="search" placeholder="Search" className="me-2 bg-l-cream" aria-label="Search"
                        onKeyDown={handleKeyDown}/>
                    </Form>
                    </Nav>
                    </Navbar.Collapse>

                    

                    
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
