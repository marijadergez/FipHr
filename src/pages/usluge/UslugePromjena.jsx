import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import UslugeService from "../../services/usluge/UslugeService";
import { RouteNames } from "../../constants";
import { Button, Col, Form, FormControl, FormGroup, Row } from "react-bootstrap";

export default function UslugePromjena(){

    const navigate = useNavigate
    const params = useParams
    const [usluge,setUsluge] =useState({})
    const [aktivan,setAktivan] =useState(false)

    useEffect(
        ()=>{
            ucitajUsluge()
        },[])

        async function ucitajUsluge() {
            await UslugeService.getBySifra(params.sifra).then((odgovor)=>{
                const s = odgovor.data
                s.datumPokretanja = s.datumPokretanja.substring(0,10)
                setUsluge(s)
                setAktivan(s.aktivan)
            })
            
        }

        async function primjeni(usluge) {
            await UslugeService.promjeni(params.sifra,usluge).then(()=>{
                navigate(RouteNames.USLUGE)
            })
            
        }

        function odradiSubmit(e){
            e.preventDefault()
            const podaci = new FormData(e.target)
            promjeni({
                naziv: podaci.get('naziv'),
                trajanje: parseInt(podaci.get('trajanje')),
                cijena: parseFloat(podaci.get('cijena')),
                datumPokretanja: new Date(podaci.get('datumPokretanja')).toISOString(),
                aktivan: aktivan

            })
        }

        return(
        <>
        <h3 className="mt-5">Unesite promjenu</h3>
          <Form onSubmit = {odradiSubmit}>
            <FormGroup controlId="naziv">
                <Form.Label>Unesite Naziv dosadašnje usluge ili opis</Form.Label>
                <FormControl  type="text" name="naziv" required/>
            </FormGroup>

            <Form.Group className="mt-5" controlId="datumPokretanja">
                    <Form.Label >Datum promjene koju unosite</Form.Label>
                    <Form.Control  type="date" name="datumPokretanja" />
                </Form.Group>


            <Form.Group className="mt-5" controlId="cijena">
                <Form.Label>Očekivana cijena izmjene</Form.Label>
                <Form.Control type="number" name="cijena" step={0.01} />

            </Form.Group>

             <Row className="mt-4">

                <Col>
                <Link to={RouteNames.USLUGE} className="btn btn-danger">
                Odustani
                </Link>
                </Col>

                <Col>
                <Button type="submit" variant="success">
                    Dodaj novu promjenu
                </Button>
                </Col>
                
                
                
                
            </Row>   






          </Form>
        
        
        </>

        )
    }

















