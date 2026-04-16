import { Link, useNavigate } from "react-router-dom";
import PonudaService from "../../services/ponude/PonudaService";
import { RouteNames } from "../../constants";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { ponude } from "../../services/ponude/PonudaPodaci";
import { usluge } from "../../services/usluge/UslugePodaci";
import { useEffect, useState } from "react";
import KorisnikService from "../../services/korisnici/KorisnikService";
import UslugeService from "../../services/usluge/UslugeService";



export default function PonudaNovi() {

    const navigate = useNavigate()
    const [usluge, setUsluge] = useState([])
    const [korisnici, setKorisnici] = useState([])
    const [odabraniKorisnici, setOdabraniKorisnici] = useState([])
    const [ pretragaKorisnika, setPretragaKorisnka] = useState([])
     const [prikaziAutocomplete, setPrikaziAutocomplete] = useState(false)
    const [odabraniIndex, setOdabraniIndex] = useState(-1)

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
    function dodajKorisnika(korisnik) {
        if (!odabraniKorisnici.find(p => p.sifra === korisnik.sifra)) {
            setOdabraniKorisnici([...odabraniKorisnici, korisnik])
        }
        setPretragaKorisnka('')       
        setPrikaziAutocomplete(false)
        setOdabraniIndex(-1)
    }
    function ukloniKorisnika(sifra) {
        setOdabraniKorisnici(odabraniKorisnici.filter(p => p.sifra !== sifra))
    }

     function filtrirajKorisnike() {
        if (!pretragaKorisnika) return []
        return korisnici.filter(p =>
            !odabraniKorisnici.find(op => op.sifra === p.sifra) &&
            (p.ime.toLowerCase().includes(pretragaKorisnika.toLowerCase()) ||
                p.prezime.toLowerCase().includes(pretragaKorisnika.toLowerCase()))
        )
    }
    function handleKeyDown(e) {
        const filtriraniKorisnici = filtrirajKorisnike()

        if (e.key === 'ArrowDown') {
            e.preventDefault()
            setOdabraniIndex(prev => {
                if (prev + 1 === filtriraniKorisnici.length) {
                    return 0
                }
                return prev < filtriraniKorisnici.length - 1 ? prev + 1 : prev
            }

            )
        } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            setOdabraniIndex(prev => {
                if(prev===0){
                    return filtriraniKorisnici.length-1
                }
                return prev > 0 ? prev - 1 : 0
            })
        } else if (e.key === 'Enter' && odabraniIndex >= 0 && filtriraniKorisnici.length > 0) {
            e.preventDefault()
            dodajKorisnika(filtriraniKorisnici[odabraniIndex])
        } else if (e.key === 'Escape') {
            setPrikaziAutocomplete(false)
            setOdabraniIndex(-1)
        }
    }

    async function dodaj(grad) {
        await GradService.dodaj(grad).then(() => {
            navigate(RouteNames.GRADOVI)
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
         if (!podaci.get('smjer') || podaci.get('smjer') === "") {
            alert("Morate odabrati smjer!");
            return;
        }
        


        if (!podaci.get('datumPokretanja') || podaci.get('datumPokretanja') === "") {
            alert("Morate odabrati datum pokretanja!")
            return
        }
        if (podaci.get('ime').trim().length < 2) {
            alert("Ime mora imati najmanje 2 znaka!");
            return;
        }

        // --- KONTROLA 3: Prezime (Postojanje) ---
        if (!podaci.get('prezime') || podaci.get('prezime').trim().length === 0) {
            alert("Prezime je obavezno i ne smije sadržavati samo razmake!");
            return;
        }


         const odabranaUsluga = parseInt(podaci.get('smjer'));
        if (isNaN(odabranaUsluga) || odabranaUsluga <= 0) {
            alert("Odabrana usluga nije valjana!");
            return;
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
            usluge: odabranaUsluga,
            korisnici: odabraniKorisnici.map(p => p.sifra),
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
                <Row>
                    {/* Lijeva strana - Podaci o ponudi */}
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
                                <Form.Group controlId="usluge" className="mb-3">
                                    <Form.Label className="fw-bold">Usluge</Form.Label>
                                    <Form.Select name="usluge" required>
                                        <option value="">Odaberite uslugu</option>
                                        {usluge && usluge.map((usluge) => (
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
                                        value={pretragaKorisnika}
                                        onChange={(e) => {
                                            setPretragaKorisnka(e.target.value)
                                            setPrikaziAutocomplete(e.target.value.length > 0)
                                            setOdabraniIndex(-1)
                                        }}
                                        onFocus={() => setPrikaziAutocomplete(pretragaKorisnika.length > 0)}
                                        onKeyDown={handleKeyDown}
                                    />
                                    {prikaziAutocomplete && filtrirajKorisnike().length > 0 && (
                                        <div className="position-absolute w-100 bg-white border rounded shadow-sm" style={{ zIndex: 1000, maxHeight: '200px', overflowY: 'auto' }}>
                                            {filtrirajKorisnike().map((korisnik, index) => (
                                                <div
                                                    key={korisnik.sifra}
                                                    className="p-2 cursor-pointer"
                                                    style={{
                                                        cursor: 'pointer',
                                                        backgroundColor: index === odabraniIndex ? '#007bff' : 'white',
                                                        color: index === odabraniIndex ? 'white' : 'black'
                                                    }}
                                                    onClick={() => dodajKorisnika(korisnik)}
                                                    onMouseEnter={(e) => {
                                                        setOdabraniIndex(index)
                                                    }}
                                                >
                                                    {korisnik.ime} {korisnik.prezime}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </Form.Group>

                                {/* Tablica odabranih polaznika */}
                                {odabraniKorisnici.length > 0 && (
                                    <div style={{ overflow: 'auto', maxHeight: '300px' }}>
                                        <Table striped bordered hover size="sm">
                                            <thead>
                                                <tr>
                                                    <th>Ime i prezime</th>
                                                    <th style={{ width: '80px' }}>Akcija</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {odabraniKorisnici.map(korisnik => (
                                                    <tr key={korisnik.sifra}>
                                                        <td>{korisnik.ime} {korisnik.prezime}</td>
                                                        
                                                         <td>{dohvatiNazivGrada(korisnik.grad)}</td>
                                                        <td>
                                                            <Button
                                                                variant="danger"
                                                                size="sm"
                                                                onClick={() => ukloniKorisnika(korisnik.sifra)}
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
                                {odabraniKorisnici.length === 0 && (
                                    <p className="text-muted">Nema odabranih korisnika</p>
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
