import { Button, Col, Form, Row } from "react-bootstrap"
import { RouteNames } from "../../constants"
import { Link, useNavigate } from "react-router-dom"
import KorisnikService from "../../services/korisnici/KorisnikService"
import GradService from "../../services/gradovi/GradService"
import { useEffect, useState } from "react"
import { gradovi } from "../../services/gradovi/GradPodaci"


export default function KorisnikNovi() {

    const navigate = useNavigate()
    const [gradovi, setGradovi] = useState([])

      useEffect(() => {
            ucitajgradovi()
        }, [])
    
        async function ucitajgradovi() {
            await GradService.get().then((odgovor) => {
                setGradovi(odgovor.data)
            })
    
        }
    

    async function dodaj(korisnik) {
        await KorisnikService.dodaj(korisnik).then(() => {
            navigate(RouteNames.KORISNICI)
        })
    }

    function odradiSubmit(e) { // e je event
        e.preventDefault() // nemoj odraditi submit
        const podaci = new FormData(e.target)

        // --- KONTROLA 1: Ime (Postojanje) ---
        if (!podaci.get('ime') || podaci.get('ime').trim().length === 0) {
            alert("Ime je obavezno i ne smije sadržavati samo razmake!");
            return;
        }

        // --- KONTROLA 2: Ime (Minimalna duljina) ---
        if (podaci.get('ime').trim().length < 2) {
            alert("Ime mora imati najmanje 2 znaka!");
            return;
        }

        // --- KONTROLA 3: Prezime (Postojanje) ---
        if (!podaci.get('prezime') || podaci.get('prezime').trim().length === 0) {
            alert("Prezime je obavezno i ne smije sadržavati samo razmake!");
            return;
        }

        // --- KONTROLA 4: Prezime (Minimalna duljina) ---
        if (podaci.get('prezime').trim().length < 2) {
            alert("Prezime mora imati najmanje 2 znaka!");
            return;
        }

        // --- KONTROLA 5: Email (Postojanje) ---
        if (!podaci.get('email') || podaci.get('email').trim().length === 0) {
            alert("Email je obavezan!");
            return;
        }

        // --- KONTROLA 6: Email (Format) ---
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(podaci.get('email'))) {
            alert("Email nije u ispravnom formatu!");
            return;
        }

        

      


        dodaj({
            ime: podaci.get('ime'),
            prezime: podaci.get('prezime'),
            email: podaci.get('email'),
            grad: parseInt(podaci.get('grad'))
        })
    }

    return (
        <>
            <h3>Unos novog korisnika</h3>
            <Form onSubmit={odradiSubmit}>
                <Form.Group controlId="ime">
                    <Form.Label>Ime</Form.Label>
                    <Form.Control type="text" name="ime" required />
                </Form.Group>

                <Form.Group controlId="prezime">
                    <Form.Label>Prezime</Form.Label>
                    <Form.Control type="text" name="prezime" required />
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" required />
                </Form.Group>

                <hr />

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


                <Row className="mt-4">
                    <Col>
                        <Link to={RouteNames.KORISNICI} className="btn btn-danger">
                            Odustani
                        </Link>
                    </Col>
                    <Col>
                        <Button type="submit" variant="success">
                            Dodaj novog korisnika
                        </Button>
                    </Col>
                </Row>

            </Form>
        </>
    )
}
