import { useEffect, useState } from "react"

import { Button, Table } from "react-bootstrap"
import { NumericFormat } from "react-number-format"

import { GrAdd, GrValidate } from "react-icons/gr"
import FormatDatuma from "../../components/FormatDatuma"
import { Link, useNavigate } from "react-router-dom"
import { RouteNames } from "../../constants"





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
        await gradoviService.obrisi(sifra)
        ucitajgradovi()
        
    }


    return (
        <>

            <Link to={RouteNames.GRAD}
                className="btn btn-success w-100 my-3">
                <GrAdd /> Dodaj novi grad
            </Link>

            <Table hover bordered responsive>

                <thead>
                    <tr>
                        <th>Naziv gradovi</th>
                        <th>Cijena </th>
                        <th>Popust</th>
                        
                        <th>Popust</th>

                    </tr>
                </thead>
                <tbody>
                    {gradovi && gradovi.map((grad) => (
                        <tr key={grad.sifra}>
                            <td>{grad.naziv}</td>

                            <td>
                                <NumericFormat
                                    value={grad.cijena}
                                    displayType={'text'}
                                    thousandSeparator='.'
                                    decimalSeparator=','
                                    suffix=' €'
                                    prefix='= '
                                    decimalScale={2}
                                    fixedDecimalScale />

                            </td>

                            <td>
                                <GrValidate
                                    size={25}
                                    color={grad.popust ? 'green' : 'red'}
                                />
                            </td>

                            <td>
                                <FormatDatuma datum={grad.datumPokretanja} />
                            </td>
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