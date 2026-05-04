import { Button, Table } from "react-bootstrap";
import { NumericFormat } from "react-number-format";
import { GrValidate } from "react-icons/gr";
import FormatDatuma from "../../components/FormatDatuma";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { useState } from "react";
import { usluge } from "../../services/usluge/UslugePodaci";
import { korisnici } from "../../services/korisnici/KorisnikPodaci";

export default function KorisnikiPregledTablica({ korisnici, navigate, brisanje }) {
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
        //console.table(korisnici)
        const sorted = [...korisnici].sort((a, b) => {
            let aValue = a[sortConfig.key];
            let bValue = b[sortConfig.key];

            // Obrada null/undefined vrijednosti
            if (aValue === null || aValue === undefined) return 1;
            if (bValue === null || bValue === undefined) return -1;

           

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
                    <th onClick={() => handleSort('ime')} style={{ cursor: 'pointer' }}>
                        Ime {getSortIcon('ime')}
                    </th>
                    <th onClick={() => handleSort('prezime')} style={{ cursor: 'pointer' }}>
                        Prezime {getSortIcon('prezime')}
                    </th>
                    <th onClick={() => handleSort('email')} style={{ cursor: 'pointer' }}>
                        Email {getSortIcon('email')}
                    </th>
                    <th onClick={() => handleSort('grad')} style={{ cursor: 'pointer' }}>
                        Grad {getSortIcon('grad')}
                    </th>
                    <th>Akcija</th>
                </tr>
            </thead>
            <tbody>
                {sortedKorisnici() && sortedKorisnici().map((korisnik) => (
                    <tr key={korisnik.sifra}>
                        <td className="lead">{korisnik.ime}</td>
                        <td className='text-end'>{korisnik.prezime}</td>
                        <td className='text-end'>
                          {korisnik.email}
                        </td>
                        <td>
                            {korisnik.grad}
                        </td>
                        
                        <td>
                            <Button onClick={() => navigate(`/korisnici/${korisnik.sifra}`)} title="Promjeni">
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