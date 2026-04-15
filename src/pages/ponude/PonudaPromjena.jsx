import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PonudaService from "../../services/ponude/PonudaService";
import { RouteNames } from "../../constants";
import { Button, Card, Col, Container, Form, FormControl, FormGroup, Row } from "react-bootstrap";

export default function ponudaPromjena(){

    const navigate = useNavigate()
    const params = useParams()
    const [ponuda, setPonuda] = useState({})
    
    

    useEffect(
        ()=>{
            ucitajPonude()
        },[])
        

    async function ucitajPonude() {
        await PonudaService.getBySifra(params.sifra).then((odgovor)=>{
            if(!odgovor.success){
                alert('Nije implementiranA PONUDA')
                return
            }
           setPonuda(odgovor.data)
        })
    }
   

    async function promjeni(ponuda) {
        await PonudaService.promjeni(params.sifra,ponuda).then(()=>{
            navigate(RouteNames.PONUDE)
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
        if (!podaci.get('datumPokretanja') || podaci.get('datumPokretanja') === "") {
            alert("Morate odabrati datum pokretanja!")
            return
        }
        if (podaci.get('naziv').trim().length < 3) {
            alert("Naziv smjera mora imati najmanje 3 znaka!")
            return // Prekid
        }


        // --- KONTROLA 2: Naziv (Minimalna duljina) ---
        if (podaci.get('naziv').trim().length < 3) {
            alert("Naziv PONUDE mora imati najmanje 3 znaka!")
            return // Prekid
        }

           const s = odgovor.data
            s.datumPokretanja = s.datumPokretanja.substring(0,10)
           
            setPopust(s.popust)
           // console.table(odgovor.data)
        
    


        promjeni({
             naziv: podaci.get('naziv'),
            popust: podaci.get('aktivan') === 'on',
            cijena: parseFloat(podaci.get('cijena')),
            datumPokretanja: new Date(podaci.get('datumPokretanja'))
        })
    }

    return(
         <>
            <h3>Promjena ponude</h3>
            <Form onSubmit={odradiSubmit}>
                <Container className="mt-4">
                    <Card className="shadow-sm">
                        <Card.Body>
                            <Card.Title className="mb-4">Podaci o ponudi</Card.Title>

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
                                            defaultValue={ponuda.naziv}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>


                         <Col md={6}>
                                <Form.Group controlId="popust" className="mb-3 mt-md-3">
                                    <Form.Check
                                        type="switch"
                                        label="Ponuda usluge je na popustu"
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
                                    Promjeni ponudu
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Container>


            </Form>
        </>
    )
}