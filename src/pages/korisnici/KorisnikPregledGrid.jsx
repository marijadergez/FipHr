import { Button, Card, Row, Col, Container } from "react-bootstrap";
import { NumericFormat } from "react-number-format";
import { GrValidate } from "react-icons/gr";
import FormatDatuma from "../../components/FormatDatuma";
import { FaEdit, FaTrash } from "react-icons/fa";


export default function KorisnikPregledGrid({ korisnici, navigate, brisanje }) {
    return (
        <Container className="py-3 px-0">
            <Row>
                {korisnici && korisnici.map((korisnik) => (
                    <Col key={korisnik.sifra} xs={12} md={6} className="mb-4">
                        <Card className="shadow-sm h-100">
                            <Card.Header className="d-flex justify-content-between align-items-center bg-white py-3">
                                <span className="fw-bold text-primary" style={{ fontSize: '1.1rem' }}>
                                    {korisnik.ime} {korisnik.prezime}
                                </span>
                               
                            </Card.Header>

                            <Card.Body>
                                <div className="d-flex justify-content-between mb-2">
                                    <span className="text-muted">Email:</span>
                                    <span className="fw-semibold">{korisnik.email} h</span>
                                </div>

                             

                                <div className="d-flex justify-content-between">
                                    <span className="text-muted">Grad:</span>
                                    <span>
                                        {korisnik.grad}
                                    </span>
                                </div>
                            </Card.Body>

                            <Card.Footer className="bg-light d-flex gap-2">
                                <Button
                                    variant="outline-primary"
                                    className="flex-fill"
                                    onClick={() => navigate(`/korisnici/${korisnik.sifra}`)}
                                    title="Promjeni"
                                >
                                    <FaEdit />
                                </Button>
                                <Button
                                    variant="outline-danger"
                                    className="flex-fill"
                                    onClick={() => brisanje(korisnik.sifra)}
                                    title="Obriši"
                                >
                                    <FaTrash />
                                </Button>
                            </Card.Footer>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}