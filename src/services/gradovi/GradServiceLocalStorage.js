const STORAGE_KEY = 'gradovi';

function dohvatiSveIzStorage() {
    const podaci = localStorage.getItem(STORAGE_KEY);
    return podaci ? JSON.parse(podaci) : [];
}

function spremiUStorage(podaci) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(podaci));
}

async function get() {
    const gradovi = dohvatiSveIzStorage();
    return {success: true, data: [...gradovi] };
    
}

async function getBySifra(sifra) {
    const gradovi = dohvatiSveIzStorage();
    const grad = gradovi.find(s => s.sifra === parseInt(sifra));
    return {success: true, data: grad};
    
}

async function dodaj(grad) {
    const gradovi = dohvatiSveIzStorage();

    if (gradovi.length === 0) {
        grad.sifra = 1;
    }else {
        const maxSifra = Math.max(...gradovi.map(s => s.sifra));
        gradovi.sifra = maxSifra + 1;
    }

    gradovi.push(grad);
    spremiUStorage(gradovi);
    return { data: grad};
}

async function promjeni(sifra, grad) {
     const gradovi = dohvatiSveIzStorage();
     const index = gradovi.findIndex( s => s.sifra === parseInt(sifra));

     if (index !== -1) {
        gradovi[index] = { ...gradovi[index], ...grad};
        spremiUStorage(gradovi);
     }
     return { data: gradovi[index] };
    
}

async function obrisi(sifra) {
    let gradovi = dohvatiSveIzStorage();
    gradovi = gradovi.filter(s => s.sifra !== parseInt(sifra));
    spremiUStorage(gradovi);
    return { message: 'Obrisano' };
    
}

export default {
    get,
    dodaj,
    getBySifra,
    promjeni,
    obrisi
}