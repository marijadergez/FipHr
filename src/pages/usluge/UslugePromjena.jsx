import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import UslugeService from "../../services/usluge/UslugeService";
import { RouteNames } from "../../constants";
import { Button, Card, Col, Container, Form, FormControl, FormGroup, Row } from "react-bootstrap";

export default function UslugePromjena(){

    const navigate = useNavigate()
    const params = useParams()
    const [usluga,setUsluga] =useState({})
    const [popust,setPopust] =useState(false)

    useEffect(
        ()=>{
            ucitajUsluge()
        },[])

        async function ucitajUsluge() {
        await UslugeService.getBySifra(params.sifra).then((odgovor)=>{
            if(!odgovor.success){
                alert('Nije implementiran servis')
                return
            }
            const s = odgovor.data
            s.datumPokretanja = s.datumPokretanja.substring(0,10)
            setUsluga(s)
            setPopust(s.popust)
           // console.table(odgovor.data)
        })
    }

    async function promjeni(usluga) {
        await UslugeService.promjeni(params.sifra,usluga).then(()=>{
            navigate(RouteNames.USLUGE)
        })
    }

    function odradiSubmit(e){
        e.preventDefault()
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

        // --- KONTROLA 3: Trajanje (Logički raspon) ---
      

        if (!podaci.get('cijena') || podaci.get('cijena') === "") {
            alert("Obavezno cijena smjera!")
            return
        }

        // --- KONTROLA 4: Upisnina (Negativne vrijednosti) ---
        if (podaci.get('cijena') < 0) {
            alert("Cijena ne može biti negativan broj!")
            return // Prekid
        }


        promjeni({
            naziv: podaci.get('naziv'),
            cijena: parseFloat(podaci.get('cijena')),
            datumPokretanja: usluga.datumPokretanja,
            popust: popust
        })
    }

    return(
         <>
            <h3>Promjena usluge</h3>
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
                                            placeholder="Unesite naziv usluga"
                                            required
                                            defaultValue={usluga.naziv}
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
                                            defaultValue={usluga.cijena}
                                        />
                                    </Form.Group>
                                </Col>
                        

                                {/* Aktivan - Switch umjesto checkboxa za moderniji izgled */}
                                <Col md={6}>
                                    <Form.Group controlId="popust" className="mb-3 mt-md-3">
                                        <Form.Check
                                            type="switch"
                                            label="Usluga je na popustu"
                                            name="popust"
                                            className="fs-5"
                                            checked={popust}
                                            onChange={(e) => setPopust(e.target.checked)}
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
                                    Promjeni uslugu
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Container>


            </Form>
        </>
    )
}

 
















