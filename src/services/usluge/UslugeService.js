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
}


const PrazanServis = {
    get: async () =>({ success: false, data: [] }),
    getBySifra: async (sifra) => ({ success: false, data: {} }),
    dodaj: async (usluga) => { console.error("Servis nije učitan"); },
  
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

