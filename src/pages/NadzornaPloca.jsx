import { IME_APLIKACIJE } from "../constants";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Col, Row, Card, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import { PieChart } from "react-highcharts"; // Provjerite jeste li ga instalirali
import Highcharts from "highcharts";
import GradService from "../services/gradovi/GradService";
// import { useLoading } from "./hooks/useLoading"; // Ako koristite ovaj hook, vratite ga ovdje
// import GradService from "./services/GradService"; // Provjerite putanju

export default function NadzornaPloca() {
    const [podaciKorisnici, setPodaciKorisnici] = useState([]);
    const [podaciUsluge, setPodaciUsluge] = useState([]);
    
    // Ako koristite useLoading, otkomentirajte ovo:
    // const { showLoading, hideLoading } = useLoading();

    async function getPodaci() {
        // showLoading();
        try {
            const odgovor = await GradService.get();
            
            if (odgovor && odgovor.data) {
                const korisniciData = odgovor.data.map((grad) => ({
                    y: grad.korisnici ? grad.korisnici.length : 0,
                    name: grad.naziv,
                }));
                
                const uslugeData = odgovor.data.map((grad) => ({
                    y: grad.usluge ? grad.usluge.length : 0,
                    name: grad.naziv,
                }));

                setPodaciKorisnici(korisniciData);
                setPodaciUsluge(uslugeData);
            }
        } catch (error) {
            console.error("Greška pri učitavanju podataka:", error);
        } finally {
            // hideLoading();
        }
    }

    useEffect(() => {
        getPodaci();
    }, []);

    // Zajednička opcija za graf
    const fixedOptions = (titleText) => ({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
        },
        title: {
            text: titleText,
            align: 'left',
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
        },
        accessibility: {
            enabled: false,
            point: {
                valueSuffix: '%',
            },
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.y}', // Prikazuje i broj (y) umjesto samo %
                },
            },
        },
    });

    return (
        <>
            <Container className='mt-4'>
                <Row>
                    {/* 1. Graf za Korisnike */}
                    <Col md={6}>
                        <Card>
                            <Card.Header>Broj korisnika po gradu</Card.Header>
                            <Card.Body>
                                {podaciKorisnici.length > 0 ? (
                                    <PieChart
                                        highcharts={Highcharts}
                                        options={{
                                            ...fixedOptions('Broj korisnika po gradu'),
                                            series: [
                                                {
                                                    name: 'Korisnici',
                                                    colorByPoint: true,
                                                    data: podaciKorisnici,
                                                },
                                            ],
                                        }}
                                    />
                                ) : (
                                    <p>Učitavanje podataka...</p>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* 2. Graf za Usluge */}
                    <Col md={6}>
                        <Card>
                            <Card.Header>Broj usluga po gradu</Card.Header>
                            <Card.Body>
                                {podaciUsluge.length > 0 ? (
                                    <PieChart
                                        highcharts={Highcharts}
                                        options={{
                                            ...fixedOptions('Broj usluga po gradu'),
                                            series: [
                                                {
                                                    name: 'Usluge',
                                                    colorByPoint: true,
                                                    data: podaciUsluge,
                                                },
                                            ],
                                        }}
                                    />
                                ) : (
                                    <p>Učitavanje podataka...</p>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    ); 
} 