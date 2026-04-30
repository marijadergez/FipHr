import { Button, Table } from "react-bootstrap";
import { NumericFormat } from "react-number-format";
import { GrValidate } from "react-icons/gr";
import FormatDatuma from "../../components/FormatDatuma";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { useState } from "react";
import { usluge } from "../../services/usluge/UslugePodaci";
import { gradovi } from "../../services/gradovi/GradPodaci";


export default function GradPregledTablica({ grad, navigate, brisanje }) {
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

        const sortedGradovi = () => {
        if (!gradovi || sortConfig.direction === null) {
            return gradovi;
        }

        const sorted = [...gradovi].sort((a, b) => {
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
                {sortedGradovi() && sortedGradovi().map((grad) => (
                    <tr key={grad.sifra}>
                        <td className="lead">{grad.naziv}</td>
                        <td className='text-end'>{grad.trajanje} h</td>
                        <td className='text-end'>
                            <NumericFormat
                                value={grad.cijena}
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
                            <FormatDatuma datum={grad.datumPokretanja} />
                        </td>
                        <td style={{ textAlign: 'center' }}>
                            <GrValidate
                                size={25}
                                color={grad.aktivan ? 'green' : 'red'}
                            />
                        </td>
                        <td>
                            <Button onClick={() => navigate(`/grad/${grad.sifra}`)} title="Promjeni">
                                 <FaEdit />
                            </Button>
                            &nbsp;&nbsp;
                            <Button variant="danger" onClick={() => brisanje(grad.sifra)} title="Obriši">
                                 <FaTrash />
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}