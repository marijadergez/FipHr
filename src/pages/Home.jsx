import { IME_APLIKACIJE } from "../constants";
import { Col, Row, Card, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import KorisnikService from "../services/korisnici/korisnikService";
import GradService from "../services/gradovi/GradService";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import React from 'react';
import PonudaService from "../services/ponude/PonudaService";
import UslugeService from "../services/usluge/UslugeService";
import OperaterService from "../services/operateri/OperaterService";

export default function Home() {



    const [brojUsluga, setBrojUsluga] = useState(0);
    const [brojKorisnika, setBrojKorisnika] = useState(0);
    const [brojGradova, setBrojGradova] = useState(0);
    const [animatedUsluge, setAnimatedUsluge] = useState(0);
    const [animatedKorisnici, setAnimatedKorisnici] = useState(0);
    const [animatedGradovi, setAnimatedGradovi] = useState(0);
    const [brojPonuda, setBrojPonuda] = useState(0);
    const [animatedPonude, setAnimatedPonude] = useState(0)
     const [animatedOperateri, setAnimatedOperateri] = useState(0);

    const lottieStyle = {
        marginTop: '10px',
        width: ',',
        high: 'auto',
        display: 'block'
    }


    useEffect(() => { document.title = 'Početna, ' + IME_APLIKACIJE })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const uslugeRezultat = await UslugeService.get();
                const korisnici = await KorisnikService.get();
                const gradovi = await GradService.get();
                const ponude = await PonudaService.get();

                setBrojUsluga(uslugeRezultat.data.length);
                setBrojKorisnika(korisnici.data.length);
                setBrojGradova(gradovi.data.length);
                setBrojPonuda(ponude.data.length);
            } catch (error) {
                console.error('Greška pri dohvaćanju podataka:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (animatedUsluge < brojUsluga) {
            const timer = setTimeout(() => {
                setAnimatedUsluge(prev => Math.min(prev + 1, brojUsluga));
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [animatedUsluge, brojUsluga]);

    useEffect(() => {
        if (animatedKorisnici < brojKorisnika) {
            const timer = setTimeout(() => {
                setAnimatedKorisnici(prev => Math.min(prev + 1, brojKorisnika));
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [animatedKorisnici, brojKorisnika]);

    useEffect(() => {
        if (animatedGradovi < brojGradova) {
            const timer = setTimeout(() => {
                setAnimatedGradovi(prev => Math.min(prev + 1, brojGradova));
            }, 200);
            return () => clearTimeout(timer);
        }
    }, [animatedGradovi, brojGradova]);

    useEffect(() => {
        if (animatedPonude < brojPonuda) {
            const timer = setTimeout(() => {
                setAnimatedPonude(prev => Math.min(prev + 1, brojPonuda));
            }, 200);
            return () => clearTimeout(timer);
        }
    }, [animatedPonude, brojPonuda]);


    

    return (
        <Container>
            <Row>
                <Col md={6}>
                    <p className="lead m-5 text-center">Dobrodošli na {IME_APLIKACIJE}</p>

                    <p>Knjigovodstvo i računovodstvo za velike i male tvrtke i obrtnike.</p>

                    <div>
                        <DotLottieReact
                            src="https://lottie.host/510411c5-d9ea-4e75-8829-efc1a022a9a6/mGH3ToWnVo.lottie"
                            loop
                            autoplay
                            style={lottieStyle}
                        />
                    </div>
                    {/*<div style={{ textAlign: 'center' }}>
                        <img src="" />
                    </div>*/}

                </Col>
                <Col className="d-flex align-items-center justify-content-center">
                    <div style={{ width: '100%', maxWidth: '400px' }}>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Card className="mb-3 shadow-lg border-0 statistikaPanel">
                                    <Card.Body className="text-center">
                                        <p className="text-white">Usluge</p>
                                        <div className="statistikaTekst">
                                            {animatedUsluge}
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        
                            <Col md={6} className="mb-3">
                                <Card className="mb-3 shadow-lg border-0 statistikaPanel">
                                    <Card.Body className="text-center">
                                        <p className="text-white">Korisnici</p>
                                        <div className="statistikaTekst">
                                            {animatedKorisnici}
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Card className="shadow-lg border-0 statistikaPanel">
                                    <Card.Body className="text-center">
                                        <p className="text-white">Gradovi</p>
                                        <div className="statistikaTekst">
                                            {animatedGradovi}
                                        </div>
                                    </Card.Body>

                                </Card>
                            </Col>
                        
                            <Col md={6} className="mb-3">
                                <Card className="shadow-lg border-0 statistikaPanel">
                                    <Card.Body className="text-center">
                                        <p className="text-white">Ponude</p>
                                        <div className="statistikaTekst">
                                            {animatedPonude}
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>                            
                        </Row>
                        <Row>
                            <div style={{ width: '100%', maxWidth: '500px' }}>
                           <Col md={6} className="mb-3">
                            <Card className="shadow-lg border-0 statistikaPanel h-100">
                                <Card.Body className="text-center">
                                    <p className="text-white">Operateri</p>
                                    <div className="statistikaTekst">
                                        {animatedOperateri}
                                    </div>
                                    <div style={{ fontSize: '0.9rem', marginTop: '10px' }}>
                                        <span className="badge bg-danger me-2">Admin: {brojAdmina}</span>
                                        <span className="badge bg-primary">Korisnik: {brojKorisnika}</span>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col> 
                        </div>
                        </Row>
                    </div>
         
                </Col>
            </Row>
        </Container>
    )
}




