import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { Link } from 'react-router-dom';
import Input from '../Input';
import Button from '../Button';
import PopUp from '../PopUp';
import SelectInput from '../SelectInput'
import getCurrentDate from './Date';
import schema from './ValidationWorkSheet'

function CreateWorkSheetForm({ sent, setSent, sentSuccessfully, popUpMessage, sendData, path, title }) {

  const [value, setValue] = useState("");

  function handleChange(param) {
    setValue(param);

  }

  const itemList1 = [{ id: 1, label: "Telepítés", value: "installation" },
  { id: 2, label: "Javítás", value: "repair" },
  { id: 3, label: "Karbantartás", value: "maintenance" },
  { id: 4, label: "Egyéb", value: "other" }]

  const itemList2 = [{ id: 1, label: "Térítéses", value: "repayment" },
  { id: 2, label: "Garanciális", value: "warranty" }]

  const itemList3 = [{ id: 1, label: "Térítéses", value: "repayment" },
  { id: 2, label: "Garanciális", value: "warranty" }]

  const itemList4 = [{ id: 1, label: "Készpénz", value: "cash" },
  { id: 2, label: "Átutalás", value: "transfer" }]

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
              partner: '',
              typeOfWork: '',
              assetSettlement: '',
              workingTimeAccounting: '',
              numberOfEmployees: 0,
              overheadHour: 0,
              deliveryKm: 0,
              accountSerialNumber: '',
              description: '',
              usedMaterial: '',
              typeOfPayment: '',
              localDateTime: getCurrentDate(),
              workerSignature: '',
              proofOfEmployment: '',
              status: ''
            }}
            validationSchema={schema}
            onSubmit={values => {
              sendData(values);
            }}
          >
            <Form>
              <h1 className='text-center'>{title}</h1>
              <Input name='partner' label='Partner' type='text' />
              <SelectInput handleChange={handleChange} name='typeOfWork' label='Munkavégzés jellege' container={itemList1} />
              {value === 'other' &&
                <Input name='typeOfWork' label='Egyéb' type='text' />}
              <SelectInput handleChange={handleChange} name='assetSettlement' label='Eszközök elszámolás módja' container={itemList2} />
              <SelectInput handleChange={handleChange} name='workingTimeAccounting' label='Munkaidő elszámolás módja' container={itemList3} />
              <Input name='numberOfEmployees' label='Létszám' type='number' />
              <Input name='overheadHour' label='Rezsióra' type='number' />
              <Input name='deliveryKm' label='Kiszállítás' type='number' />
              <Input name='accountSerialNumber' label='A munkalaphoz tartozó számla sorszáma' type='text' />
              <Input name='description' label='Elvégzett munka leírása' type='text' />
              <Input name='usedMaterial' label='Felhasznált anyagok' type='text' />
              <SelectInput handleChange={handleChange} name='typeOfPayment' label='Fizetés módja' container={itemList4} />
              <Input name='localDateTime' label='Kelt' />
              <Input name='workerSignature' label='Munkát végezte' placeholder="IDE KELL E-ALÁIRÁS" />
              <Input name='proofOfEmployment' label='munkavégzést igazolja' placeholder='IDE KELL MÉG EGY E-ALÁÍRÁS' />

              <div className='buttons'>
                <Link to='/worksheets'>
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

export default CreateWorkSheetForm;

