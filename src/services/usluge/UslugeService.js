<<<<<<< Updated upstream
import { usluge } from "./UslugePodaci";
=======


import { DATA_SOURCE } from "../../constants";
import UslugeServiceLocalStorage from "./UslugeServiceLocalStorage";
import UslugeServiceMemorija from "./UslugeServiceMemorija";



let Servis = null;

switch (DATA_SOURCE) {
    case 'memorija':
        Servis = UslugeServiceMemorija;
        break;

    case 'localStorage':
        Servis = UslugeServiceLocalStorage;
        break;
    default:
        Servis = null;
>>>>>>> Stashed changes

async function get() {
    return {data: [...usluge]}
    
}

<<<<<<< Updated upstream

async function dodaj(usluga) {
    if(usluge.length===0){
        usluga.sifra=1
    }else{
        usluga.sifra =usluge[usluge.length -1].sifra + 1
    }
    usluge.push(usluga)
    
}

async function getBySifra(sifra) {
    return {data: usluge.find(s => s.sifra === parseInt(sifra))}
    
}

async function promjeni(sifra,usluga) {
    const index =nadiIndex(sifra)
    usluge[index] = {...usluge[index], ...usluga}    
}

function nadiIndex(sifra){
    return usluge.findIndex(s=>s.sifra === parseInt(sifra))
}

async function obrisi(sifra) {
    const index =nadiIndex(sifra)
    usluge.splice(index,1)
    
}

export default{
    get,
    dodaj,
    getBySifra,
    promjeni,
    obrisi
}
=======
const PrazanServis = {
    get: async () =>({ success: false, data: [] }),
    getBySifra: async (sifra) => ({ success: false, data: {} }),
    dodaj: async (usluga) => { console.error("Servis nije učitan"); },
    prmjeni: async (usluga.smjer) => { console.error("Servis nije učitan"); },
    obrisi: async (sifra) => { console.error("Servis nije dostupan"); }

}


const AktivniServis = Servis || PrazanServis;

export default {
    get: () => AktivniServis.get(),
    getBySifra: (sifra) => AktivniServis.getBySifra(sifra),
    dodaj: (usluga) => AktivniServis.dodaj(usluga),
    promjeni: (sifra, usluga) => AktivniServis.promjeni(sifra),
    obrisi: (sifra) => AktivniServis.obrisi(sifra)
}

>>>>>>> Stashed changes
