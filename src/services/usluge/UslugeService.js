import { usluge } from "./UslugePodaci";

async function get() {
    return {data: [...usluge]}
    
}


async function dodaj(usluga) {
    if(usluge.length===0){
        usluge.sifra=1
    }else{
        usluge.sifra =usluge[usluge.length -1].sifra + 1
    }
    usluge.push(usluga)
    
}

async function getBySifra(sifra) {
    return {data: usluge.find(s => s.sifra === parseInt(sifra))}
    
}

async function promjeni(sifra,usluga) {
    const index =nadiIndex(sifra)
    usluge[index] = {...usluge[index], ...usluge}    
}

function nadiIndex(sifra){
    return usluge.findIndex(s=>sifra === parseInt(sifra))
}

export default{
    get,
    dodaj,
    getBySifra,
    promjeni
}