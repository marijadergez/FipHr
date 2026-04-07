import { Link, useNavigate } from "react-router-dom";
import gradoviService from "../../services/gradovi/GradService";
import { RouteNames } from "../../constants";
import { Button, Card, Col, Container, Form, FormControl, FormGroup, Row } from "react-bootstrap";


export default function gradoviNovi(){

    const navigate = useNavigate()

    async function dodaj(grad){
        //console.table(smjer)
        await gradoviService.dodaj(grad).then(()=>{
            navigate(RouteNames.GRAD)
        })
    }


    function odradiSubmit(e){ // e je event
        e.preventDefault() // nemoj odraditi submit
        const podaci = new FormData(e.target)

         // --- KONTROLA 1: Naziv (Postojanje) ---
        if (!podaci.get('naziv') || podaci.get('naziv').trim().length === 0) {
            alert("Naziv je obavezan i ne smije sadržavati samo razmake!")
            return // Prekid
        }

        // --- KONTROLA 2: Naziv (Minimalna duljina) ---
        if (podaci.get('naziv').trim().length < 3) {
            alert("Naziv grada mora imati najmanje 3 znaka!")
            return // Prekid
        }

       

        if (!podaci.get('cijena') || podaci.get('cijena') === "") {
            alert("Obavezno cijena po gradu!")
            return
        }

        // --- KONTROLA 4: Upisnina (Negativne vrijednosti) ---
        if (podaci.get('cijena') < 0) {
            alert("Cijena ne može biti negativan broj!")
            return // Prekid
        }

       

        dodaj({
            naziv: podaci.get('naziv'),
          
            cijena: parseFloat(podaci.get('cijena')),
            datumPokretanja: new Date().toISOString(),
            popust: podaci.get('popust') === 'on'
        })
    }

    return (
        <>
            <h3>Unos nove gradovi</h3>
            <Form onSubmit={odradiSubmit}>


                <Container className="mt-4">
                    <Card className="shadow-sm">
                        <Card.Body>
                            <Card.Title className="mb-4">Podaci o usluzi</Card.Title>

                            {/* Naziv - Pun širina na svim ekranima */}
                            <Row>
                                <Col xs={12}>
                                    <Form.Group controlId="naziv" className="mb-3">
                                        <Form.Label className="fw-bold">Naziv</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="naziv"
                                            placeholder="Unesite naziv gradovi"
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            {/* Trajanje i Cijena - Jedno pored drugog na md+, jedno ispod drugog na mobitelu */}
                            <Row>
                               
                                <Col md={6}>
                                    <Form.Group controlId="cijena" className="mb-3">
                                        <Form.Label className="fw-bold">Cijena (€)</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="cijena"
                                            step={0.01}
                                            placeholder="0,00"
                                        />
                                    </Form.Group>
                                </Col>
                      
                                {/* Aktivan - Switch umjesto checkboxa za moderniji izgled */}
                                <Col md={6}>
                                    <Form.Group controlId="popust" className="mb-3 mt-md-3">
                                        <Form.Check
                                            type="switch"
                                            label="grad je na popustu"
                                            name="popust"
                                            className="fs-5"
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <hr />

                            {/* Gumbi za akciju - RWD pozicioniranje */}
                            <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                                <Link to={RouteNames.GRAD} className="btn btn-danger px-4">
                                    Odustani
                                </Link>
                                <Button type="submit" variant="success">
                                    Dodaj novi grad
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Container>

            </Form>
        </>
    )
}