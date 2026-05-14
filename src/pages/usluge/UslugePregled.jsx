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

import UslugePregledTablica from "../usluge/UslugePregledTablica"
import UslugePregledGrid from "../usluge/UslugePregledGrid"

import useLoading from "../../hooks/useLoading"
import useBreakpoint from "../../hooks/useBreakpoint"

export default function UslugePregled() {


    const [usluge, setUsluge] = useState([])
    const { showLoading, hideLoading } = useLoading()
    const navigate = useNavigate()
    const sirina = useBreakpoint();

    useEffect(() => { document.title = 'Usluge, ' + IME_APLIKACIJE })

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




    async function brisanje(sifra) {
        if (!confirm('Sigurno obrisati?')) {
            return

            const uslugaRezultat = await Service.get();
            if (uslugaRezultat.success) {
                const uslugaKojaKoristiponudu = uslugaRezultat.data.filter(usluge => ponuda.usluga === sifra);

                if (uslugaKojiKoristiUslugu.length > 0) {
                    alert(`Ne možete obrisati ovu uslugu ili ponudu jer je postavljen na ${ponudaKojaKoristiUslugu.length} ponude. Prvo obrišite ili promijenite usluge u tim ponudama.`);
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


