import { useEffect, useState } from "react"

import { Button, Table } from "react-bootstrap"
import { NumericFormat } from "react-number-format"

import { GrAdd, GrValidate } from "react-icons/gr"
import FormatDatuma from "../../components/FormatDatuma"
import { Link, useNavigate } from "react-router-dom"
import { RouteNames } from "../../constants"

import PonudaService from "../../services/ponude/PonudaService";
import PonudaNovi from "./PonudaNovi"
import KorisnikService from "../../services/korisnici/KorisnikService"
import UslugeService from "../../services/usluge/UslugeService"

export default function PonudaPregled() {



    const navigate = useNavigate()
    const [ponude, setPonuda] = useState([])
    const [korisnici, setKorisnici] = useState([])
    const [usluge, setUsluge] = useState([])



    useEffect(() => {
        ucitajUsluge()
        ucitajKorisnika()
        ucitajPonude()
    }, [])

    async function ucitajPonude() {
        await PonudaService.get().then((odgovor) => {
            if (!odgovor.success) {
                alert('Nije implementiran servis')
                return
            }
            setPonuda(odgovor.data)
        })
    }

    async function ucitajUsluge() {
        await UslugeService.get().then((odgovor) => {
            setUsluge(odgovor.data)
        })

    }

    async function ucitajKorisnika() {
        await KorisnikService.get().then((odgovor) => {
            if (!odgovor.success) {
                alert('Nije implementiran servis')
                return
            }
            setKorisnici(odgovor.data)
        })
    }
    async function obrisi(sifra) {
        if (!confirm('Sigurno obrisati?')) {
            return
        }
        await PonudaService.obrisi(sifra)
        ucitajPonude()
    }
    function dohvatiNazivKorisnika(sifraKorisnika) {
        const korisnik = korisnici.find(s => s.sifra === sifraKorisnika)
        return korisnik ? korisnik.ime + ' ' + korisnik.prezime : 'Nepoznat korisnik'
    }


    const dohvatiNaziveUsluga = (uslugeNaPonudi) => {
        if (!uslugeNaPonudi || uslugeNaPonudi.length === 0) return 'Nema usluga';


        return uslugeNaPonudi
            .map(sifra => {
                const z = usluge.find(g => g.sifra === sifra);
                return z ? z.naziv : null;
            })
            .filter(n => n !== null)
            .join(', '); // Spaja nazive zarezom: "Rock, Pop"

    }

      
    




    return (
        <>
            <Link to={RouteNames.PONUDE_NOVI}
                className="btn btn-success w-100 my-3">
                <GrAdd /> Dodaj novu ponudu
            </Link>
            <Table hover bordered responsive>
                <thead>
                    <tr>
                        <th>Naziv</th>
                        <th>Korisnik</th>
                        <th>Usluge</th>
                        <th>Datum</th>
                        <th>Popust</th>
                        <th>Akcija</th>
                    </tr>
                </thead>
                <tbody>
                    {ponude && ponude.map((ponuda) => (
                        <tr key={ponuda.sifra}>
                             <td>{ponuda.naziv}</td>
                            <td>{dohvatiNazivKorisnika(ponuda.korisnik)}</td>
                            <td>{dohvatiNaziveUsluga(ponuda.usluge)}</td>
                            <td> <FormatDatuma datum={ponuda.datum} /></td>
                                                        
                            <td>{ponuda.popust===0 ? '' : ponuda.popust + ' %'}</td>
                            <td>
                                <Button onClick={() => { navigate(`/ponude/${ponuda.sifra}`) }}>
                                    Promjeni
                                </Button>
                                &nbsp;&nbsp;
                                <Button variant="danger" onClick={() => { obrisi(ponuda.sifra) }}>
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