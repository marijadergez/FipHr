import { ponude } from "./PonudaPodaci";



// 1/4 Read od CRUD
async function get(){
    return {success: true, data: [...ponude]} 
}

async function getBySifra(sifra) {
    return {success: true, data: ponude.find(s => s.sifra === parseInt(sifra))}
}

// 2/4 Create od CRUD
async function dodaj(ponuda){
    if(ponuda.length===0){
       ponuda.sifra=1
    }else{
        ponuda.sifra = ponude[ponude.length - 1].sifra + 1
    }
    
    ponude.push(ponuda)
}

// 3/4 Update od CRUD
async function promjeni(sifra,ponuda) {
    const index = nadiIndex(sifra)
    ponude[index] = {...ponude[index], ...ponuda}
}

function nadiIndex(sifra){
    return ponude.findIndex(s=>s.sifra === parseInt(sifra))
}

// 4/4 Delete od CRUD
async function obrisi(sifra) {
    const index = nadiIndex(sifra);
    if (index > -1) {
        ponude.splice(index, 1);
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