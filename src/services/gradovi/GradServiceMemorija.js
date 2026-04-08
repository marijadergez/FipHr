import { gradovi } from "./GradPodaci"



// 1/4 Read od CRUD
async function get(){
    return {success: true, data: [...gradovi]} 
}

async function getBySifra(sifra) {
    return {success: true, data: gradovi.find(s => s.sifra === parseInt(sifra))}
}

// 2/4 Create od CRUD
async function dodaj(grad){
    if(grad.length===0){
        grad.sifra=1
    }else{
        grad.sifra = gradovi[gradovi.length - 1].sifra + 1
    }
    
    gradovi.push(grad)
}

// 3/4 Update od CRUD
async function promjeni(sifra,grad) {
    const index = nadiIndex(sifra)
    gradovi[index] = {...gradovi[index], ...grad}
}

function nadiIndex(sifra){
    return gradovi.findIndex(s=>s.sifra === parseInt(sifra))
}

// 4/4 Delete od CRUD
async function obrisi(sifra) {
    const index = nadiIndex(sifra);
    if (index > -1) {
        gradovi.splice(index, 1);
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