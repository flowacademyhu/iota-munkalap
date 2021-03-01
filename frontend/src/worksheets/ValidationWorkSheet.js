import * as yup from 'yup'
import { TYPE_OF_WORK } from '../Const'

export default function schema() {
  const schema = yup.object().shape({
    partnerId: yup.string().required('Partner megadása kötelező!'),
    typeOfWork: yup
      .string()
      .required('Munkavégzés jellegének megadása kötelező!'),
    customTypeOfWork: yup.string().when('typeOfWork', {
      is: TYPE_OF_WORK.OTHER,
      then: yup.string().required('Munkavégzés jellegének megadása kötelező!'),
      otherwise: yup.string(),
    }),
    assetSettlement: yup
      .string()
      .required('Eszköz elszámolásának módját kötelező megadni!'),
    workingTimeAccounting: yup
      .string()
      .required('Munkaidő elszámolásának módját kötelező megadni!'),
    numberOfEmployees: yup
      .number()
      .required('Létszám megadása kötelező!')
      .min(1, 'Legalább 1 fő.'),
    overheadHour: yup
      .number()
      .required('Rezsióra megadása kötelező!')
      .min(1, 'Minimum 1!'),
    deliveryKm: yup
      .number()
      .required('Kiszállás megadása kötelező!')
      .min(0, 'Minimum 0!'),
    accountSerialNumber: yup.string(),
    description: yup.string().required('Elvégzett munka leírása kötelező!'),
    usedMaterial: yup
      .string()
      .required('Felhasznált anyagok megadása kötelező!'),
    typeOfPayment: yup.string().required('Fizetési mód megadása kötelező!'),
    workerSignature: yup.string().required('Aláírás kötelező!'),
    proofOfEmployment: yup.string().required('Munkavégzés igazolása kötelező!'),
  })

  return schema
}
