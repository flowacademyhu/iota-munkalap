import React from 'react';
import { Formik, Form } from 'formik';
import { Link } from 'react-router-dom';
import Input from '../Input';
import Button from '../Button';
import PopUp from '../PopUp';
import SelectInput from '../SelectInput'
import getCurrentDate from './Date';
import schema from './ValidationWorkSheet'

function CreateWorkSheetForm({ sent, setSent, sentSuccessfully, popUpMessage, sendData, path, basePath, title }) {

  const itemList1 = [{ id: 1, label: "Telepítés", value: "INSTALLATION" },
  { id: 2, label: "Javítás", value: "REPAIR" },
  { id: 3, label: "Karbantartás", value: "MAINTENANCE" },
  { id: 4, label: "Egyéb", value: "OTHER" }]

  const itemList2 = [{ id: 1, label: "Térítéses", value: "REPAYMENT" },
  { id: 2, label: "Garanciális", value: "WARRANTY" }]

  const itemList3 = [{ id: 1, label: "Térítéses", value: "REPAYMENT" },
  { id: 2, label: "Garanciális", value: "WARRANTY" }]

  const itemList4 = [{ id: 1, label: "Készpénz", value: "CASH" },
  { id: 2, label: "Átutalás", value: "BANKTRANSFER" }]

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12">
          {sent
            && <PopUp
              body={popUpMessage}
              sentSuccessfully={sentSuccessfully}
              setSent={setSent}
              basePath={basePath}
              path={path}
            />}
          <Formik
            initialValues={{
              partnerId: '',
              typeOfWork: itemList1[1].value,
              customTypeOfWork: '',
              assetSettlement: itemList2[1].value,
              workingTimeAccounting: itemList3[1].value,
              numberOfEmployees: 0,
              overheadHour: 0,
              deliveryKm: 0,
              accountSerialNumber: '',
              description: '',
              usedMaterial: '',
              typeOfPayment: itemList4[1].value,
              localDateTime: getCurrentDate(),
              workerSignature: '',
              proofOfEmployment: '',
              status: ''
            }}
            validationSchema={schema}
            onSubmit={values => {
              // if (values.typeOfWork !== 'OTHER') {
              //   delete values.typeOfWorkOther
              // }
              console.log(values);
              sendData(values);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => {
              return (
                <Form>
                  <h1 className='text-center'>{title}</h1>
                  <Input name='partnerId' label='Partner' type='text' />
                  <SelectInput name='typeOfWork' label='Munkavégzés jellege' container={itemList1} />
                  { values.typeOfWork === "OTHER" &&
                    <Input name='customTypeOfWork' label='OTHER' type='text' />}
                  <SelectInput name='assetSettlement' label='Eszközök elszámolás módja' container={itemList2} />
                  <SelectInput name='workingTimeAccounting' label='Munkaidő elszámolás módja' container={itemList3} />
                  <Input name='numberOfEmployees' label='Létszám' type='number' min='0' />
                  <Input name='overheadHour' label='Rezsióra' type='number' min='0' />
                  <Input name='deliveryKm' label='Kiszállítás' type='number' min='0' />
                  <Input name='accountSerialNumber' label='A munkalaphoz tartozó számla sorszáma' type='text' />
                  <Input name='description' label='Elvégzett munka leírása' type='text' />
                  <Input name='usedMaterial' label='Felhasznált anyagok' type='text' />
                  <SelectInput name='typeOfPayment' label='Fizetés módja' container={itemList4} />
                  <span>Kelt: {getCurrentDate()}</span>
                  <Input name='workerSignature' label='Munkát végezte' placeholder="IDE KELL E-ALÁIRÁS" />
                  <Input name='proofOfEmployment' label='munkavégzést igazolja' placeholder='IDE KELL MÉG EGY E-ALÁÍRÁS' />

                  <div className='buttons'>
                    <Link to='/worksheets'>
                      <Button text='Mégse' moreClassName='h-auto' />
                    </Link>
                    <Button text='Mentés' type='submit' moreClassName='h-auto' />
                  </div>
                </Form>)
            }}
          </Formik>
        </div>
      </div>
    </div >
  )
}

export default CreateWorkSheetForm;

