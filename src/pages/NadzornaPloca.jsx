import { IME_APLIKACIJE } from "../constants";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Col, Row, Card, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import Highcharts, { chart, ArcDiagram } from "highcharts";
import {HighchartsReact} from "highcharts-react-official";
import useLoading from "../hooks/useLoading";


  

export default function NadzornaPloca() {
    const [chartData, setChartData] = useState([]);
    const { showLoading, hideLoading } = useLoading();
   

    const mojeVeze = [
        ['Hamburg', 'Osijek', 11],
        ['Osijek', 'Donji Miholjac', 1],
        ['Osijek', 'Đakovo', 1],
        ['Osijek', 'Wien', 1],
        ['Osijek', 'Semeljci', 1],
        ['Osijek', 'Budimci', 2],
        ['Osijek', 'Slavonski Brod', 1],
        ['Berlin', 'Vukojevci', 1],
        ['Berlin', 'Piškorevci', 1],
        ['Berlin', 'Čepin', 1],
        ['Berlin', 'Düsseldorf', 1],
        ['Osijek', 'Poganovci', 4],
        ['Osijek', 'Hrastin', 1],
        ['Osijek', 'Ivankovo', 1],
        ['Osijek', 'Gunja', 1],
        ['Osijek', 'Rokovci', 6],
        ['Stuttgart', 'Ada', 1],
        ['Osijek', 'Ernestinovo', 1],
        ['Osijek', 'Vinkovci', 1],
        ['Osijek', 'Županja', 1],
        ['Osijek', 'Josipovac Punitovački', 1],
        ['Düsseldorf', 'Višnjevac', 1],
        ['Düsseldorf', 'Petrijevci', 1],
        ['Amsterdam', 'Antunovac', 1],
        ['Osijek', 'Brijest', 9],
        ['Osijek', 'Vuka', 1],
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
        text: 'Main train connections in Europe'
    },

    accessibility: {
        description: 'Arc diagram chart with circles of different sizes ' +
            'along the X axis, and connections drawn as arcs between them. ' +
            'From the chart we can see that Osijek is the city with the most ' +
            'connections to other cities.',
        point: {
            valueDescriptionFormat: 'Connection from {point.from} to ' +
                '{point.to}.'
        }
    },

    series: [{
        keys: ['from', 'to', 'weight'],
        type: 'arcdiagram',
        name: 'Train connections',
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
            ['Hamburg', 'Stuttgart', 1],
            ['Hamburg', 'Osijek', 1],
            ['Hamburg', 'Osijek', 1],
            ['Hannover', 'Wien', 1],
            ['Hannover', 'Osijek', 1],
            ['Berlin', 'Wien', 1],
            ['Berlin', 'Osijek', 1],
            ['Berlin', 'Stuttgart', 1],
            ['Berlin', 'Osijek', 1],
            ['Berlin', 'Köln', 1],
            ['Berlin', 'Düsseldorf', 1],
            ['Osijek', 'Düsseldorf', 1],
            ['Osijek', 'Wien', 1],
            ['Osijek', 'Osijek', 1],
            ['Osijek', 'Köln', 1],
            ['Osijek', 'Amsterdam', 1],
            ['Stuttgart', 'Wien', 1],
            ['Osijek', 'Wien', 1],
            ['Osijek', 'Amsterdam', 1],
            ['Osijek', 'Osijek', 1],
            ['Osijek', 'Budapest', 1],
            ['Düsseldorf', 'Wien', 1],
            ['Düsseldorf', 'Hamburg', 1],
            ['Amsterdam', 'Osijek', 1],
            ['Osijek', 'Brest', 1],
            ['Osijek', 'Nantes', 1],
            ['Osijek', 'Bayonne', 1],
            ['Osijek', 'Bordeaux', 1],
            ['Osijek', 'Toulouse', 1],
            ['Osijek', 'Montpellier', 1],
            ['Osijek', 'Marseille', 1],
            ['Osijek', 'Nice', 1],
            ['Osijek', 'Milano', 1],
            ['Nantes', 'Nice', 1],
            ['Bordeaux', 'Lyon', 1],
            ['Nantes', 'Lyon', 1],
            ['Milano', 'Osijek', 1],
            ['Milano', 'Roma', 1],
            ['Milano', 'Bari', 1],
            ['Milano', 'Napoli', 1],
            ['Milano', 'Brindisi', 1],
            ['Milano', 'Lamezia Terme', 1],
            ['Torino', 'Roma', 1],
            ['Venezia', 'Napoli', 1],
            ['Roma', 'Bari', 1],
            ['Roma', 'Catania', 1],
            ['Roma', 'Brindisi', 1],
            ['Catania', 'Milano', 1]
        ]
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