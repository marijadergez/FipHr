import { korisnici } from "./KorisnikPodaci";

const STORAGE_KEY = 'korisnici';

function dohvatiSveIzStorage() {
    const podaci = localStorage.getItem(STORAGE_KEY);
    return podaci ? JSON.parse(podaci) : [];
}

function spremiUStorage(podaci) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(podaci));
}

async function get() {
    const korisnici = dohvatiSveIzStorage();
    return {success: true, data: [...korisnici] };
    
}

async function getBySifra(sifra) {
    const korisnici = dohvatiSveIzStorage();
    const korisnik = korisnici.find(s => s.sifra === parseInt(sifra));
    return {success: true, data: korisnik};
    
}

async function dodaj(korisnik) {
    const korisnici = dohvatiSveIzStorage();

    if (korisnici.length === 0) {
        korisnik.sifra = 1;
    }else {
        const maxSifra = Math.max(...korisnici.map(s => s.sifra));
        korisnik.sifra = maxSifra + 1;
    }

  korisnici.push(korisnik);
    spremiUStorage(korisnici);
    return { data:korisnik};
}

async function promjeni(sifra,korisnik) {
     const korisnici = dohvatiSveIzStorage();
     const index = korisnici.findIndex( s => s.sifra === parseInt(sifra));

     if (index !== -1) {
        korisnici[index] = { ...korisnici[index], ...korisnik};
        spremiUStorage(korisnici);
     }
     return { data: korisnici[index] };
    
}

async function obrisi(sifra) {
    let korisnici = dohvatiSveIzStorage();
    korisnici = korisnici.filter(p => p.sifra !== parseInt(sifra));
    spremiUStorage(korisnici);
    return { message: 'Obrisano' };
    
}
// Straničenje - dohvati stranicu polaznika
async function getPage(page = 1, pageSize = 8, searchTerm = '') {
    let filteredKorisnici = [...korisnici];
    
    // Filtriranje prema search termu
    if (searchTerm && searchTerm.trim() !== '') {
        const lowerSearchTerm = searchTerm.toLowerCase().trim();
        filteredKorisnici = filteredKorisnici.filter(korisnik => {
            const ime = (korisnik.ime || '').toLowerCase();
            const prezime = (korisnik.prezime || '').toLowerCase();
            const email = (korisnik.email || '').toLowerCase();
            const grad = (korisnik.gradovi || '').toLowerCase();
            
            return ime.includes(lowerSearchTerm) ||
                   prezime.includes(lowerSearchTerm) ||
                   email.includes(lowerSearchTerm) ||
                   grad.includes(lowerSearchTerm);
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

