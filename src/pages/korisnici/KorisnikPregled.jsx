import { useEffect, useState } from "react"
import KorisnikService from "../../services/korisnici/KorisnikService"
import { Button, Table } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { RouteNames } from "../../constants"


export default function KorisnikPregled(){

    const navigate = useNavigate()

    const [korisnici,setKorisnici] = useState([])

    useEffect(()=>{
        ucitajKorisnika()
    },[])

    async function ucitajKorisnika() {
        await KorisnikService.get().then((odgovor)=>{
            if(!odgovor.success){
                alert('Nije implementiran servis')
                return
            }
            setKorisnici(odgovor.data)
        })
    }

    async function brisanje(sifra) {
        if (!confirm('Sigurno obrisati?')) return;
        await KorisnikService.obrisi(sifra);
        await KorisnikService.get().then((odgovor)=>{
            setKorisnici(odgovor.data)
        })
    }

    return(
        <>
        <Link to={RouteNames.KORISNICI_NOVI}
        className="btn btn-success w-100 my-3">
            Dodavanje novog korisnika
        </Link>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Ime</th>
                    <th>Prezime</th>
                    <th>Email</th>
                    <th>Grad</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {korisnici && korisnici.map((korisnik)=>(
                    <tr key={korisnik.sifra}>
                        <td className="lead">{korisnik.ime}</td>
                        <td className="lead">{korisnik.prezime}</td>
                        <td>{korisnik.email}</td>
                        <td>{korisnik.oib}</td>
                        <td>
                            <Button onClick={()=>{navigate(`/korisnici/${korisnik.sifra}`)}}>
                                Promjeni
                            </Button>
                            &nbsp;&nbsp;
                            <Button variant="danger" onClick={() => brisanje(korisnik.sifra)}>
                                Obriši
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
        </>
    )
}
