import { Link, useNavigate } from "react-router-dom";
import UslugeService from "../../services/usluge/UslugeService";
import { RouteNames } from "../../constants";
import { Button, Card, Col, Container, Form, FormControl, FormGroup, Row } from "react-bootstrap";


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

        if (!podaci.get('datumPokretanja') || podaci.get('datumPokretanja') === "") {
            alert("Morate odabrati datum pokretanja!")
            return
        }

        // B) Logička provjera: Datum ne smije biti u prošlosti
        const odabraniDatum = new Date(podaci.get('datumPokretanja'))
        const danas = new Date()
        danas.setHours(0, 0, 0, 0) // Resetiramo vrijeme na ponoć radi točne usporedbe datuma

        if (odabraniDatum < danas) {
            alert("Datum pokretanja ne može biti u prošlosti!")
            return
        }

        dodaj({
            naziv: podaci.get('naziv'),
          
            cijena: parseFloat(podaci.get('cijena')),
            datumPokretanja: new Date(podaci.get('datumPokretanja')).toISOString(),
            aktivan: podaci.get('aktivan') === 'on'
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
                            <Row>
                                <Col xs={12}>
                                    <Form.Group controlId="naziv" className="mb-3">
                                        <Form.Label className="fw-bold">Naziv</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="naziv"
                                            placeholder="Unesite naziv smjera"
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
                            </Row>

                            <Row className="align-items-center">
                                {/* Datum pokretanja */}
                                <Col md={6}>
                                    <Form.Group controlId="datumPokretanja" className="mb-3">
                                        <Form.Label className="fw-bold">Datum pokretanja</Form.Label>
                                        <Form.Control type="date" name="datumPokretanja" 
                                        // Dodajemo onClick i onFocus za bolju pristupačnost
                                        onClick={(e) => e.target.showPicker()} 
                                        onFocus={(e) => e.target.showPicker()}
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

  /*  async function dodaj(usluga){
        
        await UslugeService.dodaj(usluga).then(()=>{
             navigate(RouteNames.USLUGE) 
        })
       
    }
        
     function odradiSubmit(e){
        e.preventDefault()
        const podaci = new FormData(e.target)
        dodaj({
            naziv: podaci.get('naziv'),
            trajanje: parseInt(podaci.get('trajanje')),
            cijena: parseFloat(podaci.get('cijena')),
            datumPokretanja: new Date(podaci.get('datumPokretanja')).toISOString(),
            popust: podaci.get('popust') === 'on'
        })


    }

    return(
        <>
        <h3 className="mt-5">Unesite novu custom uslugu</h3>
          <Form onSubmit={odradiSubmit}>
            <FormGroup controlId="naziv">
                <Form.Label>Unesite Naziv ili opis</Form.Label>
                <FormControl  type="text" name="naziv" required/>
            </FormGroup>

            <Form.Group className="mt-5" controlId="datumPokretanja">
                    <Form.Label >Datum pokretanja custom usluge</Form.Label>
                    <Form.Control  type="date" name="datumPokretanja" />
                </Form.Group>


            <Form.Group className="mt-5" controlId="cijena">
                <Form.Label>Očekivana cijena</Form.Label>
                <Form.Control type="number" name="cijena" step={0.01} />

            </Form.Group>

            <Form.Group controlId="popust">
                    <Form.Check label="Popust" name="popust" />
                </Form.Group>

             <Row className="mt-4">

                <Col>
                <Link to={RouteNames.USLUGE} className="btn btn-danger">
                Odustani
                </Link>
                </Col>

                <Col>
                <Button type="submit" variant="success">
                    Dodaj novu uslugu
                </Button>
                </Col>
                
                
                
                
            </Row>   






          </Form>
        
        
        </>
    )



}*/