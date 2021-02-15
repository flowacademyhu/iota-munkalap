import React, {useState} from 'react';
import { Formik, Form } from 'formik';
import { Link } from 'react-router-dom';
import Input from '../Input';
import Button from '../Button';
import PopUp from '../PopUp';
import SelectInput from '../SelectInput'
import getCurrentDate from './Date';

function CreateWorkSheetForm({ sent, setSent, sentSuccessfully, popUpMessage, sendData, path,
  title, name, email }) {

    const [value, setValue] = useState("alma");

    // function handleChange(param) {
    //   setValue(param);

    // }


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
              date: '',
              workerSignature: '',
              proofOfEmployment: '',
              status: '',
            }}
            onSubmit={values => {
              sendData(values);
            }}
          >
            <Form>
              <h1 className='text-center'>{title}</h1>
              <Input name='partner' label='Partner' type='text' />
              <SelectInput handleChange={setValue} name='typeOfWork' label='Munkavégzés jellege' container={itemList1} />
              {value === 'other' &&
              <Input name='typeOfWork' label='Egyéb' type='text' />}
              <div>{value}</div>
              <SelectInput  name='assetSettlement' label='Eszközök elszámolás módja' container={itemList2} />
              <SelectInput name='workingTimeAccounting' label='Munkaidő elszámolás módja' container={itemList3} />
              <Input name='numberOfEmployees' label='Létszám' type='number' />
              <Input name='overHeadHour' label='Rezsióra' type='number' />
              <Input name='delivery' label='Kiszállítás' type='number' />
              <Input name='accountSerialNumber' label='A munkalaphoz tartozó számla sorszáma' type='text' />
              <Input name='description' label='Elvégzett munka leírása' type='text' />
              <Input name='usedMaterial' label='Felhasznált anyagok' type='text' />
              <SelectInput name='typeOfPayment' label='Fizetés módja' container={itemList4} />
              <div>Kelt: {getCurrentDate()} </div>
              <div>Munkát végezte: IDE KELL E-ALÁÍRÁS</div>
              <div>munkavégzést igazolja: IDE KELL MÉG EGY E-ALÁÍRÁS</div>


              <div className='buttons'>
                <Link to='/employees'>
                  <Button text='Mégse' />
                </Link>
                <Button text='Mentés' type='submit' />
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div >
  )
}

export default CreateWorkSheetForm;

