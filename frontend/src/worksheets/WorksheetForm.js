import React from 'react'
import { Formik, Form } from 'formik'
import { Link } from 'react-router-dom'
import Input from '../Input'
import Button from '../Button'
import PopUp from '../PopUp'
import SelectInput from '../SelectInput'
import { TYPE_OF_WORK } from '../Const'
import getCurrentDate from './Date'
import schema from './ValidationWorkSheet'
import {
  TYPE_OF_WORK_LIST,
  ASSET_SETTLEMENT_LIST,
  WORKING_TIME_ACCOUNT_LIST,
  TYPE_OF_PAYMENT_LIST,
} from './WorksheetDropdownOptions'
import Signature from './Signature'

function WorkSheetForm({
  sent,
  handleClick,
  popUpMessage,
  sendData,
  title,
  worksheet,
}) {
  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12">
          {sent && <PopUp handleClick={handleClick} body={popUpMessage} />}
          <Formik
            initialValues={{
              partnerId: '',
              typeOfWork: TYPE_OF_WORK_LIST[0].value,
              customTypeOfWork: '',
              assetSettlement: ASSET_SETTLEMENT_LIST[0].value,
              workingTimeAccounting: WORKING_TIME_ACCOUNT_LIST[0].value,
              numberOfEmployees: '',
              overheadHour: '',
              deliveryKm: '',
              accountSerialNumber: '',
              description: '',
              usedMaterial: '',
              typeOfPayment: TYPE_OF_PAYMENT_LIST[0].value,
              localDateTime: getCurrentDate(),
              workerSignature: '',
              proofOfEmployment: '',
              status: '',
              ...worksheet,
            }}
            validationSchema={schema}
            onSubmit={(values) => {
              sendData(values)
            }}
          >
            {({ values }) => {
              return (
                <Form>
                  <h1 className="text-center">{title}</h1>
                  <Input name="partnerId" label="Partner" type="text" />
                  <SelectInput
                    name="typeOfWork"
                    label="Munkavégzés jellege"
                    container={TYPE_OF_WORK_LIST}
                  />
                  {values.typeOfWork === TYPE_OF_WORK.OTHER && (
                    <Input name="customTypeOfWork" label="Egyéb" type="text" />
                  )}
                  <SelectInput
                    name="assetSettlement"
                    label="Eszközök elszámolás módja"
                    container={ASSET_SETTLEMENT_LIST}
                  />
                  <SelectInput
                    name="workingTimeAccounting"
                    label="Munkaidő elszámolás módja"
                    container={WORKING_TIME_ACCOUNT_LIST}
                  />
                  <Input
                    name="numberOfEmployees"
                    label="Létszám"
                    type="number"
                    min="0"
                  />
                  <Input
                    name="overheadHour"
                    label="Rezsióra"
                    type="number"
                    min="0"
                  />
                  <Input
                    name="deliveryKm"
                    label="Kiszállítás"
                    type="number"
                    min="0"
                  />
                  <Input
                    name="accountSerialNumber"
                    label="A munkalaphoz tartozó számla sorszáma"
                    type="text"
                  />
                  <Input
                    name="description"
                    label="Elvégzett munka leírása"
                    type="text"
                  />
                  <Input
                    name="usedMaterial"
                    label="Felhasznált anyagok"
                    type="text"
                  />
                  <SelectInput
                    name="typeOfPayment"
                    label="Fizetés módja"
                    container={TYPE_OF_PAYMENT_LIST}
                  />
                  <span>Kelt: {getCurrentDate()}</span>
                  <div className="mt-3">
                    Munkát elvégezte:
                    <Signature name="workerSignature" />
                  </div>
                  <div className="mt-3">
                    Munkavégzést igazolja:
                    <Signature name="proofOfEmployment" />
                  </div>
                  <div className="buttons">
                    <Link to="/worksheets">
                      <Button text="Mégse" moreClassName="h-auto" />
                    </Link>
                    <Button
                      text="Mentés"
                      type="submit"
                      moreClassName="h-auto"
                    />
                  </div>
                </Form>
              )
            }}
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default WorkSheetForm