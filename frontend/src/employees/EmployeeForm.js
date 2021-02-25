import React from 'react'
import { Formik, Form } from 'formik'
import { Link } from 'react-router-dom'
import Input from '../Input'
import Button from '../Button'
import PopUp from '../PopUp'
import { schema, regSchema } from './ValidationEmplyee'

function CreateEmployeeForm({
  sent,
  handleClick,
  popUpMessage,
  sendData,
  title,
  user,
  notRegistration,
}) {
  const initialValuesCreate = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  }
  const initialValuesEdit = {
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
  }
  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12">
          {sent && <PopUp handleClick={handleClick} body={popUpMessage} />}
          <Formik
            initialValues={
              notRegistration ? initialValuesEdit : initialValuesCreate
            }
            validationSchema={notRegistration ? schema : (schema, regSchema)}
            onSubmit={(values) => {
              sendData(values)
            }}
          >
            <Form>
              <h1 className="text-center">{title}</h1>
              <Input name="lastName" label="Vezetéknév" type="text" />
              <Input name="firstName" label="Keresztnév" type="text" />
              <Input name="email" label="E-mail" type="email" />
              <Input
                name="password"
                label="Jelszó"
                type="password"
                disabled={notRegistration}
              />
              <Input
                name="confirmPassword"
                label="Jelszó még egyszer"
                type="password"
                disabled={notRegistration}
              />
              <div className="buttons">
                <Link to="/employees">
                  <Button text="Mégse" moreClassName="h-auto w-auto" />
                </Link>
                <Button
                  text="Mentés"
                  type="submit"
                  moreClassName="h-auto w-auto"
                />
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default CreateEmployeeForm
