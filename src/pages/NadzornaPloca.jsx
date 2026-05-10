import { IME_APLIKACIJE } from "../constants";
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { Col, Row, Card, Container } from "react-bootstrap";
import { useState, useEffect } from "react";

export default function NadzornaPloca() {

        const [podaci, setPodaci] = useState([]);
    const { showLoading, hideLoading } = useLoading();

      async function getPodaci() {
        showLoading();
        const odgovor = await GradService.get();
        setPodaci(odgovor.data.map((grad) => {
            return {
                y: grad.korisnici.length,
                name: grad.naziv,
            };
        }));
        hideLoading();
    }

    useEffect(() => {
        getPodaci();
    }, []);

    const fixedOptions = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
        },
        title: {
            text: 'Broj korisnika po gradu',
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
                    format: '<b>{point.name}</b>',
                },
            },
        },
    };
    

    return (
        <>
         <Container className='mt-4'>
                {podaci.length > 0 && (
                    <PieChart
                        highcharts={Highcharts}
                        options={{
                            ...fixedOptions,
                            series: [
                                {
                                    name: 'Korisnici',
                                    colorByPoint: true,
                                    data: podaci,
                                },
                            ],
                        }}
                    />
                )}
            </Container>
        </>
    )
}
