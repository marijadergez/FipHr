import { useEffect, useState } from "react"
import UslugeService from "../../services/usluge/UslugeService"






export default function UslugePregled() {

    const [usluge, setUsluge] = useState([])

    useEffect(()=>{
        ucitajUsluge()
    },[])

    async function ucitajUsluge() {
        await UslugeService.get().then((odgovor)=>{
            setUsluge(odgovor.data)
        })
        
    }


    return (
        <>
        <ol>
        {usluge && usluge.map((usluge)=>(
            <li>{usluge.naziv} </li>
        )        
        )}

        </ol>


        </>
 )}