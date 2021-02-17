import React from 'react';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import Input from '../Input';
import Button from '../Button';
import PopUp from '../PopUp';

const schema = yup.object().shape({
  partner: yup
    .string()
    .required("A partner kötelező!"),
    typeOfWork: yup
    .string()
    .required("A munkavégzés jellege kötelező!"),
    assetSettlement: yup
    .string()
    .required("Az eszközökök elszámolásának módja kötelező!"),
    description: yup
    .string()
    .required("A leírás kötelező!"),
    usedMaterial: yup
    .string()
    .required("A felhasznált anyag kötelező!")
});

function UpdateWorksheetForm({ sent, setSent, sentSuccessfully, popUpMessage, sendData, path,
  title, worksheet }) {
  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12">
          {sent
            && <PopUp
              body={popUpMessage}
              sentSuccessfully={sentSuccessfully}
              setSent={setSent}
              path={path}
            />}
          <Formik
            initialValues={{
              partner: worksheet.partner || '',
              typeOfWork: worksheet.typeOfWork || '',
              assetSettlement: worksheet.assetSettlement || '',
              description: worksheet.description || '',
              usedMaterial: worksheet.usedMaterial || '',
            }}
            validationSchema={schema}
            onSubmit={values => {
              sendData(values);
            }}
          >
            <Form>
              <h1 className='text-center'>{title}</h1>
              <Input name='partner' label='Partner' type='text' />
              <Input name='typeOfWork' label='Munkavégzés jellege' type='text' />
              <Input name='assetSettlement' label='Eszközök elszámolásának módja' type='text' />
              <Input name='description' label='Leírás' type='text' />
              <Input name='usedMaterial' label='Felhasznált anyagom' type='text' />
              <div className='buttons'>
                <Link to='/worksheet'>
                  <Button text='Mégse' moreClassName='h-auto' />
                </Link>
                <Button text='Mentés' type='submit' moreClassName='h-auto' />
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div >
  )
}

export default UpdateWorksheetForm;
