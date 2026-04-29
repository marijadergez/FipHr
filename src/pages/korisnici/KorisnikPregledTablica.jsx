import { Button, Table } from "react-bootstrap";
import { NumericFormat } from "react-number-format";
import { GrValidate } from "react-icons/gr";
import FormatDatuma from "../../components/FormatDatuma";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { useState } from "react";
import { usluge } from "../../services/usluge/UslugePodaci";
import { korisnici } from "../../services/korisnici/KorisnikPodaci";

export default function KorisnikiPregledTablica({ korisnik, navigate, brisanje }) {
    const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        } else if (sortConfig.key === key && sortConfig.direction === 'desc') {
            direction = null;
        }
        setSortConfig({ key, direction });
    };

    const getSortIcon = (columnKey) => {
        if (sortConfig.key !== columnKey || sortConfig.direction === null) {
            return <FaSort />;
        }
        return sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />;
    };

        const sortedKorisnici = () => {
        if (!korisnici || sortConfig.direction === null) {
            return korisnici;
        }

        const sorted = [...korisnici].sort((a, b) => {
            let aValue = a[sortConfig.key];
            let bValue = b[sortConfig.key];

            // Obrada null/undefined vrijednosti
            if (aValue === null || aValue === undefined) return 1;
            if (bValue === null || bValue === undefined) return -1;

            // Sortiranje prema tipu podatka: Date
            if (sortConfig.key === 'datumPokretanja') {
                const dateA = new Date(aValue);
                const dateB = new Date(bValue);
                return sortConfig.direction === 'asc' ? dateA - dateB : dateB - dateA;
            }

            // Sortiranje prema tipu podatka: boolean
            if (sortConfig.key === 'aktivan') {
                const valA = aValue ? 1 : 0;
                const valB = bValue ? 1 : 0;
                return sortConfig.direction === 'asc' ? valA - valB : valB - valA;
            }

            // Sortiranje prema tipu podatka: string
            if (typeof aValue === 'string') {
                // localeCompare s 'hr' parametrom rješava čšćđž ČŠĆĐŽ
                const result = aValue.localeCompare(bValue, 'hr', { sensitivity: 'accent' });
                return sortConfig.direction === 'asc' ? result : -result;
            }

            // Za brojeve (cijena, trajanje)
            if (aValue < bValue) {
                return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (aValue > bValue) {
                return sortConfig.direction === 'asc' ? 1 : -1;
            }
            return 0;
        });

        return sorted;
    };

    return (
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th onClick={() => handleSort('naziv')} style={{ cursor: 'pointer' }}>
                        Naziv {getSortIcon('naziv')}
                    </th>
                    <th onClick={() => handleSort('trajanje')} style={{ cursor: 'pointer' }}>
                        Trajanje {getSortIcon('trajanje')}
                    </th>
                    <th onClick={() => handleSort('cijena')} style={{ cursor: 'pointer' }}>
                        Cijena {getSortIcon('cijena')}
                    </th>
                    <th onClick={() => handleSort('datumPokretanja')} style={{ cursor: 'pointer' }}>
                        Datum pokretanja {getSortIcon('datumPokretanja')}
                    </th>
                    <th onClick={() => handleSort('aktivan')} style={{ cursor: 'pointer' }}>
                        Aktivan {getSortIcon('aktivan')}
                    </th>
                    <th>Akcija</th>
                </tr>
            </thead>
            <tbody>
                {sortedKorisnici() && sortedKorisnici().map((korisnik) => (
                    <tr key={korisnik.sifra}>
                        <td className="lead">{korisnik.naziv}</td>
                        <td className='text-end'>{korisnik.trajanje} h</td>
                        <td className='text-end'>
                            <NumericFormat
                                value={korisnik.cijena}
                                displayType={'text'}
                                thousandSeparator='.'
                                decimalSeparator=','
                                suffix=' €'
                                prefix='='
                                decimalScale={2}
                                fixedDecimalScale
                            />
                        </td>
                        <td>
                            <FormatDatuma datum={korisnik.datumPokretanja} />
                        </td>
                        <td style={{ textAlign: 'center' }}>
                            <GrValidate
                                size={25}
                                color={korisnik.aktivan ? 'green' : 'red'}
                            />
                        </td>
                        <td>
                            <Button onClick={() => navigate(`/korisnik/${korisnik.sifra}`)} title="Promjeni">
                                 <FaEdit />
                            </Button>
                            &nbsp;&nbsp;
                            <Button variant="danger" onClick={() => brisanje(korisnik.sifra)} title="Obriši">
                                 <FaTrash />
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}