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

import GrupaPDFGenerator from "../../components/KorisniciPDFGenerator"
import { FaEdit, FaFilePdf, FaTrash } from "react-icons/fa"

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
        async function generirajPDFZaKorisnici(korisnici) {
        // Dohvati smjer
        const usluge = usluge.find(s => s.sifra === usluge.ponuda)
        if (!usluge) {
            alert('Usluga nije pronađena')
            return
        }

        // Dohvati sve polaznike
        const odgovorKorisnici = await KorisnikService.get()
        if (!odgovorKorisnici.success) {
            alert('Nije moguće dohvatiti polaznike')
            return
        }

        // Filtriraj polaznike koji pripadaju ovoj grupi
        const korisniciUsluge = odgovorKorisnici.data.filter(p =>
            usluge.korisnici && usluge.korisnici.includes(p.sifra)
        )

        // Generiraj PDF
        const generiraj = GrupaPDFGenerator({
            ponude,
            usluge,
            korisnici: korisniciUsluge
        })
        await generiraj()
    
    


    

      
    




    return (
        <>
            <Link to={RouteNames.PONUDE_NOVI}
                className="btn btn-success w-100 my-3">
                <GrAdd /> Dodaj novu ponudu
            </Link>
            <Table hover bordered responsive>
                <thead>
                    <tr>
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
                            <td>{dohvatiNazivKorisnika(ponuda.korisnik)}</td>
                            <td>{dohvatiNaziveUsluga(ponuda.usluge)}</td>
                            <td> <FormatDatuma datum={ponuda.datum} /></td>
                                                        
                            <td>{ponuda.popust===0 ? '' : ponuda.popust + ' %'}</td>
                            <td>

                                
                                <Button onClick={() => { navigate(`/ponude/${ponuda.sifra}`) }}title="Promjeni">
                                   <FaEdit /> 
                                </Button>
                                &nbsp;&nbsp;
                                <FaTrash 
                                   onClick={() => brisanje(ponuda.sifra)} 
                                   title="Obriši" 
                                   style={{cursor: 'hand'}}
                                   color="red"/>
                                

                                 &nbsp;&nbsp;
                                <Button variant="info" onClick={() => generirajPDFZaGrupu(grupa)} title="Generiraj PDF">
                                    <FaFilePdf />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )

}
}