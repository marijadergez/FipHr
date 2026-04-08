import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import GradService from "../../services/gradovi/GradService";
import { RouteNames } from "../../constants";
import { Button, Card, Col, Container, Form, FormControl, FormGroup, Row } from "react-bootstrap";

export default function gradPromjena(){

    const navigate = useNavigate()
    const params = useParams()
    const [grad,setGrad] =useState({})

    useEffect(
        ()=>{
            ucitajGrad()
        },[])

    async function ucitajGrad() {
        await GradService.getBySifra(params.sifra).then((odgovor)=>{
            if(!odgovor.success){
                alert('Nije implementiran grad')
                return
            }
           setGrad(odgovor.data)
        })
    }
   

    async function promjeni(grad) {
        await GradService.promjeni(params.sifra,grad).then(()=>{
            navigate(RouteNames.GRADOVI)
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
            alert("Naziv grada mora imati najmanje 3 znaka!")
            return // Prekid
        }

      


        promjeni({
            naziv: podaci.get('naziv')
        })
    }

    return(
         <>
            <h3>Promjena grada</h3>
            <Form onSubmit={odradiSubmit}>
                <Container className="mt-4">
                    <Card className="shadow-sm">
                        <Card.Body>
                            <Card.Title className="mb-4">Podaci o gradu</Card.Title>

                            {/* Naziv - Pun širina na svim ekranima */}
                            <Row>
                                <Col xs={12}>
                                    <Form.Group controlId="naziv" className="mb-3">
                                        <Form.Label className="fw-bold">Naziv</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="naziv"
                                            placeholder="Unesite naziv grad"
                                            required
                                            defaultValue={grad.naziv}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                           
                            <hr />

                            {/* Gumbi za akciju - RWD pozicioniranje */}
                            <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                                <Link to={RouteNames.GRADOVI} className="btn btn-danger px-4">
                                    Odustani
                                </Link>
                                <Button type="submit" variant="success">
                                    Promjeni grad
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Container>


            </Form>
        </>
    )
}