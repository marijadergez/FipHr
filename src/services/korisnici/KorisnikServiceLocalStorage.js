import { PrefixStorage } from "../../constants";
import GradService from "../gradovi/GradService";

function dohvatiSveIzStorage() {
    const podaci = localStorage.getItem(PrefixStorage.KORISNICI);
    return podaci ? JSON.parse(podaci) : [];
}

function spremiUStorage(podaci) {
    localStorage.setItem(PrefixStorage.KORISNICI, JSON.stringify(podaci));
}

async function get() {
    const korisnici = dohvatiSveIzStorage();
    return {success: true, data: [...korisnici] };
    
}

async function getBySifra(sifra) {
    const korisnici = dohvatiSveIzStorage();
    const korisnik = korisnici.find(s => s.sifra === sifra);
    return {success: true, data: korisnik};
    
}

async function dodaj(korisnik) {
    const korisnici = dohvatiSveIzStorage();

    if (korisnici.length === 0) {
        korisnik.sifra = '1';
    }else {
        korisnik.sifra = String(parseInt(korisnici[korisnici.length - 1].sifra) +1)
    }

  korisnici.push(korisnik);
    spremiUStorage(korisnici);
    return { data:korisnik};
}

async function promjeni(sifra,korisnik) {
     const korisnici = dohvatiSveIzStorage();
     const index = korisnici.findIndex( s => s.sifra === sifra);

     if (index !== -1) {
        korisnici[index] = { ...korisnici[index], ...korisnik};
        spremiUStorage(korisnici);
     }
     return { data: korisnici[index] };
    
}

async function obrisi(sifra) {
    let korisnici = dohvatiSveIzStorage();
    korisnici = korisnici.filter(p => p.sifra !== sifra);
    spremiUStorage(korisnici);
    return { message: 'Obrisano' };
    
}
// Straničenje - dohvati stranicu polaznika
async function getPage(page = 1, pageSize = 8, searchTerm = '') {
    let filteredKorisnici = [...dohvatiSveIzStorage()];


    const gradoviOdgovor = await GradService.get();

    const gradoviPodaci = gradoviOdgovor.data

    filteredKorisnici = filteredKorisnici.map(korisnik => {
        // Pronađi izvođača čija se šifra podudara s onom u albumu
        const pronadjeniGrad = gradoviPodaci.find(i => i.sifra === korisnik.grad);
        
        return {
            ...korisnik,
            // Ako je izvođač pronađen, stavi njegov naziv, inače zadrži staru vrijednost ili stavi 'Nepoznato'
            grad: pronadjeniGrad ? pronadjeniGrad.naziv : korisnik.grad
        };
    });



    
    // Filtriranje prema search termu
    if (searchTerm && searchTerm.trim() !== '') {
        const lowerSearchTerm = searchTerm.toLowerCase().trim();
        filteredKorisnici = filteredKorisnici.filter(korisnik => {
            const ime = (korisnik.ime || '').toLowerCase();
            const prezime = (korisnik.prezime || '').toLowerCase();
            const email = (korisnik.email || '').toLowerCase();
            
            return ime.includes(lowerSearchTerm) ||
                   prezime.includes(lowerSearchTerm) ||
                   email.includes(lowerSearchTerm) ;
        });
    }
    
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = filteredKorisnici.slice(startIndex, endIndex);
    const totalItems = filteredKorisnici.length;
    const totalPages = Math.ceil(totalItems / pageSize);

    return {
        success: true,
        data: paginatedData,
        currentPage: page,
        pageSize: pageSize,
        totalPages: totalPages,
        totalItems: totalItems
    };
}


export default{
    get,
    dodaj,
    getBySifra,
    promjeni,
    obrisi,
    getPage
}

