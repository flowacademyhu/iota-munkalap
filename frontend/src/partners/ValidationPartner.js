import * as yup from 'yup'
import { CUSTOMER_TYPE } from '../Const'

export default function schema() {
  const schema = yup.object().shape({
    partnerEmail: yup
      .string()
      .required('Kötelező mező!')
      .email('Nem megfelelő email cím!'),
    telefon: yup
      .string()
      .required('Kötelező mező!')
      .matches(/([0-9])/, 'Nem megfelelő formátum!'),
    megrendeloTipusa: yup.string().required('Kötelező mező!'),
    nev: yup.string().required('Kötelező mező!'),
    rovidNev: yup.string(),
    adoszam: yup.string().when('megrendeloTipusa', {
      is: CUSTOMER_TYPE.LEGAL,
      then: yup
        .string()
        .required('Kötelező mező!')
        .length(8, 'Az adószám 8 számjegyet kell tartalmazzon!')
        .matches(/([0-9]{8})/),
      otherwise: yup.string(),
    }),
    kadoszamtipus: yup.number().when('megrendeloTipusa', {
      is: CUSTOMER_TYPE.LEGAL,
      then: yup
        .number()
        .required('Kötelező mező!')
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
    szamlazasiCimOrszagKod: yup.string().required('Kötelező mező!'),
    szamlazasiCimOrszagNev: yup.string().required('Kötelező mező!'),
    szamlazasiCimMegyeNev: yup.string().required('Kötelező mező!'),
    szamlazasiCimIranyitoszam: yup.string().required('Kötelező mező!'),
    szamlazasiCimTelepulesNev: yup.string().required('Kötelező mező!'),
    szamlazasiCimKerulet: yup.string(),
    szamlazasiCimKozteruletNev: yup.string().required('Kötelező mező!'),
    szamlazasiCimKozteruletJellegNev: yup.string().required('Kötelező mező!'),
    szamlazasiCimHazszam: yup.string().required('Kötelező mező!'),
    szamlazasiCimEpulet: yup.string(),
    szamlazasiCimLepcsohaz: yup.string(),
    szamlazasiCimSzint: yup.string(),
    szamlazasiCimAjto: yup.string(),
    szamlazasiCimHrsz: yup.string(),
  })

  return schema
}
