import { Link, useNavigate } from "react-router-dom";
import PonudaService from "../../services/ponude/PonudaService";
import { RouteNames } from "../../constants";
import { Button, Card, Col, Container, Form, Row, Table } from "react-bootstrap";

import { useEffect, useState } from "react";
import KorisnikService from "../../services/korisnici/KorisnikService";
import UslugeService from "../../services/usluge/UslugeService";
import UslugePromjena from "../usluge/UslugePromjena";
import ponudaPromjena from "./PonudaPromjena";
import { ponude } from "../../services/ponude/PonudaPodaci";



export default function PonudaNovi() {

    const navigate = useNavigate()
    const [usluge, setUsluge] = useState([])
    const [korisnici, setKorisnici] = useState([])
    const [odabraneUsluge, setOdabraneUsluge] = useState([])
    const [pretragaUsluga, setPretragaUsluga] = useState('')
    const [prikaziAutocomplete, setPrikaziAutocomplete] = useState(false)
    const [odabraniIndex, setOdabraniIndex] = useState(-1)
    const [popust, setPopust] = useState(false)


    useEffect(() => {
        ucitajUsluge()
        ucitajKorisnike()
    }, [])



    async function dodaj(ponuda) {
        //console.table(smjer)
        await PonudaService.dodaj(ponuda).then(() => {
            navigate(RouteNames.PONUDE)
        })
    }




    async function ucitajUsluge() {
        await UslugeService.get().then((odgovor) => {
            if (!odgovor.success) {
                alert('Nije implementiran servis za usluge')
                return
            }
            setUsluge(odgovor.data)
        })
    }
    async function ucitajKorisnike() {
        await KorisnikService.get().then((odgovor) => {
            if (!odgovor.success) {
                alert('Nije implementiran servis za korisnike')
                return
            }
            setKorisnici(odgovor.data)
        })
    }
    function dodajUslugu(usluga) {
        if (!odabraneUsluge.find(p => p.sifra === usluga.sifra)) {
            setOdabraneUsluge([...odabraneUsluge, usluga])
        }
        setPretragaUsluga('')
        setPrikaziAutocomplete(false)
        setOdabraniIndex(-1)
    }
    function ukloniUslugu(sifra) {
        setOdabraneUsluge(odabraneUsluge.filter(p => p.sifra !== sifra))
    }

    function filtrirajUsluge() {
        if (!pretragaUsluga) return []
        return usluge.filter(p =>
            !odabraneUsluge.find(op => op.sifra === p.sifra) &&
            (p.naziv.toLowerCase().includes(pretragaUsluga.toLowerCase()))
        )
    }
    function handleKeyDown(e) {
        const filtriraneUsluge = filtrirajUsluge()

        if (e.key === 'ArrowDown') {
            e.preventDefault()
            setOdabraniIndex(prev => {
                if (prev + 1 === filtriraneUsluge.length) {
                    return 0
                }
                return prev < filtriraneUsluge.length - 1 ? prev + 1 : prev
            }

            )
        } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            setOdabraniIndex(prev => {
                if (prev === 0) {
                    return filtriraneUsluge.length - 1
                }
                return prev > 0 ? prev - 1 : 0
            })
        } else if (e.key === 'Enter' && odabraniIndex >= 0 && filtriraneUsluge.length > 0) {
            e.preventDefault()
            dodajUslugu(filtriraneUsluge[odabraniIndex])
        } else if (e.key === 'Escape') {
            setPrikaziAutocomplete(false)
            setOdabraniIndex(-1)
        }
    }




    function odradiSubmit(e) { // e je event
        e.preventDefault() // nemoj odraditi submit
        const podaci = new FormData(e.target)


        dodaj({
            usluge: odabraneUsluge.map(u => u.sifra),
            korisnik: parseInt(podaci.get('korisnik')),
            popust: podaci.get('popust')==='' ? 0 : parseInt(podaci.get('popust')),
            datum:  new Date().toISOString()
        })
    }







    return (
        <>
            <h3>Unos nove ponude</h3>
            <Form onSubmit={odradiSubmit}>
                <Container className="mt-4">
                    
                    <Row>
                        {/* Lijeva strana - Podaci o ponudi */}
                        <Col md={6}>
                            <Card className="shadow-sm">
                                <Card.Body>
                                    <Card.Title className="mb-4">Podaci o ponudi</Card.Title>

                                    {/*korisnici */}
                                    <Form.Group controlId="korisnik" className="mb-3">
                                        <Form.Label className="fw-bold">Korisnici</Form.Label>
                                        <Form.Select name="korisnik" required>
                                            <option value="">Odaberite korisnika</option>
                                            {korisnici && korisnici.map((korisnik) => (
                                                <option key={korisnik.sifra} value={korisnik.sifra}>
                                                    {korisnik.ime} {korisnik.prezime}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                    
                                
                                        <Form.Group controlId="popust" className="mb-3 mt-md-3">
                                            
                                            <Form.Label className="fw-bold">Popust (%)</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="popust"
                                            placeholder="0"
                                        />
                                        </Form.Group>
                                  
                                </Card.Body>
                            </Card>
                        </Col>

                        {/* Desna strana - usluge */}
                        <Col md={6}>
                            <Card className="shadow-sm">
                                <Card.Body>
                                    <Card.Title className="mb-4">Usluge</Card.Title>

                                    {/* Autocomplete pretraga */}
                                    <Form.Group className="mb-3 position-relative">
                                        <Form.Label className="fw-bold">Dodaj usluge</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Pretraži usluge..."
                                            value={pretragaUsluga}
                                            onChange={(e) => {
                                                setPretragaUsluga(e.target.value)
                                                setPrikaziAutocomplete(e.target.value.length > 0)
                                                setOdabraniIndex(-1)
                                            }}
                                            onFocus={() => setPrikaziAutocomplete(pretragaUsluga.length > 0)}
                                            onKeyDown={handleKeyDown}
                                        />
                                        {prikaziAutocomplete && filtrirajUsluge().length > 0 && (
                                            <div className="position-absolute w-100 bg-white border rounded shadow-sm" style={{ zIndex: 1000, maxHeight: '200px', overflowY: 'auto' }}>
                                                {filtrirajUsluge().map((usluga, index) => (
                                                    <div
                                                        key={usluga.sifra}
                                                        className="p-2 cursor-pointer"
                                                        style={{
                                                            cursor: 'pointer',
                                                            backgroundColor: index === odabraniIndex ? '#007bff' : 'white',
                                                            color: index === odabraniIndex ? 'white' : 'black'
                                                        }}
                                                        onClick={() => dodajUslugu(usluga)}
                                                        onMouseEnter={(e) => {
                                                            setOdabraniIndex(index)
                                                        }}
                                                    >
                                                        {usluga.naziv} 
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </Form.Group>
                                    

                                    {/* Tablica odabranih polaznika */}
                                    {odabraneUsluge.length > 0 && (
                                        <div style={{ overflow: 'auto', maxHeight: '300px' }}>
                                            <Table striped bordered hover size="sm">
                                                <thead>
                                                    <tr>
                                                        <th>Naziv</th>
                                                        <th style={{ width: '80px' }}>Akcija</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {odabraneUsluge.map(usluga => (
                                                        <tr key={usluga.sifra}>
                                                            <td>{usluga.naziv} </td>
                                                            <td>
                                                                <Button
                                                                    variant="danger"
                                                                    size="sm"
                                                                    onClick={() => ukloniUslugu(usluga.sifra)}
                                                                >
                                                                    Obriši
                                                                </Button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>
                                        </div>

                                    )}
                                    {odabraneUsluge.length === 0 && (
                                        <p className="text-muted">Nema odabranih usluga</p>
                                    )}
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <hr className="my-4" />

                    {/* Gumbi za akciju */}
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <Link to={RouteNames.PONUDE} className="btn btn-danger px-4">
                            Odustani
                        </Link>
                        <Button type="submit" variant="success">
                            Dodaj novu ponudu
                        </Button>

                    </div>
                </Container>
            </Form>
        </>
    )

}
