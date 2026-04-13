
import { DATA_SOURCE } from "../../constants";
import PonudaServiceLocalStorage from "../ponude/PonudaServiceLocalStorage";
import PonudaServiceMemorija from "../ponude/PonudaServiceMemorija";



let Servis = null;

switch (DATA_SOURCE) {
    case 'memorija':
        Servis = PonudaServiceMemorija;
        break;

    case 'localStorage':
        Servis = PonudaServiceLocalStorage;
        break;
    default:
        Servis = null;
}


const PrazanServis = {
    get: async () =>({ success: false, data: [] }),
    getBySifra: async (sifra) => ({ success: false, data: {} }),
    dodaj: async (ponuda) => { console.error("Servis ponuda nije učitan"); },
    promjeni: async (sifra, ponuda) => { console.error("Servis nije učitan"); },
    obrisi: async (sifra) => { console.error("Servis šifra ponuda nije dostupan"); }


}


const AktivniServis = Servis || PrazanServis;

export default {
    get: () => AktivniServis.get(),
    getBySifra: (sifra) => AktivniServis.getBySifra(sifra),
    dodaj: (ponuda) => AktivniServis.dodaj(ponuda),
    promjeni: (sifra, ponuda) => AktivniServis.promjeni(sifra,ponuda),
    obrisi: (sifra) => AktivniServis.obrisi(sifra)
}
