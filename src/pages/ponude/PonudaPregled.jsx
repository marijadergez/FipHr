import { useEffect, useState } from "react"

import { Button, Table } from "react-bootstrap"
import { NumericFormat } from "react-number-format"

import { GrAdd, GrValidate } from "react-icons/gr"
import FormatDatuma from "../../components/FormatDatuma"
import { Link, useNavigate } from "react-router-dom"
import { RouteNames } from "../../constants"

import PonudaService from "../../services/ponude/PonudaService";
import PonudaNovi from "./PonudaNovi"





export default function PonudaPregled() {

    const navigate = useNavigate()
    const [ponude, setPonuda] = useState([])

    useEffect(() => {
        ucitajPonude()
    }, [])

    async function ucitajPonude() {
        await PonudaService.get().then((odgovor) => {
            if(!odgovor.success){
                alert('Nije implementiran servis')
                return
            }
            setPonuda(odgovor.data)
        })

    }

    async function obrisi(sifra) {
        if (!confirm('Sigurno obrisati?')) {
            return
        }
        await PonudaService.obrisi(sifra)
        ucitajPonude()

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
                        <th>Akcija</th>
                        <th>Datum pokretanja</th>
                        <th>Cijena</th>
                        <th>Popust</th>

                    </tr>
                </thead>
                <tbody>
                    {ponude && ponude.map((ponuda) => (
                        <tr key={ponuda.sifra}>
                            <td>{ponuda.korisnik}</td>




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