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
        // Provjera je li broj i je li unutar zadanih granica (npr. 1 - 500 sati)
        if (isNaN(podaci.get('trajanje')) || podaci.get('trajanje') < 1 || podaci.get('trajanje') > 500) {
            alert("Trajanje mora biti broj između 1 i 500 sati!")
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

    /*    async function ucitajUsluge() {
            await UslugeService.getBySifra(params.sifra).then((odgovor)=>{
                const s = odgovor.data
                
                s.datumPokretanja = s.datumPokretanja.substring(0,10)
                setUsluga(s)
                setPopust(s.popust)
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
            promjeni({
                naziv: podaci.get('naziv'),
                cijena: parseFloat(podaci.get('cijena')),
                datumPokretanja: new Date(podaci.get('datumPokretanja')).toISOString(),
                popust: popust

            })
        }

        return(
         <>
            <h3>Promjena uslugu</h3>
            <Form onSubmit={odradiSubmit}>
                <Container className="mt-4">
                    <Card className="shadow-sm">
                        <Card.Body>
                            <Card.Title className="mb-4">Podaci o korisniku usluge</Card.Title>

                            {/* Naziv - Pun širina na svim ekranima }
                            <Row>
                                <Col xs={12}>
                                    <Form.Group controlId="naziv" className="mb-3">
                                        <Form.Label className="fw-bold">Naziv</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="naziv"
                                            placeholder="Unesite naziv smjera"
                                            required
                                            defaultValue={usluga.naziv}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            {/* Trajanje i Cijena - Jedno pored drugog na md+, jedno ispod drugog na mobitelu }
                            <Row>
                                <Col md={6}>
                                    <Form.Group controlId="trajanje" className="mb-3">
                                        <Form.Label className="fw-bold">Trajanje (sati)</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="trajanje"
                                            step={1}
                                            placeholder="0"
                                            defaultValue={smjer.trajanje}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="cijena" className="mb-3">
                                        <Form.Label className="fw-bold">Cijena (€)</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="cijena"
                                            step={0.01}
                                            placeholder="0,00"
                                            defaultValue={smjer.cijena}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row className="align-items-center">
                                {/* Datum pokretanja }
                                <Col md={6}>
                                    <Form.Group controlId="datumPokretanja" className="mb-3">
                                        <Form.Label className="fw-bold">Datum pokretanja</Form.Label>
                                        <Form.Control type="date" name="datumPokretanja" 
                                        // Dodajemo onClick i onFocus za bolju pristupačnost
                                        onClick={(e) => e.target.showPicker()} 
                                        onFocus={(e) => e.target.showPicker()}
                                        defaultValue={smjer.datumPokretanja}
                                        />
                                    </Form.Group>
                                </Col>

                                {/* Aktivan - Switch umjesto checkboxa za moderniji izgled }
                                <Col md={6}>
                                    <Form.Group controlId="aktivan" className="mb-3 mt-md-3">
                                        <Form.Check
                                            type="switch"
                                            label="Smjer je aktivan"
                                            name="aktivan"
                                            className="fs-5"
                                            checked={aktivan}
                                            onChange={(e) => setAktivan(e.target.checked)}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <hr />

                            {/* Gumbi za akciju - RWD pozicioniranje }
                            <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                                <Link to={RouteNames.SMJEROVI} className="btn btn-danger px-4">
                                    Odustani
                                </Link>
                                <Button type="submit" variant="success">
                                    Promjeni smjer
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Container>


            </Form>
        </>
    )
}

      /*  return(
        <>
        <h3 className="mt-5">Unesite promjenu</h3>
          <Form onSubmit = {odradiSubmit}>
            <FormGroup controlId="naziv">
                <Form.Label>Unesite Naziv dosadašnje usluge ili opis</Form.Label>
                <FormControl  type="text" name="naziv" required
                defaultValue={usluga.naziv}/>
            </FormGroup>

            <Form.Group className="mt-5" controlId="datumPokretanja">
                    <Form.Label >Datum promjene koju unosite</Form.Label>
                    <Form.Control  type="date" name="datumPokretanja" 
                    defaultValue={usluga.datumPokretanja}/>
                </Form.Group>


            <Form.Group className="mt-5" controlId="cijena">
                <Form.Label>Očekivana cijena izmjene</Form.Label>
                <Form.Control type="number" name="cijena" step={0.01} 
                defaultValue={usluga.cijena}/>

            </Form.Group>

              <Form.Group controlId="popust">
                    <Form.Check label="Popust" name="popust" 
                    checked={popust}
                    onChange={(e)=>{setPopust(e.target.checked)}}/>
                </Form.Group>


             <Row className="mt-4">

                <Col>
                <Link to={RouteNames.USLUGE} className="btn btn-danger">
                Odustani
                </Link>
                </Col>

                <Col>
                <Button type="submit" variant="success">
                   Promjeni uslugu
                </Button>
                </Col>
                
                
                
                
            </Row>   






          </Form>
        
        
        </>

        )
    }*/

















