import { DATA_SOURCE } from "../../constants";
import gradoviServiceLocalStorage from "./GradServiceLocalStorage";
import gradoviServiceMemorija from "./gradoviServiceMemorija";



let Servis = null;

switch (DATA_SOURCE) {
    case 'memorija':
        Servis = gradoviServiceMemorija;
        break;

    case 'localStorage':
        Servis = gradoviServiceLocalStorage;
        break;
    default:
        Servis = null;
}


const PrazanServis = {
    get: async () =>({ success: false, data: [] }),
    getBySifra: async (sifra) => ({ success: false, data: {} }),
    dodaj: async (grad) => { console.error("Servis nije učitan"); },
  
    obrisi: async (sifra) => { console.error("Servis nije dostupan"); }


}


const AktivniServis = Servis || PrazanServis;

export default {
    get: () => AktivniServis.get(),
    getBySifra: (sifra) => AktivniServis.getBySifra(sifra),
    dodaj: (grad) => AktivniServis.dodaj(grad),
    promjeni: (sifra, grad) => AktivniServis.promjeni(sifra),
    obrisi: (sifra) => AktivniServis.obrisi(sifra)
}
