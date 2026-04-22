import { IME_APLIKACIJE } from "../constants";

import { Col, Row, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import UslugaService from "../services/usluge/UslugeService";
import KorisnikService from "../services/korisnici/korisnikService";
import GradService from "../services/gradovi/GradService";
import UslugeService from "../services/usluge/UslugeService";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import React from 'react';


export default function Home() {



    const [brojUsluga, setBrojUsluga] = useState(0);
    const [brojKorisnika, setBrojKorisnika] = useState(0);
    const [brojGradova, setBrojGradova] = useState(0);
    const [animatedUsluge, setAnimatedUsluge] = useState(0);
    const [animatedKorisnici, setAnimatedKorisnici] = useState(0);
    const [animatedGradovi, setAnimatedGradovi] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const uslugeRezultat = await UslugeService.get();
                const korisnici = await KorisnikService.get();
                const gradovi = await GradService.get();

                setBrojUsluga(uslugeRezultat.data.length);
                setBrojKorisnika(korisnici.data.length);
                setBrojGradova(gradovi.data.length);
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



    return (
        <>
            <Row>
                <Col md={6}>
                    <p className="lead m-5 text-center">Dobrodošli na {IME_APLIKACIJE}</p>

                    <hr />

                    <DotLottieReact
                        src="https://lottie.host/510411c5-d9ea-4e75-8829-efc1a022a9a6/mGH3ToWnVo.lottie"
                        loop
                        autoplay
                    />
                    {/*<div style={{ textAlign: 'center' }}>
                        <img src="" />
                    </div>*/}

                    <div style={{ maxWidth: '2px', margin: 'auto' }}>
                        <DotLottieReact
                            src="/AISpark_InteractiveAssistant.lottie"
                            loop
                            autoplay
                        />
                    </div>

                </Col>
                <Col className="d-flex align-items-center justify-content-center">
                    <div style={{ width: '100%', maxWidth: '400px' }}>
                        <Card className="mb-3 shadow-lg border-0 statistikaPanel">
                            <Card.Body className="text-center">
                                <p className="text-white">Usluge</p>
                                <div className="statistikaTekst">
                                    {animatedUsluge}
                                </div>
                            </Card.Body>
                        </Card>

                        <Card className="mb-3 shadow-lg border-0 statistikaPanel">
                            <Card.Body className="text-center">
                                <p className="text-white">Korisnici</p>
                                <div className="statistikaTekst">
                                    {animatedKorisnici}
                                </div>
                            </Card.Body>
                        </Card>

                        <Card className="shadow-lg border-0 statistikaPanel">
                            <Card.Body className="text-center">
                                <p className="text-white">Gradovi</p>
                                <div className="statistikaTekst">
                                    {animatedGradovi}
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                </Col>
            </Row>



        </>
    )
}


