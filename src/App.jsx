import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Container } from 'react-bootstrap'
import Izbornik from './components/izbornik'
import { Route, Routes } from 'react-router-dom'
import { RouteNames } from './constants'
import Home from './pages/Home'
import UslugePregled from './pages/usluge/UslugePregled'

function App() {

  return (
   <Container>

    <Navbar expand="lg" className="bg-body-tertiary">
            <Container> 
                <Navbar.Brand >{IME_APLIKACIJE} </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link 
                        
                        onClick={()=>navigate(RouteNames.HOME)}
                        
                        
                        >Početna</Nav.Link>
                        <NavDropdown title="Programi" id="basic-nav-dropdown">
                            <NavDropdown.Item
                            
                                   onClick={()=>navigate(RouteNames.USLUGE)}

                            
                            >Usluge</NavDropdown.Item>
                            
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>



      <Izbornik />
      <Routes>
        <Route path={RouteNames.HOME} element={<Home />}  />
        <Route path={RouteNames.USLUGE} element={<UslugePregled />}  />
      </Routes>
    <hr />
    &copy; Marija @ Edunova 2026

   </Container>
  )
}

export default App
