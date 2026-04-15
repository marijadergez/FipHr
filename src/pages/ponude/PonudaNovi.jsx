import { Link, useNavigate } from "react-router-dom";
import PonudaService from "../../services/ponude/PonudaService";
import { RouteNames } from "../../constants";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { ponude } from "../../services/ponude/PonudaPodaci";
import { usluge } from "../../services/usluge/UslugePodaci";


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
            popust: podaci.get('aktivan') === 'on',
            cijena: parseFloat(podaci.get('cijena')),
            datumPokretanja: new Date(podaci.get('datumPokretanja'))
        })
    }

    return (
        <>
            <h3>Unos nove ponude</h3>
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
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            

                            <Form.Group controlId="Ponuda">
                                <Form.Label>Ponuda podaci</Form.Label>
                                <Form.Select name="Ponuda" required>
                                    <option key={0} value="">Odaberite ponudu</option>
                                    {ponude && ponude.map((ponuda) => (
                                        <option key={ponuda.sifra} value={ponuda.sifra}>
                                            {ponuda.naziv}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>






                            <Col md={6}>
                                <Form.Group controlId="popust" className="mb-3 mt-md-3">
                                    <Form.Check
                                        type="switch"
                                        label="Usluga iz ponude je na popustu"
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




    return (
        <>
            <h3>Unos nove ponude</h3>
            <Form onSubmit={odradiSubmit}>
                <Container className="mt-4">
                    <Row>
                        {/* Lijeva strana - Podaci o grupi */}
                        <Col md={6}>
                            <Card className="shadow-sm">
                                <Card.Body>
                                    <Card.Title className="mb-4">Podaci o ponudi</Card.Title>

                                    {/* Naziv */}
                                    <Form.Group controlId="naziv" className="mb-3">
                                        <Form.Label className="fw-bold">Naziv</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="naziv"
                                            placeholder="Unesite naziv ponude "
                                            required
                                        />
                                    </Form.Group>

                                    {/* Smjer */}
                                    <Form.Group controlId="smjer" className="mb-3">
                                        <Form.Label className="fw-bold">Usluge</Form.Label>
                                        <Form.Select name="smjer" required>
                                            <option value="">Odaberite uslugu</option>
                                            {usluge && usluge.map((Usluga) => (
                                                <option key={usluge.sifra} value={usluge.sifra}>
                                                    {usluge.naziv}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Card.Body>
                            </Card>
                        </Col>

                        {/* Desna strana - Polaznici */}
                        <Col md={6}>
                            <Card className="shadow-sm">
                                <Card.Body>
                                    <Card.Title className="mb-4">Korisnici</Card.Title>

                                    {/* Autocomplete pretraga */}
                                    <Form.Group className="mb-3 position-relative">
                                        <Form.Label className="fw-bold">Dodaj korisnika</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Pretraži polaznika..."
                                            value={pretragaKorisnka}
                                            onChange={(e) => {
                                                setPretragaKorisnka(e.target.value)
                                                setPrikaziAutocomplete(e.target.value.length > 0)
                                                setOdabraniIndex(-1)
                                            }}
                                            onFocus={() => setPrikaziAutocomplete(pretragaKorisnka.length > 0)}
                                            onKeyDown={handleKeyDown}
                                        />
                                        {prikaziAutocomplete && filtrirajKorisnike().length > 0 && (
                                            <div className="position-absolute w-100 bg-white border rounded shadow-sm" style={{ zIndex: 1000, maxHeight: '200px', overflowY: 'auto' }}>
                                                {filtrirajKorisnkae().map((polaznik, index) => (
                                                    <div
                                                        key={polaznik.sifra}
                                                        className="p-2 cursor-pointer"
                                                        style={{
                                                            cursor: 'pointer',
                                                            backgroundColor: index === odabraniIndex ? '#007bff' : 'white',
                                                            color: index === odabraniIndex ? 'white' : 'black'
                                                        }}
                                                        onClick={() => dodajPolaznika(polaznik)}
                                                        onMouseEnter={(e) => {
                                                            setOdabraniIndex(index)
                                                        }}
                                                    >
                                                        {polaznik.ime} {polaznik.prezime}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </Form.Group>

                                    {/* Tablica odabranih polaznika */}
                                    {odabraniPolaznici.length > 0 && (
                                        <div style={{ overflow: 'auto', maxHeight: '300px' }}>
                                            <Table striped bordered hover size="sm">
                                                <thead>
                                                    <tr>
                                                        <th>Ime i prezime</th>
                                                        <th style={{ width: '80px' }}>Akcija</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {odabraniPolaznici.map(polaznik => (
                                                        <tr key={polaznik.sifra}>
                                                            <td>{polaznik.ime} {polaznik.prezime}</td>
                                                            <td>
                                                                <Button
                                                                    variant="danger"
                                                                    size="sm"
                                                                    onClick={() => ukloniPolaznika(polaznik.sifra)}
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
                                    {odabraniPolaznici.length === 0 && (
                                        <p className="text-muted">Nema odabranih polaznika</p>
                                    )}
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <hr className="my-4" />

                    {/* Gumbi za akciju */}
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <Link to={RouteNames.GRUPE} className="btn btn-danger px-4">
                            Odustani
                        </Link>
                        <Button type="submit" variant="success">
                            Dodaj novu grupu
                        </Button>
                    </div>
                </Container>
            </Form>
        </>
    )
} */