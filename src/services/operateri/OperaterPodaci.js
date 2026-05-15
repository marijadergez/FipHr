import bcrypt from 'bcryptjs'

// Inicijalni operateri s hashiranim lozinkama
// Lozinka za sve: "Edunova123!"
const hashiranaLozinka = bcrypt.hashSync('Edunova123!', 10)

export const operateri = [
    {
        sifra: '1',
        email: 'admin@edunova.hr',
        lozinka: hashiranaLozinka,
        uloga: 'admin'
    },
    {
        sifra: '2',
        email: 'operater@edunova.hr',
        lozinka: hashiranaLozinka,
        uloga: 'korisnik'
    },
       {
        sifra: '3',
        email: 'referada@edunova.hr',
        lozinka: hashiranaLozinka,
        uloga: 'admin'
    },
    {
        sifra: '4',
        email: 'korisnik@edunova.hr',
        lozinka: hashiranaLozinka,
        uloga: 'korisnik'
    }
]

export default{
    operateri
}