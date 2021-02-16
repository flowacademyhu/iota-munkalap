import * as yup from 'yup';

export default function schema() {

  const schema = yup.object().shape({
    partner: yup
      .string()
      .required("Partner megadása kötelező!"),
    typeOfWork: yup
      .string()
      .required("Munkavégzés jellegének megadása kötelező!"),
    assetSettlement: yup
      .string()
      .required("Eszköz elszámolásának módját kötelező megadni!"),
    workingTimeAccounting: yup
      .string()
      .required("Munkaidő elszámolásának módját kötelező megadni!"),
    numberOfEmployees: yup
      .number()
      .required("Létszám megadása kötelező!")
      .min(1, 'Legalább 1 fő.'),
    overheadHour: yup
      .number()
      .required("Rezsióra megadása kötelező!")
      .min(1, 'Minimum 1!'),
    deliveryKm: yup
      .number()
      .required("Kiszállítás megadása kötelező!")
      .min(0, 'Minimum 0!'),
    accountSerialNumber: yup
      .string(),
    description: yup
      .string()
      .required("Elvégzett munka leírása kötelező!"),
    usedMaterial: yup
      .string()
      .required("Felhasznált anyagok megadása kötelező!"),
    typeOfPayment: yup
      .string()
      .required("Fizetési mód megadása kötelező!"),
    date: yup
      .string()
      .required("Dátum megadása kötelező!"),
    workerSignature: yup
      .string()
      .required("Aláírás kötelező!"),
    proofOfEmployment: yup
      .string()
      .required("Munkavégzés igazolása kötelező!"),
  });

  return schema;

}