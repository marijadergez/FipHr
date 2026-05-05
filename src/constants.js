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
    
    GENERIRANJE_PODATAKA: '/generiraj-podatke',

    PONUDE: '/ponude',
    PONUDE_NOVI: '/ponude/novi',
    PONUDE_PROMJENA: '/ponude/:sifra',

    LOGIN: '/login',
    REGISTRACIJA: '/registracija',

    NADZORNA_PLOCA: '/nadzorna-ploca',

    TEST: 'test'


}

// memorija, localStorage, firebase
export const DATA_SOURCE = 'localStorage';

export const PrefixStorage = {
    USLUGE: 'usluge',
    KORISNICI: 'korisnici',
    GRADOVI: 'gradovi',
    PONUDE: 'ponude',
    OPERATERI: 'operateri'
}
