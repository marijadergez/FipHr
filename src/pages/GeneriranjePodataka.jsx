import { useState } from 'react';
import { Button, Form, Alert, Container, Row, Col } from 'react-bootstrap';
import { Faker, hr } from '@faker-js/faker';
import UslugeService from '../services/usluge/UslugeService';
import GradService from '../services/gradovi/GradService';
import KorisnikService from '../services/korisnici/KorisnikService';
import { gradovi } from '../services/gradovi/GradPodaci';
import PonudaService from '../services/ponude/PonudaService'
import { ponude } from '../services/ponude/PonudaPodaci';


export default function GeneriranjePodataka() {
    const [brojUsluga, setBrojUsluga] = useState(5);
    const [brojKorisnika, setBrojKorisnika] = useState(20);
    const [brojGradova, setBrojGradova] = useState(10);
    const [brojPonuda, setBrojPonuda] = useState(50)
    const [poruka, setPoruka] = useState(null);
    const [loading, setLoading] = useState(false);

    // Postavi faker na hrvatski jezik
    const faker = new Faker({
        locale: [hr]
    });

    const generirajUsluge = async (broj) => {
        const naziviUsluga = [
            'Knjigovodstvo obrtnika',
            'Knjigovodstvo trgovačkih društava',
            
            
        ];

       

        for (let i = 0; i < broj; i++) {
            await UslugeService.dodaj({
                naziv: naziviUsluga[i % naziviUsluga.length] + (i >= naziviUsluga.length ? ` ${Math.floor(i / naziviUsluga.length) + 1}` : ''),
                
                cijena: parseFloat(faker.number.float({ min: 1100, max: 5000, precision: 0.01 }).toFixed(2)),
                datumPokretanja: faker.date.soon().toISOString().split('T')[0],
                popust: faker.datatype.boolean()
            });
        }
    };

     

    const generirajKorisnike = async (broj) => {
        for (let i = 0; i < broj; i++) {
            const korisnik = {
                ime: i%2===0? faker.person.firstName('male') : faker.person.firstName('female'),
                prezime: faker.person.lastName(),
                email: faker.internet.email(),
                
            };
            await KorisnikService.dodaj(korisnik);
        }
    };

    const generirajGradove = async (broj) => {

        // Dohvati sve smjerove
        const rezultatUsluge = await UslugeService.get();
        const usluge = rezultatUsluge.data;

        
        if (usluge.length === 0) {
            throw new Error('Nema dostupnih usluga. Prvo generirajte usluge.');
        }
        
        for (let i = 0; i < broj; i++) {
            // Odaberi nasumični smjer
            const randomUsluge = usluge[faker.number.int({ min: 0, max: usluge.length - 1 })];
  
            const grad = {
                naziv: randomUsluge.naziv.trim().split(/\s+/).slice(0, 2).map(rijec => rijec[0]).join('').toUpperCase(),   
                usluga: randomUsluge.sifra
            };
            
            await GradService.dodaj(grad);
        }
    };

       const generirajPonude = async (broj) => {

        
           // Dohvati sve korisnike i zmi za svakog slučajnog
        // dohvati sve usluge i odaberi slučajni broj od 1-5 iz popisa usluga i dodaj na ponudi
        const slucajniKorisnik =1
        const slucajneUsluge = [1,2]

        

        
        for (let i = 0; i < broj; i++) {
   
            const ponuda = {
                korisnik: slucajniKorisnik  ,
                usluge: slucajneUsluge,
                datum: faker.date.soon().toISOString().split('T')[0],
                popust: faker.number.int({ min: 0, max: 50 })
            };
            
            await PonudaService.dodaj(ponuda);
        }
    };

    const handleGenerirajUsluge = async (e) => {
        e.preventDefault();
        setLoading(true);
        setPoruka(null);

        try {
            await generirajUsluge(brojUsluga);

            setPoruka({
                tip: 'success',
                tekst: `Uspješno generirano ${brojUsluga} usluga!`
            });
        } catch (error) {
            setPoruka({
                tip: 'danger',
                tekst: 'Greška pri generiranju usluga: ' + error.message
            });
        } finally {
            setLoading(false);
        }
    };
    const handleGenerirajPonude = async (e) => {
        e.preventDefault();
        setLoading(true);
        setPoruka(null);

        try {
            await generirajPonude(brojPonuda);

            setPoruka({
                tip: 'success',
                tekst: `Uspješno generirano ${brojPonuda} usluga!`
            });
        } catch (error) {
            setPoruka({
                tip: 'danger',
                tekst: 'Greška pri generiranju ponuda: ' + error.message
            });
        } finally {
            setLoading(false);
        }
    };

    const handleGenerirajKorisnike= async (e) => {
        e.preventDefault();
        setLoading(true);
        setPoruka(null);

        try {
            
            await generirajKorisnike(brojKorisnika);

            setPoruka({
                tip: 'success',
                tekst: `Uspješno generirano ${brojKorisnika} korisnika!`
            });
        } catch (error) {
            setPoruka({
                tip: 'danger',
                tekst: 'Greška pri generiranju korisnika: ' + error.message
            });
        } finally {
            setLoading(false);
        }
    };

    const handleObrisiKorisnike = async () => {
        if (!window.confirm('Jeste li sigurni da želite obrisati sve korisnike?')) {
            return;
        }

        setLoading(true);
        setPoruka(null);

        try {
            const rezultat = await KorisnikService.get();
            const korisnici = rezultat.data;
            
            for (const  korisnik of  korisnici) {
                await  KorisnikService.obrisi( korisnik.sifra);
            }

            setPoruka({
                tip: 'success',
                tekst: `Uspješno obrisano ${ korisnici.length}  korisnika!`
            });
        } catch (error) {
            setPoruka({
                tip: 'danger',
                tekst: 'Greška pri brisanju korisnika: ' + error.message
            });
        } finally {
            setLoading(false);
        }
    };

    const handleObrisiUsluge = async () => {
        if (!window.confirm('Jeste li sigurni da želite obrisati sve usluge?')) {
            return;
        }

        setLoading(true);
        setPoruka(null);

        try {
            const rezultat = await UslugeService.get();
            const usluge = rezultat.data;
            
            for (const usluga of usluge) {
                await UslugeService.obrisi(usluga.sifra);
            }

            setPoruka({
                tip: 'success',
                tekst: `Uspješno obrisano ${usluge.length} usluga!`
            });
        } catch (error) {
            setPoruka({
                tip: 'danger',
                tekst: 'Greška pri brisanju usluga: ' + error.message
            });
        } finally {
            setLoading(false);
        }
    };

    const handleGenerirajGradove = async (e) => {
        e.preventDefault();
        setLoading(true);
        setPoruka(null);

        try {
            await generirajGradove(brojGradova);

            setPoruka({
                tip: 'success',
                tekst: `Uspješno generirano ${brojGradova} gradova!`
            });
        } catch (error) {
            setPoruka({
                tip: 'danger',
                tekst: 'Greška pri generiranju gradova: ' + error.message
            });
        } finally {
            setLoading(false);
        }
    };

    const handleObrisiGradove = async () => {
        if (!window.confirm('Jeste li sigurni da želite obrisati sve gradove?')) {
            return;
        }

        setLoading(true);
        setPoruka(null);

        try {
            const rezultat = await GradService.get();
            const grad = rezultat.data;
            
            for (const grad of gradovi) {
                await GradService.obrisi(grad.sifra);
            }

            setPoruka({
                tip: 'success',
                tekst: `Uspješno obrisan ${grad.length} grad!`
            });
        } catch (error) {
            setPoruka({
                tip: 'danger',
                tekst: 'Greška pri brisanju grada: ' + error.message
            });
        } finally {
            setLoading(false);
        }
    };
       const handleObrisiPonude = async () => {
        if (!window.confirm('Jeste li sigurni da želite obrisati sve ponude?')) {
            return;
        }

        setLoading(true);
        setPoruka(null);

        try {
            const rezultat = await PonudaService.get();
            const ponuda = rezultat.data;
            
            for (const ponuda of ponude) {
                await PonudaService.obrisi(ponuda.sifra);
            }

            setPoruka({
                tip: 'success',
                tekst: `Uspješno obrisana ${ponuda.length} grad!`
            });
        } catch (error) {
            setPoruka({
                tip: 'danger',
                tekst: 'Greška pri brisanju ponuda: ' + error.message
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="mt-4">
            <h1>Generiranje podataka</h1>
            <p className="text-muted">
                Koristite ovaj alat za generiranje testnih podataka s lažnim (fake) podacima na hrvatskom jeziku.
            </p>

            {poruka && (
                <Alert variant={poruka.tip} dismissible onClose={() => setPoruka(null)}>
                    {poruka.tekst}
                </Alert>
            )}

            <Row>
                <Col md={4}>
                    <Form onSubmit={handleGenerirajUsluge}>
                        <Form.Group className="mb-3">
                            <Form.Label>Broj usluga</Form.Label>
                            <Form.Control
                                type="number"
                                min="1"
                                max="50"
                                value={brojUsluga}
                                onChange={(e) => setBrojUsluga(parseInt(e.target.value))}
                                disabled={loading}
                            />
                            <Form.Text className="text-muted">
                                Unesite broj usluga (1-50)
                            </Form.Text>
                        </Form.Group>
                        <Button 
                            variant="primary" 
                            type="submit" 
                            disabled={loading}
                            className="w-100"
                        >
                            {loading ? 'Generiranje...' : 'Generiraj usluge'}
                        </Button>
                    </Form>
                </Col>
                <Col md={4}>
                    <Form onSubmit={handleGenerirajKorisnike}>
                        <Form.Group className="mb-3">
                            <Form.Label>Broj korisnika</Form.Label>
                            <Form.Control
                                type="number"
                                min="1"
                                max="200"
                                value={brojKorisnika}
                                onChange={(e) => setBrojKorisnika(parseInt(e.target.value))}
                                disabled={loading}
                            />
                            <Form.Text className="text-muted">
                                Unesite broj korisnika (1-200)
                            </Form.Text>
                        </Form.Group>
                        <Button 
                            variant="primary" 
                            type="submit" 
                            disabled={loading}
                            className="w-100"
                        >
                            {loading ? 'Generiranje...' : 'Generiraj korisnike'}
                        </Button>
                    </Form>
                </Col>
                <Col md={4}>
                    <Form onSubmit={handleGenerirajGradove}>
                        <Form.Group className="mb-3">
                            <Form.Label>Broj gradova</Form.Label>
                            <Form.Control
                                type="number"
                                min="1"
                                max="100"
                                value={brojGradova}
                                onChange={(e) => setBrojGradova(parseInt(e.target.value))}
                                disabled={loading}
                            />
                            <Form.Text className="text-muted">
                                Unesite broj gradova (1-100)
                            </Form.Text>
                        </Form.Group>
                        <Button 
                            variant="primary" 
                            type="submit" 
                            disabled={loading}
                            className="w-100"
                        >
                            {loading ? 'Generiranje...' : 'Generiraj gradove'}
                        </Button>
                    </Form>
                </Col>
                <Col md={4}>
                    <Form onSubmit={handleGenerirajPonude}>
                        <Form.Group className="mb-3">
                            <Form.Label>Broj ponuda</Form.Label>
                            <Form.Control
                                type="number"
                                min="1"
                                max="50"
                                value={brojPonuda}
                                onChange={(e) => setBrojPonuda(parseInt(e.target.value))}
                                disabled={loading}
                            />
                            <Form.Text className="text-muted">
                                Unesite broj Ponuda (1-50)
                            </Form.Text>
                        </Form.Group>
                        <Button 
                            variant="primary" 
                            type="submit" 
                            disabled={loading}
                            className="w-100"
                        >
                            {loading ? 'Generiranje...' : 'Generiraj Ponude'}
                        </Button>
                    </Form>
                </Col>
            </Row>

            <Alert variant="warning" className="mt-3">
                <strong>Upozorenje:</strong> Ove akcije će dodati nove podatke u postojeće. 
                Ako želite početi ispočetka, prvo obrišite postojeće podatke.
            </Alert>

            <hr className="my-4" />

            <h3>Brisanje podataka</h3>
            <p className="text-muted">
                Koristite ove opcije za brisanje svih podataka iz baze.
            </p>

            <Row className="mt-3">
                <Col md={4}>
                    <Button 
                        variant="danger" 
                        onClick={handleObrisiUsluge}
                        disabled={loading}
                        className="w-100 mb-2"
                    >
                        {loading ? 'Brisanje...' : 'Obriši sve usluge'}
                    </Button>
                </Col>
                <Col md={4}>
                    <Button 
                        variant="danger" 
                        onClick={handleObrisiKorisnike}
                        disabled={loading}
                        className="w-100 mb-2"
                    >
                        {loading ? 'Brisanje...' : 'Obriši sve korisnike'}
                    </Button>
                </Col>
                <Col md={4}>
                    <Button 
                        variant="danger" 
                        onClick={handleObrisiGradove}
                        disabled={loading}
                        className="w-100 mb-2"
                    >
                        {loading ? 'Brisanje...' : 'Obriši sve gradove'}
                    </Button>
                </Col>
                <Col md={4}>
                    <Button 
                        variant="danger" 
                        onClick={handleObrisiPonude}
                        disabled={loading}
                        className="w-100 mb-2"
                    >
                        {loading ? 'Brisanje...' : 'Obriši sve Ponude'}
                    </Button>
                </Col>
            </Row>

            <Alert variant="danger" className="mt-3">
                <strong>Oprez!</strong> Brisanje podataka je trajna akcija i ne može se poništiti.
            </Alert>
        </Container>
    );
}
