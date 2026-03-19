import { useEffect, useState } from "react"
import UslugeService from "../../services/usluge/UslugeService"
import { Table } from "react-bootstrap"
import { NumericFormat } from "react-number-format"
import {FormatDatuma} from "react-number-format"
import { GrValidate } from "react-icons/gr"




export default function UslugePregled() {

    const [usluge, setUsluge] = useState([])

    useEffect(() => {
        ucitajUsluge()
    }, [])

    async function ucitajUsluge() {
        await UslugeService.get().then((odgovor) => {
            setUsluge(odgovor.data)
        })

    }


    return (
        <>
            <Table>

                <thead>
                    <tr>
                        <th>Naziv usluge</th>
                        <th>Cijena jedan mjesec</th>
                        <th>Cijena godišnja</th>
                        <th>Paket više usluga</th>
                        <th>Popust</th>
                    </tr>
                </thead>
                <tbody>
                    {usluge && usluge.map((usluge) => (
                        <tr>
                            <td>{usluge.naziv}</td>
                            <td>{usluge.trajanje} h</td>
                            <td>
                                <NumericFormat
                                    value={usluge.cijena}
                                    displayType={'text'}
                                    thousandSeparator='.'
                                    decimalSeparator=','
                                    suffix=' €'
                                    prefix=' ='
                                    decimalScale={2}
                                    fixedDecimalScale  />

                            </td>
                            <td>
                                <FormatDatuma datum={usluge.datumPokretanja} />
                            </td>
                            <td>
                                <GrValidate
                                    size={25}
                                    color={usluge.aktivan ? 'green' : 'red'}
                                />
                            </td>
                            <td></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}