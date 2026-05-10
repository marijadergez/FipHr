import { IME_APLIKACIJE } from "../constants";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Col, Row, Card, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import useLoading from "../hooks/useLoading";



export default function NadzornaPloca() {
    const [chartData, setChartData] = useState([]);
    const { showLoading, hideLoading } = useLoading();

    const mojeVeze = [
        ['Hamburg', 'Osijek', 11],
        ['Hamburg', 'Donji Miholjac', 1],
        ['Hamburg', 'Đakovo', 1],
        ['Hannover', 'Wien', 1],
        ['Hannover', 'Semeljci', 1],
        ['Berlin', 'Budimci', 2],
        ['Berlin', 'Slavonski Brod', 1],
        ['Berlin', 'Vukojevci', 1],
        ['Berlin', 'Piškorevci', 1],
        ['Berlin', 'Čepin', 1],
        ['Berlin', 'Düsseldorf', 1],
        ['München', 'Poganovci', 4],
        ['München', 'Hrastin', 1],
        ['München', 'Ivankovo', 1],
        ['München', 'Gunja', 1],
        ['München', 'Rokovci', 6],
        ['Stuttgart', 'Ada', 1],
        ['Frankfurt', 'Ernestinovo', 1],
        ['Frankfurt', 'Vinkovci', 1],
        ['Frankfurt', 'Županja', 1],
        ['Frankfurt', 'Josipovac Punitovački', 1],
        ['Düsseldorf', 'Višnjevac', 1],
        ['Düsseldorf', 'Petrijevci', 1],
        ['Amsterdam', 'Antunovac', 1],
        ['Paris', 'Brijest', 9],
        ['Paris', 'Vuka', 1],
        ['Paris', 'Livana', 1],
    ];

    async function getPodaci() {
        showLoading();
        try {
          
            setChartData(mojeVeze);
            
           // console.log("Podaci za graf postavljeni:", mojeVeze.length, "veza.");
        } catch (error) {
            console.error("Greška pri postavljanju podataka:", error);
        } finally {
            hideLoading();
        }
    }

    useEffect(() => {
        getPodaci();
    }, []);

    const options = {
        chart: {
            type: 'arcdiagram',
            height: '600px'
        },
        title: {
            text: 'Popis gradova korisnika usluga Fip.Hr-a.',
            align: 'left'
        },
        accessibility: {
            enabled: true,
            point: {
                valueDescriptionFormat: 'Connection from {point.from} to {point.to}.'
            }
        },
        series: [{
            type: 'arcdiagram',
            keys: ['from', 'to', 'weight'],
            data: chartData, 
            linkWeight: 1.5,
            centeredLinks: true,
            dataLabels: {
                enabled: true,
                rotation: 90,
                y: 30,
                verticalAlign: 'top',
                color: 'black',
                padding: 0
            },
            offset: '65%',
            node: {
                label: {
                    enabled: true
                },
               
            }
        }]
    };

    return (
        <Container className="mt-4">
            <Card>
                <Card.Header>
                    {chartData.length > 0 ? `Prikazano ${chartData.length} veza između gradova` : 'Učitavanje...'}
                </Card.Header>
                <Card.Body>
                    {chartData.length > 0 ? (
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={options}
                        />
                    ) : (
                        <p className="text-center text-muted">Nema podataka za prikaz.</p>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
}





























// import { useLoading } from "./hooks/useLoading"; 
// import GradService from "./services/GradService"; 

/*}
export default function NadzornaPloca() {
    const [podaciKorisnici, setPodaciKorisnici] = useState([]);
    const [podaciUsluge, setPodaciUsluge] = useState([]);
    
    
    async function getPodaci() {
        
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

                setKorisnikPodaci(korisniciData);
                setUslugePodaci(uslugeData);
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
                    {/* 1. Graf za Korisnike */
                   /* <Col md={6}>
                        <Card>
                            <Card.Header>Broj korisnika po gradu</Card.Header>
                            <Card.Body>
                                {KorisnikPodaci.length > 0 ? (
                                    <PieChart
                                        highcharts={Highcharts}
                                        options={{
                                            ...fixedOptions('Broj korisnika po gradu'),
                                            series: [
                                                {
                                                    name: 'Korisnici',
                                                    colorByPoint: true,
                                                    data: KorisnikPodaci,
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

                    {/* 2. Graf za Usluge */
                  /*  <Col md={6}>
                        <Card>
                            <Card.Header>Broj usluga po gradu</Card.Header>
                            <Card.Body>
                                {UslugePodaci.length > 0 ? (
                                    <PieChart
                                        highcharts={Highcharts}
                                        options={{
                                            ...fixedOptions('Broj usluga po gradu'),
                                            series: [
                                                {
                                                    name: 'Usluge',
                                                    colorByPoint: true,
                                                    data: UslugePodaci,
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
} */