import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import {IME_APLIKACIJE} from "../constants.js";


export default function Izbornik() {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">{IME_APLIKACIJE} </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Početna</Nav.Link>
                       
                        <NavDropdown title="Programi" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Smjerovi</NavDropdown.Item>
                            
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}