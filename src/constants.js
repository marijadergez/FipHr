export const IME_APLIKACIJE = 'FipHR'

export const RouteNames = {
    HOME: '/',
    USLUGE: '/usluge',
    USLUGE_NOVI:'/usluge/novi',
    USLUGE_PROMJENA: '/usluge/:sifra',

    KORISNICI: '/korisnici',
    KORISNICI_NOVI: '/korisnici/novi',
    KORISNICI_PROMJENA: '/korisnici/:sifra',

    GRADOVI: '/gradovi',
    GRADOVI_NOVI: '/gradovi/novi',
    GRADOVI_PROMJENA: '/gradovi/:sifra',
    
    OPERATERI: '/operateri',
    OPERATERI_NOVI: '/operateri/novi',
    OPERATERI_PROMJENA: '/operateri/:sifra',
    OPERATERI_PROMJENA_LOZINKE: '/operateri/:sifra/lozinka',
    GENERIRANJE_PODATAKA: '/generiraj-podatke',

    PONUDE: '/ponude',
    PONUDE_NOVI: '/ponude/novi',
    PONUDE_PROMJENA: '/ponude/:sifra',

    LOGIN: '/login',
    REGISTRACIJA: '/registracija',

    NADZORNA_PLOCA: '/nadzorna-ploca',




}

// memorija, localStorage, firebase
export const DATA_SOURCE = "localStorage"         // localStorage.getItem('dataSource') || 'firebase';

export const PrefixStorage = {
    USLUGE: 'e31.usluge',
    KORISNICI: 'e31.korisnici',
    GRADOVI: 'e31.gradovi',
    PONUDE: 'e31.ponude',
    OPERATERI: 'e31.operateri'
}
