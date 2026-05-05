import { z } from 'zod'

export const ShemaKorisnik = z.object({
  ime: z.string()
    .trim()
    .min(1, "Ime je obavezno i ne smije sadržavati samo razmake!")
    .min(2, "Ime mora imati najmanje 2 znaka!")
    .max(20, "Ime može imati najviše 20 znakova!"),
    
  prezime: z.string()
    .trim()
    .min(1, "Prezime je obavezno i ne smije sadržavati samo razmake!")
    .min(2, "Prezime mora imati najmanje 2 znaka!")
    .max(20, "Prezime može imati najviše 20 znakova!"),
    
  email: z.email({ message: "Email nije u ispravnom formatu!" })
    .transform(val => val.trim()),
    
  
    
});
// https://github.com/domagojpa/oib-validation
