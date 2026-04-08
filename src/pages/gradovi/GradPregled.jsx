import { useEffect, useState } from "react"

import { Button, Table } from "react-bootstrap"
import { NumericFormat } from "react-number-format"

import { GrAdd, GrValidate } from "react-icons/gr"
import FormatDatuma from "../../components/FormatDatuma"
import { Link, useNavigate } from "react-router-dom"
import { RouteNames } from "../../constants"
import GradService from "../../services/gradovi/GradService"





export default function gradoviPregled() {

    const navigate = useNavigate()
    const [gradovi, setgradovi] = useState([])

    useEffect(() => {
        ucitajgradovi()
    }, [])

    async function ucitajgradovi() {
        await GradService.get().then((odgovor) => {
            setgradovi(odgovor.data)
        })

    }

    async function obrisi(sifra) {
        if(!confirm('Sigurno obrisati?')){
            return
        }
        await GradService.obrisi(sifra)
        ucitajgradovi()
        
    }


    return (
        <>

            <Link to={RouteNames.GRADOVI_NOVI}
                className="btn btn-success w-100 my-3">
                <GrAdd /> Dodaj novi grad
            </Link>

            <Table hover bordered responsive>

                <thead>
                    <tr>
                        <th>Naziv</th>
                        <th>Akcija</th>

                    </tr>
                </thead>
                <tbody>
                    {gradovi && gradovi.map((grad) => (
                        <tr key={grad.sifra}>
                            <td>{grad.naziv}</td>

                            
                          
                           
                            <td>

                                <Button onClick={()=>{navigate(`/gradovi/${grad.sifra}`)}}>
                                    Promjeni
                                </Button>
                                        &nbsp;&nbsp;

                                <Button variant="danger" onClick={()=>{obrisi(grad.sifra)}}> 
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