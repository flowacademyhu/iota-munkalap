import * as yup from 'yup'

export function schema() {
  const schema = yup.object().shape({
    lastName: yup.string().required('A vezetéknév kötelező!'),
    firstName: yup.string().required('A keresztnév kötelező!'),
    email: yup
      .string()
      .required('Az email kötelező!')
      .email('Nem megfelelő email cím!'),
  })
  return schema
}

export function regSchema() {
  const regSchema = yup.object().shape({
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
  return regSchema
}