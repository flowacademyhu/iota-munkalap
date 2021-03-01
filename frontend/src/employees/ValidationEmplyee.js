import * as yup from 'yup'

export function schema(isCreate) {
  const schema = yup.object().shape({
    lastName: yup.string().required('A vezetéknév kötelező!'),
    firstName: yup.string().required('A keresztnév kötelező!'),
    email: yup
      .string()
      .required('Az email kötelező!')
      .email('Nem megfelelő email cím!'),
  })

  const regSchema = yup.object().shape({
    lastName: yup.string().required('A vezetéknév kötelező!'),
    firstName: yup.string().required('A keresztnév kötelező!'),
    email: yup
      .string()
      .required('Az email kötelező!')
      .email('Nem megfelelő email cím!'),
    password: yup
      .string()
      .required('A jelszó kötelező!')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
        'A jelszó minimum 8 karakter hosszú, tartalmaznia kell kis- és nagybetűt, valamint számot!'
      ),
    confirmPassword: yup
      .string()
      .required('Add meg a jelszót még egyszer!')
      .oneOf([yup.ref('password')], 'A két jelszó nem egyezik meg!'),
  })
  return isCreate ? regSchema : schema
}
