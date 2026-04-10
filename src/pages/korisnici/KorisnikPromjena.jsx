import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import KorisnikService from "../../services/korisnici/KorisnikService"
import { Button, Col, Form, Row } from "react-bootstrap"
import { RouteNames } from "../../constants"
import GradService from "../../services/gradovi/GradService"

export default function KorisnikPromjena() {

    const navigate = useNavigate()
    const params = useParams()
    const [korisnik, setKorisnik] = useState({})
    const [gradovi, setGradovi] = useState([])
    const [email, setEmail] = useState([])


    useEffect(() => {
        ucitajKorisnika()
        ucitajgradovi()
        ucitajEmail()
    }, [])

    async function ucitajgradovi() {
        await GradService.get().then((odgovor) => {
            setGradovi(odgovor.data)
        })

    }

    async function ucitajKorisnika() {
        await KorisnikService.getBySifra(params.sifra).then((odgovor) => {
            if (!odgovor.success) {
                alert('Nije implementiran servis')
                return
            }
            setKorisnik(odgovor.data)
        })
    }

    async function promjeni(korisnik) {
        await KorisnikService.promjeni(params.sifra, korisnik).then(() => {
            navigate(RouteNames.KORISNICI)
        })
    }

    async function ucitajEmail() {
        setEmail(korisnik.email)
    }

    function odradiSubmit(e) {
        e.preventDefault()
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





        promjeni({
            ime: podaci.get('ime'),
            prezime: podaci.get('prezime'),
            email: podaci.get('email'),
            grad: parseInt(podaci.get('grad'))

        })
    }

    return (
        <>
            <h3>Promjena korisnika</h3>
            <Form onSubmit={odradiSubmit}>
                <Form.Group controlId="ime">
                    <Form.Label>Ime</Form.Label>
                    <Form.Control type="text" name="ime" required
                        defaultValue={korisnik.ime} />
                </Form.Group>


                <Form.Group controlId="prezime">
                    <Form.Label>Prezime</Form.Label>
                    <Form.Control type="text" name="prezime" required
                        defaultValue={korisnik.prezime} />
                </Form.Group>


                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" required
                        defaultValue={korisnik.email} />
                </Form.Group>
                
                <hr />


                <Form.Group controlId="grad">
                    <Form.Label>Grad</Form.Label>
                    <Form.Select name="grad" required value={korisnik.grad || ''} onChange={(e) => setKorisnik({ ...korisnik, grad: parseInt(e.target.value) })}>
                        <option key={0} value="">Odaberite grad</option>
                        {gradovi && gradovi.map((grad) => (
                            <option key={gradovi.sifra} value={grad.sifra}>
                                {grad.naziv}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>






                <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                    <Link to={RouteNames.KORISNICI} className="btn btn-danger px-4">
                        Odustani
                    </Link>
                    <Button type="submit" variant="success">
                        Promjeni korisnika
                    </Button>
                </div>

            </Form>
        </>
    )
}
