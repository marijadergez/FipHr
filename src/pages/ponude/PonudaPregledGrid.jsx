import { Button, Card, Row, Col, Container } from "react-bootstrap";
import { NumericFormat } from "react-number-format";
import { GrValidate } from "react-icons/gr";
import FormatDatuma from "../../components/FormatDatuma";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function PonudaPregledGrid({ ponude, navigate, brisanje }) {
    return (
        <Container className="py-3 px-0">
            <Row>
                {ponude && ponude.map((ponuda) => (
                    <Col key={ponuda.sifra} xs={12} md={6} className="mb-4">
                        <Card className="shadow-sm h-100">
                            <Card.Header className="d-flex justify-content-between align-items-center bg-white py-3">
                                <span className="fw-bold text-primary" style={{ fontSize: '1.1rem' }}>
                                    {ponuda.naziv}
                                </span>
                                <GrValidate
                                    size={22}
                                    color={ponuda.aktivan ? 'green' : 'red'}
                                    title={ponuda.aktivan ? "Aktivan" : "Neaktivan"}
                                />
                            </Card.Header>

                            <Card.Body>
                                <div className="d-flex justify-content-between mb-2">
                                    <span className="text-muted">Trajanje:</span>
                                    <span className="fw-semibold">{ponuda.trajanje} h</span>
                                </div>

                                <div className="d-flex justify-content-between mb-2">
                                    <span className="text-muted">Cijena:</span>
                                    <span className="fw-bold text-dark">
                                        <NumericFormat
                                            value={ponuda.cijena}
                                            displayType={'text'}
                                            thousandSeparator='.'
                                            decimalSeparator=','
                                            suffix=' €'
                                            decimalScale={2}
                                            fixedDecimalScale
                                        />
                                    </span>
                                </div>

                                <div className="d-flex justify-content-between">
                                    <span className="text-muted">Početak:</span>
                                    <span>
                                        <FormatDatuma datum={ponuda.datumPokretanja} />
                                    </span>
                                </div>
                            </Card.Body>

                            <Card.Footer className="bg-light d-flex gap-2">
                                <Button
                                    variant="outline-primary"
                                    className="flex-fill"
                                    onClick={() => navigate(`/ponude/${ponuda.sifra}`)}
                                    title="Promjeni"
                                >
                                    <FaEdit />
                                </Button>
                                <Button
                                    variant="outline-danger"
                                    className="flex-fill"
                                    onClick={() => brisanje(ponuda.sifra)}
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