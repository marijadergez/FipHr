import { z } from 'zod'

export const ShemaUsluga = z.object({
  naziv: z.string()
    .trim()
    .min(1, "Naziv je obavezan i ne smije sadržavati samo razmake!")
    .min(3, "Naziv smjera mora imati najmanje 3 znaka!")
    .max(50, "Naziv smjera može imati najviše 50 znakova!"),

  trajanje: z.coerce.number({
    invalid_type_error: "Trajanje mora biti broj!",
  })
    .min(1, "Trajanje mora biti između 1 i 500 sati!")
    .max(500, "Trajanje mora biti između 1 i 500 sati!"),

  cijena: z.coerce.number({
    invalid_type_error: "Cijena mora biti broj!",
  })
    .min(0, "Cijena ne može biti negativan broj!"),

  datumPokretanja: z.coerce.date({
    errorMap: (issue, ctx) => {
      if (issue.code === z.ZodIssueCode.invalid_date) {
        return { message: "Molimo unesite ispravan format datuma!" };
      }
      return { message: ctx.defaultError };
    },
    invalid_type_error: "Molimo unesite ispravan format datuma!",
    required_error: "Datum je obavezan!"
  })
    .refine((odabraniDatum) => {
      const danas = new Date();
      danas.setHours(0, 0, 0, 0);
      return odabraniDatum >= danas;
    }, "Datum pokretanja ne može biti u prošlosti!")
});
