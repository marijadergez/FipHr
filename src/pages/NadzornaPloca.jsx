import { IME_APLIKACIJE } from "../constants";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Col, Row, Card, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import Highcharts, { chart, ArcDiagram } from "highcharts";
import {HighchartsReact} from "highcharts-react-official";
import 'highcharts/modules/sankey';
import 'highcharts/modules/arc-diagram';
import useLoading from "../hooks/useLoading";




export default function NadzornaPloca() {
    const [chartData, setChartData] = useState([]);
    const { showLoading, hideLoading } = useLoading();


   

    const mojeVeze = [
        ['Semeljci', 'Osijek', 11],
        ['Osijek', 'Donji Miholjac', 1],
        ['Semeljci', 'Đakovo', 1],
        ['Osijek', 'Wien', 1],
        ['Osijek', 'Semeljci', 1],
        ['Semeljci', 'Budimci', 2],
        ['Osijek', 'Slavonski Brod', 1],
        ['Semeljci', 'Vukojevci', 1],
        ['Semeljci', 'Piškorevci', 1],
        ['Petrijevci', 'Čepin', 1],
        ['Semeljci', 'Düsseldorf', 1],
        ['Josipovac', 'Poganovci', 4],
        ['Osijek', 'Hrastin', 1],
        ['Semeljci', 'Ivankovo', 1],
        ['Osijek', 'Gunja', 1],
        ['Osijek', 'Rokovci', 6],
        ['Semeljci', 'Ada', 1],
        ['Osijek', 'Ernestinovo', 1],
        ['Josipovac', 'Vinkovci', 1],
        ['Osijek', 'Županja', 1],
        ['Osijek', 'Josipovac Punitovački', 1],
        ['Semeljci', 'Višnjevac', 1],
        ['Semeljci', 'Petrijevci', 1],
        ['Semeljci', 'Antunovac', 1],
        ['Petrijevci', 'Brijest', 9],
        ['Semeljci', 'Vuka', 1],
        ['Osijek', 'Livana', 1],
    ];

    async function ArcDiagram(Highcharts) {
         useLoading()
    }

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


    title: {
        text: '2026. FipHr'
    },

    accessibility: {
        description: 'Arc- diagram prikazuje gradove odakle dolaze korisnici usluga knjigovodstva FipHr.',
        point: {
            valueDescriptionFormat: 'Connection from {point.from} to ' +
                '{point.to}.'
        }
    },

    series: [{
        keys: ['from', 'to', 'weight'],
        type: 'arcdiagram',
        name: 'Gradovi klijenata koji su poklonili povjerenje FipHr-u',
        linkWeight: 1.5,
        centeredLinks: true,
        dataLabels: {
            rotation: 90,
            y: 30,
            verticalAlign: 'top',
            color: 'var(--highcharts-neutral-color-100, black)',
            padding: 0
        },
        offset: '65%',
        data: [
         ['Đakovo', 'Semeljci', 1],
        ['Brijest', 'Vuka', 1],
        ['Đakovo', 'Vuka', 1],
        ['Županja', 'Antunovac', 1],
        ['Osijek', 'Đakovo', 6],
        ['Đakovo', 'Donji Miholjac', 1],
        ['Brijest', 'Livana', 1],
        ['Županja', 'Budimci', 2],
        ['Osijek', 'Slavonski Brod', 1],
        ['Semeljci', 'Vukojevci', 1],
        ['Semeljci', 'Čepin', 1],
        ['Semeljci', 'Đakovo', 1],
        ['Đakovo', 'Poganovci', 1],
        ['Vuka', 'Hrastin', 1],
        ['Donji Miholjac', 'Ivankovo', 1],
         ['Đakovo', 'Donji Miholjac', 3],
        ['Vuka', 'Gunja', 1],
        ]
    }]

};

    return (
        <Container className="mt-4">
            <Card>
                <Card.Header>
                    {chartData.length > 0 ? `Naši klijenti dolaze iz 17 gradova ` : 'Učitavanje...'}
                </Card.Header>
                <Card.Body>
                    {chartData.length > 0 ? (
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={options}
                        />
                    ) : (
                        <p className="text-center text-muted">Gradovi i usluge</p>
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