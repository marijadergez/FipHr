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
import GradService from "../../services/gradovi/GradService"

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
        async function generirajPDFZaPonudu(ponuda) {
        // Dohvati smjer
        const korisnik = korisnici.find(s => s.sifra === ponuda.korisnik)
        if (!usluge) {
            alert('Korisnik nije pronađen')
            return
        }

        // Dohvati sve polaznike
        const odgovorUsluge = await UslugeService.get()
        if (!odgovorUsluge.success) {
            alert('Nije moguće dohvatiti usluge')
            return
        }

        // Filtriraj polaznike koji pripadaju ovoj grupi
        const uslugePonude = odgovorUsluge.data.filter(p =>
            ponuda.usluge && ponuda.usluge.includes(p.sifra)
        )

    
    const gradoviPodaci = await GradService.get()

    const gradovi = gradoviPodaci.data

    const imeGrada = gradovi.find(g=>g.sifra = korisnik.grad).naziv
    const dtoKorisnik = {...korisnik, grad: imeGrada}
    //console.table(korisnik)
    //console.table(dtoKorisnik)
        // Generiraj PDF
        const generiraj = GrupaPDFGenerator({
            ponuda,
            korisnik: dtoKorisnik,
            usluge: uslugePonude
            
        })
        await generiraj()
    
    

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
                                <Button variant="info" onClick={() => generirajPDFZaPonudu(ponuda)} title="Generiraj PDF">
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