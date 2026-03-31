import { usluge } from "./UslugePodaci"



// 1/4 Read od CRUD
async function get(){
    return {success: true, data: [...usluge]} // [...] stvara novi niz s istim podacima
}

async function getBySifra(sifra) {
    return {success: true, data: usluge.find(s => s.sifra === parseInt(sifra))}
}

// 2/4 Create od CRUD
async function dodaj(usluga){
    if(usluge.length===0){
        usluga.sifra=1
    }else{
        usluga.sifra = usluge[usluge.length - 1].sifra + 1
    }
    
    usluge.push(usluga)
}

// 3/4 Update od CRUD
async function promjeni(sifra,usluga) {
    const index = nadiIndex(sifra)
    smjerovi[index] = {...smjerovi[index], ...smjer}
}

function nadiIndex(sifra){
    return smjerovi.findIndex(s=>s.sifra === parseInt(sifra))
}

// 4/4 Delete od CRUD
async function obrisi(sifra) {
    const index = nadiIndex(sifra);
    if (index > -1) {
        smjerovi.splice(index, 1);
    }
    return;
}


export default{
    get,
    dodaj,
    getBySifra,
    promjeni,
    obrisi
}