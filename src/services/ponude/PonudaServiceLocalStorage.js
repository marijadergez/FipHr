const STORAGE_KEY = 'ponude';

function dohvatiSveIzStorage() {
    const podaci = localStorage.getItem(STORAGE_KEY);
    return podaci ? JSON.parse(podaci) : [];
}

function spremiUStorage(podaci) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(podaci));
}

async function get() {
    const ponude = dohvatiSveIzStorage();
    return {success: true, data: [...ponude] };
    
}

async function getBySifra(sifra) {
    const ponude = dohvatiSveIzStorage();
    const ponuda = ponude.find(s => s.sifra === parseInt(sifra));
    return {success: true, data: ponuda};
    
}

async function dodaj(ponuda) {
    const ponuda = dohvatiSveIzStorage();

    if (ponuda.length === 0) {
       ponuda.sifra = 1;
    }else {
        const maxSifra = Math.max(...ponuda.map(s => s.sifra));
       ponuda.sifra = maxSifra + 1;
    }

    ponuda.push(ponuda);
    spremiUStorage(ponuda);
    return { data: ponuda};
}

async function promjeni(sifra, ponuda) {
     const ponude = dohvatiSveIzStorage();
     const index = ponude.findIndex( s => s.sifra === parseInt(sifra));

     if (index !== -1) {
        ponude[index] = { ...ponude[index], ...ponuda};
        spremiUStorage(ponude);
     }
     return { data: ponude[index] };
    
}

async function obrisi(sifra) {
    let ponude = dohvatiSveIzStorage();
    ponude = ponude.filter(s => s.sifra !== parseInt(sifra));
    spremiUStorage(ponude);
    return { message: 'Obrisano' };
    
}

export default {
    get,
    dodaj,
    getBySifra,
    promjeni,
    obrisi
}