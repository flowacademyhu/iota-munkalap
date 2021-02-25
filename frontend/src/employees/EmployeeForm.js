import React from 'react'
import { Formik, Form } from 'formik'
import * as yup from 'yup'
import { Link } from 'react-router-dom'
import Input from '../Input'
import Button from '../Button'
import PopUp from '../PopUp'
import schema from './ValidationEmplyee'

function CreateEmployeeForm({
  sent,
  handleClick,
  popUpMessage,
  sendData,
  title,
  user,
  registration,
}) {
  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12">
          {sent && <PopUp handleClick={handleClick} body={popUpMessage} />}
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
              password: '',
              confirmPassword: '',
              ...user,
            }}
            registration
            validationSchema={schema}
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
                disabled={registration}
              />
              <Input
                name="confirmPassword"
                label="Jelszó még egyszer"
                type="password"
                disabled={registration}
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
