import { korisnici } from "./KorisnikPodaci"




async function get(){
    return {success: true, data: [...korisnici]} 
}

async function getBySifra(sifra) {
    return {success: true, data: korisnici.find(s => s.sifra === parseInt(sifra))}
}


async function dodaj(korisnik){
    if(korisnici.length===0){
        korisnik.sifra=1
    }else{
        korisnik.sifra = korisnici [korisnici.length - 1].sifra + 1
    }
    
    korisnici.push(korisnik)
}


async function promjeni(sifra,korisnik) {
    const index = nadiIndex(sifra)
    korisnici[index] = {...korisnici[index], ...korisnik}
}

function nadiIndex(sifra){
    return korisnici.findIndex(s=>s.sifra === parseInt(sifra))
}


async function obrisi(sifra) {
    const index = nadiIndex(sifra);
    if (index > -1) {
        korisnici.splice(index, 1);
    }
    return;
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
            const grad = (korisnik.grad || '').toLowerCase();
            
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