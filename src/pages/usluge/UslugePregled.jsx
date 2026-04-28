import { useEffect, useState } from "react"
import UslugeService from "../../services/usluge/UslugeService"
import { Button, Table } from "react-bootstrap"
import { NumericFormat } from "react-number-format"
import { GrAdd, GrValidate } from "react-icons/gr"
import FormatDatuma from "../../components/FormatDatuma"
import { Link, useNavigate } from "react-router-dom"
import { RouteNames } from "../../constants"
import { IME_APLIKACIJE } from "../../constants"
import { gradovi } from "../../services/gradovi/GradPodaci"

import {UslugePregledTablica} from "../usluge/UslugePregledTablica"
import {UslugePregledGrid} from "../usluge/UslugePregledGrid"
import useLoading from "../../hooks/useLoading"
import useBreakpoint from "../../hooks/useBreakpoint"

export default function UslugePregled() {

    const navigate = useNavigate()
     const sirina = useBreakpoint();
    const [usluge, setUsluge] = useState([])
    const { showLoading, hideLoading } = useLoading()

     useEffect(()=>{document.title='Usluge, ' + IME_APLIKACIJE})

    useEffect(() => {
        ucitajUsluge()
    }, [])

    async function ucitajUsluge() {
        showLoading();
        await UslugeService.get().then((odgovor) => {
            if (!odgovor.success) {
                alert('Nije implementiran servis')
                return
            }
            setUsluge(odgovor.data)
            hideLoading()
        })

    }

    async function obrisi(sifra) {
        if(!confirm('Sigurno obrisati?')){
            return

            const gradRezultat = await GradService.get();
        if (gradRezultat.success) {
            const gradKojiKoristiUslugu = gradRezultat.data.filter(gradovi => grad.usluga === sifra);

            if (gradKojiKoristiUslugu.length > 0) {
                alert(`Ne možete obrisati ovaj smjer jer je postavljen na ${gradKojiKoristiUslugu.length} grupa/e. Prvo obrišite ili promijenite smjer u tim grupama.`);
                return;
            }
        }

        showLoading()



        }
        await new Promise(resolve => setTimeout(resolve, 2000));
        await UslugeService.obrisi(sifra)
        await UslugeService.get().then((odgovor) => {
        ucitajUsluge(odgovor.data)
        
    })

        hideLoading()
    }


    return (

         <>
            <Link to={RouteNames.USLUGE_NOVI}
                className="btn btn-success w-100 my-3">
                Dodavanje nove usluge
            </Link>
            {/* tableti prema manje */}
            {['xs', 'sm', 'md'].includes(sirina) ? (
                <UslugePregledGrid 
                    usluge={usluge} 
                    navigate={navigate} 
                    brisanje={brisanje} 
                />
            ) : (
                <UslugePregledTablica
                    usluge={usluge}  
                    navigate={navigate} 
                    brisanje={brisanje} 
                />
            )}



        </>
   )
}



        {/*<>

            <Link to={RouteNames.USLUGE_NOVI}
                className="btn btn-success w-100 my-3">
                <GrAdd /> Dodaj novu uslugu
            </Link>

            <Table hover bordered responsive>

                <thead>
                    <tr>
                        <th>Naziv usluge</th>
                        <th>Cijena </th>
                        <th>Popust</th>
                        <th>Datum upisa</th>
                        <th>Akcija</th>

                    </tr>
                </thead>
                <tbody>
                    {usluge && usluge.map((usluga) => (
                        <tr key={usluga.sifra}>
                            <td>{usluga.naziv}</td>

                            <td>
                                <NumericFormat
                                    value={usluga.cijena}
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
                                    color={usluga.popust ? 'green' : 'red'}
                                />
                            </td>

                            <td>
                                <FormatDatuma datum={usluga.datumPokretanja} />
                            </td>
                            <td>

                                <Button onClick={()=>{navigate(`/usluge/${usluga.sifra}`)}}>
                                    Promjeni
                                </Button>
                                        &nbsp;&nbsp;

                                <Button variant="danger" onClick={()=>{obrisi(usluga.sifra)}}> 
                                    Obriši
                                </Button>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </Table>
        </>*/}
 