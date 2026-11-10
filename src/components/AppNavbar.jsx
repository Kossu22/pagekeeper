import { Link, NavLink } from 'react-router'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { BookHalf, Search, Bookshelf } from 'react-bootstrap-icons'

function AppNavbar() {
  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="md" collapseOnSelect>
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2">
          <BookHalf aria-hidden="true" />
          Pagekeeper
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-nav" />

        <Navbar.Collapse id="main-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/" end eventKey="discover" className="d-flex align-items-center gap-1">
              <Search aria-hidden="true" /> Discover
            </Nav.Link>
            <Nav.Link as={NavLink} to="/shelves" eventKey="shelves" className="d-flex align-items-center gap-1">
              <Bookshelf aria-hidden="true" /> My Shelves
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default AppNavbar