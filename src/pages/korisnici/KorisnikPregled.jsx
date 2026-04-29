import { useEffect, useState } from "react"
import KorisnikService from "../../services/korisnici/KorisnikService"
import { Button, Table } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { RouteNames } from "../../constants"
import GradService from "../../services/gradovi/GradService"
import { IME_APLIKACIJE } from "../../constants"
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa"
import { Row, Col, Card, Container, Pagination, Form, InputGroup } from "react-bootstrap"

import useLoading from "../../hooks/useLoading"
import KorisnikiPregledTablica from "./KorisnikPregledTablica"
import KorisnikPregledGrid from "./KorisnikPregledGrid"
import useBreakpoint from "../../hooks/useBreakpoint"

export default function KorisnikPregled(){

    const navigate = useNavigate()
     const [gradovi, setGradovi] = useState([])
    const [korisnici,setKorisnici] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [totalItems, setTotalItems] = useState(0)
    const [searchTerm, setSearchTerm] = useState('')
    const pageSize = 8
    const sirina = useBreakpoint();

 const { showLoading, hideLoading } = useLoading()

     useEffect(()=>{document.title='Korisnici, ' + IME_APLIKACIJE})

    useEffect(()=>{
        ucitajKorisnike(currentPage, searchTerm)
       ucitajGradovi()
        
        
    },[currentPage, searchTerm])



     async function ucitajGradovi(  page, search) {
            await GradService.get(page, pageSize, search).then((odgovor) => {
                setGradovi(odgovor.data)
            })
    
        }

    async function ucitajKorisnike(page, search) {
        await KorisnikService.getPage(page, pageSize, search).then((odgovor)=>{
            if(!odgovor.success){
                alert('Nije implementiran servis')
                return
            }
           // console.table(odgovor)
            setKorisnici(odgovor.data)
            setTotalPages(odgovor.totalPages)
            setTotalItems(odgovor.totalItems)
        })
    }
    function dohvatiNazivGrada(sifraGrada) {
        const grad = gradovi.find(s => s.sifra === sifraGrada)
        return grad!=null ? grad.naziv : 'Nije definirano'
    }

    async function brisanje(sifra) {
        if (!confirm('Sigurno obrisati?')) return;

          showLoading()
         // samo za potrebe testa prikaza rada loading
        await new Promise(resolve => setTimeout(resolve, 2000));

        await KorisnikService.obrisi(sifra);

        await KorisnikService.get().then((odgovor)=>{
            setKorisnici(odgovor.data)
        })
    }

    const newTotalItems = totalItems - 1;
        const newTotalPages = Math.ceil(newTotalItems / pageSize);

        if (currentPage > newTotalPages && newTotalPages > 0) {
            setCurrentPage(newTotalPages);
        } else {
            ucitajKorisnike(currentPage, searchTerm);
        }
        hideLoading()
    

        
     function handlePageChange(page) {
        setCurrentPage(page)
    }

    function handleSearchChange(e) {
        setSearchTerm(e.target.value)
        setCurrentPage(1) // Reset na prvu stranicu pri pretraživanju
    }


    return(
        <>
        <Link to={RouteNames.KORISNICI_NOVI}
        className="btn btn-success w-100 my-3">
            Dodavanje novog korisnika
        </Link>

         {/* Search input */}
            <InputGroup className="mb-3">
                <InputGroup.Text>
                    <FaSearch />
                </InputGroup.Text>
                <Form.Control
                    type="text"
                    placeholder="Pretraži polaznike (ime, prezime, email)..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </InputGroup>

             <Link to={RouteNames.KORISNICI_NOVI}
                            className="btn btn-success w-100 my-3">
                            Dodavanje novog korisnika
                        </Link>
                        {/* tableti prema manje */}
                        {['xs', 'sm', 'md'].includes(sirina) ? (
                            <KorisnikPregledGrid
                                korisnici={korisnici} 
                                navigate={navigate} 
                                brisanje={brisanje} 
                            />
                        ) : (
                            <KorisnikiPregledTablica
                                korisnici={korisnici}   
                                navigate={navigate} 
                                brisanje={brisanje} 
                            />
                        )}

    

         {/* Pagination komponenta */}
            {totalPages > 1 && (

                <div className="d-flex justify-content-center">
                    <Pagination>
                        <Pagination.First
                            onClick={() => handlePageChange(1)}
                            disabled={currentPage === 1}
                        />
                        <Pagination.Prev
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        />

                        {[...Array(totalPages)].map((_, index) => {
                            const pageNumber = index + 1;
                            // Prikaži samo stranice blizu trenutne stranice
                            if (
                                pageNumber === 1 ||
                                pageNumber === totalPages ||
                                (pageNumber >= currentPage - 2 && pageNumber <= currentPage + 2)
                            ) {
                                return (
                                    <Pagination.Item
                                        key={pageNumber}
                                        active={pageNumber === currentPage}
                                        onClick={() => handlePageChange(pageNumber)}
                                    >
                                        {pageNumber}
                                    </Pagination.Item>
                                );
                            } else if (
                                pageNumber === currentPage - 3 ||
                                pageNumber === currentPage + 3
                            ) {
                                return <Pagination.Ellipsis key={pageNumber} disabled />;
                            }
                            return null;
                        })}

                        <Pagination.Next
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        />
                        <Pagination.Last
                            onClick={() => handlePageChange(totalPages)}
                            disabled={currentPage === totalPages}
                        />
                    </Pagination>
                </div>

            )}


        </>
    )

}


  {/*
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Ime</th>
                    <th>Prezime</th>
                    <th>Email</th>
                    <th>Grad</th>
                    <th>Akcija</th>
                    
                </tr>
            </thead>
            <tbody>
                {korisnici && korisnici.map((korisnik)=>(
                    <tr key={korisnik.sifra}>
                        <td className="lead">{korisnik.ime}</td>
                        <td className="lead">{korisnik.prezime}</td>
                        <td>{korisnik.email}</td>
                        <td>{dohvatiNazivGrada(korisnik.grad)}</td>
                        <td>
                            
                            <Button onClick={()=>{navigate(`/korisnici/${korisnik.sifra}`)}}>
                                Promjeni
                            </Button>
                            &nbsp;&nbsp;
                            <Button variant="danger" onClick={() => brisanje(korisnik.sifra)}>
                                Obriši
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table> */}