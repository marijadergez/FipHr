import { Link, useNavigate } from "react-router-dom";
import PonudaService from "../../services/gradovi/PonudaService";
import { RouteNames } from "../../constants";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";


export default function PonudaNovi() {

    const navigate = useNavigate()




    async function dodaj(ponuda) {
        //console.table(smjer)
        await PonudaService.dodaj(ponuda).then(() => {
            navigate(RouteNames.PONUDE)
        })
    }


    function odradiSubmit(e) { // e je event
        e.preventDefault() // nemoj odraditi submit
        const podaci = new FormData(e.target)

        // --- KONTROLA 1: Naziv (Postojanje) ---
        if (!podaci.get('naziv') || podaci.get('naziv').trim().length === 0) {
            alert("Naziv je obavezan i ne smije sadržavati samo razmake!")
            return // Prekid
        }

        // --- KONTROLA 2: Naziv (Minimalna duljina) ---
        if (podaci.get('naziv').trim().length < 3) {
            alert("Naziv ponude mora imati najmanje 3 znaka!")
            return // Prekid
        }




        dodaj({
            naziv: podaci.get('naziv')
        })
    }

    return (
        <>
            <h3>Unos nove ponude</h3>
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
                                            placeholder="Unesite naziv ponude"
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Form.Group controlId="grad">
                                <Form.Label>Grad</Form.Label>
                                <Form.Select name="grad" required>
                                    <option key={0} value="">Odaberite grad</option>
                                    {gradovi && gradovi.map((grad) => (
                                        <option key={grad.sifra} value={grad.sifra}>
                                            {grad.naziv}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>



                            <Col md={6}>
                                <Form.Group controlId="popust" className="mb-3 mt-md-3">
                                    <Form.Check
                                        type="switch"
                                        label="Usluga je na popustu"
                                        name="popust"
                                        className="fs-5"
                                    />
                                </Form.Group>
                            </Col>



                            <hr />

                            {/* Gumbi za akciju - RWD pozicioniranje */}
                            <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                                <Link to={RouteNames.PONUDE} className="btn btn-danger px-4">
                                    Odustani
                                </Link>
                                <Button type="submit" variant="success">
                                    Dodaj novu ponudu
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Container>

            </Form>
        </>
    )
}