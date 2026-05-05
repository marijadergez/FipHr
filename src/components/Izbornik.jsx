import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { IME_APLIKACIJE, RouteNames } from '../constants'
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";

export default function Izbornik() {

    const navigate = useNavigate()
    const { isLoggedIn, logout, authUser } = useAuth()



    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">{IME_APLIKACIJE}</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link
                            onClick={() => navigate(RouteNames.HOME)}
                        >Početna</Nav.Link>

                        {isLoggedIn && (
                            <>
                                <Nav.Link
                                    onClick={() => navigate(RouteNames.NADZORNA_PLOCA)}
                                >Nadzorna ploča</Nav.Link>

                                <NavDropdown title="Program" id="basic-nav-dropdown">

                                    <NavDropdown.Item
                                        onClick={() => navigate(RouteNames.GRADOVI)}
                                    >Gradovi</NavDropdown.Item>


                                    <NavDropdown.Item
                                        onClick={() => navigate(RouteNames.USLUGE)}
                                    >Usluge</NavDropdown.Item>


                                    <NavDropdown.Item
                                        onClick={() => navigate(RouteNames.KORISNICI)}
                                    >Korisnici</NavDropdown.Item>


                                    <NavDropdown.Item
                                        onClick={() => navigate(RouteNames.PONUDE)}
                                    >Ponude</NavDropdown.Item>
                                    {authUser.uloga === 'admin' && (
                                        <>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item
                                                onClick={() => navigate(RouteNames.OPERATERI)}
                                            >Operateri</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item
                                                onClick={() => navigate(RouteNames.GENERIRANJE_PODATAKA)}
                                            >Generiraj podatke</NavDropdown.Item>
                                        </>)}

                                </NavDropdown>
                                <Nav.Link
                                    onClick={() => navigate(RouteNames.APLIKACIJE_POLAZNIKA)}
                                >Aplikacije polaznika</Nav.Link>
                            </>)}


                    </Nav>

                    <Nav className="ms-auto">
                        {isLoggedIn ? (
                            <Button
                                className="me-2"
                                onClick={() => logout()}
                            >Logout {authUser.email}</Button>
                        ) : (
                            <>
                                <Button
                                    className="me-2"
                                    onClick={() => navigate(RouteNames.REGISTRACIJA)}
                                >Registracija</Button>
                                <Button
                                    onClick={() => navigate(RouteNames.LOGIN)}
                                >Login</Button>
                            </>)}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}