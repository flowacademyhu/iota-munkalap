import * as yup from 'yup'

export default function schema() {
  const schema = yup.object().shape({
    partnerEmail: yup
      .string()
      .required('E-mail megadása kötelező!')
      .email('Nem megfelelő email cím!'),
    telefon: yup.string().required('Telefon megadása kötelező'),
    megrendeloTipusa: yup.string().required(),
    nev: yup.string().required('Név megadása kötelező!'),
    rovidNev: yup.string(),
    adoszam: yup
      .string()
      .required('Adószám megadása kötelező!')
      .length(8, 'Az adószám 8 számjegyet kell tartalmazzon!')
      .matches(/([0-9]{8})/),
    kAdoszamtipus: yup
      .number()
      .required('kAdószám megadása kötelező!')
      .min(1, 'A kadószám 1 és 5 közötti szám!')
      .max(5, 'A kadószám 1 és 5 közötti szám!'),
    bankszamlaszam: yup
      .string()
      .matches(
        /([0-9]{8})-([0-9]{8})/ || /([0-9]{8})-([0-9]{8})-([0-9]{8})/,
        'Nem megfelelő bankszámlaszám! Bankszámlaszám formátuma: 12345678-12345678 vagy 12345678-12345678-12345678'
      ),
    szamlazasiCimOrszagKod: yup
      .string()
      .required('Országkód megadása kötelező!'),
    szamlazasiCimOrszagNev: yup
      .string()
      .required('Országnév megadása kötelező!'),
    szamlazasiCimMegyeNev: yup.string().required('Megye megadása kötelező!'),
    szamlazasiCimIranyitoszam: yup
      .string()
      .required('Irányítószám megadása kötelező'),
    SzamlazasiCimTelepulesNev: yup
      .string()
      .required('Település megadása kötelező'),
    SzamlazasiCimKerulet: yup.string(),
    SzamlazasiCimKozteruletNev: yup.string().required(),
    SzamlazasiCimKozteruletJellegNev: yup.string().required(),
    SzamlazasiCimHazszam: yup.string().required(),
    SzamlazasiCimEpulet: yup.string(),
    SzamlazasiCimLepcsohaz: yup.string(),
    SzamlazasiCimSzint: yup.string(),
    SzamlazasiCimAjto: yup.string(),
    SzamlazasiCimHrsz: yup.string(),
  })

  return schema
}
