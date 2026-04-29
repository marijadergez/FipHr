import { Button, Table } from "react-bootstrap";
import { NumericFormat } from "react-number-format";
import { GrValidate } from "react-icons/gr";
import FormatDatuma from "../../components/FormatDatuma";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { useState } from "react";
import { ponude } from "../../services/ponude/PonudaPodaci";

export default function SmjerPregledTablica({ smjerovi, navigate, brisanje }) {
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

        const sortedPonude = () => {
        if (!ponude || sortConfig.direction === null) {
            return ponude;
        }

        const sorted = [...ponude].sort((a, b) => {
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
                {sortedPonude() && sortedPonude().map((ponuda) => (
                    <tr key={ponuda.sifra}>
                        <td className="lead">{ponuda.naziv}</td>
                        <td className='text-end'>{ponuda.trajanje} h</td>
                        <td className='text-end'>
                            <NumericFormat
                                value={ponuda.cijena}
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
                            <FormatDatuma datum={ponuda.datumPokretanja} />
                        </td>
                        <td style={{ textAlign: 'center' }}>
                            <GrValidate
                                size={25}
                                color={ponuda.aktivan ? 'green' : 'red'}
                            />
                        </td>
                        <td>
                            <Button onClick={() => navigate(`/ponude/${ponuda.sifra}`)} title="Promjeni">
                                 <FaEdit />
                            </Button>
                            &nbsp;&nbsp;
                            <Button variant="danger" onClick={() => brisanje(ponuda.sifra)} title="Obriši">
                                 <FaTrash />
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}