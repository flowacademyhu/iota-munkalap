import * as yup from 'yup'
import { MEGRENDELO_TIPUSA } from '../Const'

export default function schema() {
  const schema = yup.object().shape({
    partnerEmail: yup
      .string()
      .required('E-mail megadása kötelező!')
      .email('Nem megfelelő email cím!'),
    telefon: yup
      .string()
      .required('Telefon megadása kötelező')
      .matches(/([0-9])/, 'Nem megfelelő formátum!'),
    megrendeloTipusa: yup.string().required('Kötelező mező!'),
    nev: yup.string().required('Név megadása kötelező!'),
    rovidNev: yup.string(),
    adoszam: yup.string().when('megrendeloTipusa', {
      is: MEGRENDELO_TIPUSA.LEGAL,
      then: yup
        .string()
        .required('Adószám megadása kötelező!')
        .length(8, 'Az adószám 8 számjegyet kell tartalmazzon!')
        .matches(/([0-9]{8})/),
      otherwise: yup.string(),
    }),
    kadoszamtipus: yup.number().when('megrendeloTipusa', {
      is: MEGRENDELO_TIPUSA.LEGAL,
      then: yup
        .number()
        .required('kAdószám megadása kötelező!')
        .min(1, 'A kadószám 1 és 5 közötti szám!')
        .max(5, 'A kadószám 1 és 5 közötti szám!'),
      otherwise: yup.number(),
    }),
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
    szamlazasiCimTelepulesNev: yup
      .string()
      .required('Település megadása kötelező'),
    szamlazasiCimKerulet: yup.string(),
    szamlazasiCimKozteruletNev: yup.string().required(),
    szamlazasiCimKozteruletJellegNev: yup.string().required(),
    szamlazasiCimHazszam: yup.string().required(),
    szamlazasiCimEpulet: yup.string(),
    szamlazasiCimLepcsohaz: yup.string(),
    szamlazasiCimSzint: yup.string(),
    szamlazasiCimAjto: yup.string(),
    szamlazasiCimHrsz: yup.string(),
  })

  return schema
}
