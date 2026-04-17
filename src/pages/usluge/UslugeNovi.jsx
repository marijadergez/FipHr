import { Link, useNavigate } from "react-router-dom";
import UslugeService from "../../services/usluge/UslugeService";
import { RouteNames } from "../../constants";
import { Button, Card, Col, Container, Form, FormControl, FormGroup, Row } from "react-bootstrap";
import { usluge } from "../../services/usluge/UslugePodaci";


export default function UslugeNovi(){

    const navigate = useNavigate()
    

    async function dodaj(uslugu){
        //console.table(smjer)
        await UslugeService.dodaj(uslugu).then(()=>{
            navigate(RouteNames.USLUGE)
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
            alert("Naziv smjera mora imati najmanje 3 znaka!")
            return // Prekid
        }

       

        if (!podaci.get('cijena') || podaci.get('cijena') === "") {
            alert("Obavezno cijena smjera!")
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
            <h3>Unos nove usluge</h3>
            <Form onSubmit={odradiSubmit}>


                <Container className="mt-4">
                    <Card className="shadow-sm">
                        <Card.Body>
                            <Card.Title className="mb-4">Podaci o usluzi</Card.Title>

                            {/* Naziv - Pun širina na svim ekranima */}
                          

                            {/* Trajanje i Cijena - Jedno pored drugog na md+, jedno ispod drugog na mobitelu */}
                            <Row>
                               
                               <Form.Group controlId="usluge">
                    <Form.Label>Usluge</Form.Label>
                    <Form.Select name="usluge" required>
                        <option key={0} value="">Odaberite usluge za ponudu</option>
                        {usluge && usluge.map((usluga) => (
                            <option key={usluga.sifra} value={usluga.sifra}>
                                {usluga.naziv}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
                      

                      
                                {/* Aktivan - Switch umjesto checkboxa za moderniji izgled */}
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
                            </Row>

                            <hr />

                            {/* Gumbi za akciju - RWD pozicioniranje */}
                            <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                                <Link to={RouteNames.USLUGE} className="btn btn-danger px-4">
                                    Odustani
                                </Link>
                                <Button type="submit" variant="success">
                                    Dodaj novu uslugu
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Container>

            </Form>
        </>
    )
}

