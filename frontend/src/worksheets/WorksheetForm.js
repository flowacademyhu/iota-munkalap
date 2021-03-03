import React, { useState, useRef } from 'react'
import moment from 'moment'
import { Formik, Form } from 'formik'
import { Link } from 'react-router-dom'
import Input from '../Input'
import Button from '../Button'
import PopUp from '../PopUp'
import SelectInput from '../SelectInput'
import { TYPE_OF_WORK } from '../Const'
import schema from './ValidationWorkSheet'
import {
  TYPE_OF_WORK_LIST,
  ASSET_SETTLEMENT_LIST,
  WORKING_TIME_ACCOUNT_LIST,
  TYPE_OF_PAYMENT_LIST,
} from './WorksheetDropdownOptions'
import Signature from './Signature'
import CalendarDropDown from '../CalendarDropDown'
import TextareaInput from '../TextareaInput'
import '../style.css'

export default function WorkSheetForm({
  sent,
  handleClick,
  popUpMessage,
  sendData,
  title,
  worksheet,
}) {
  const finalize = useRef(false)
  const [date, setDate] = useState(new Date())

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
              createdAt: '',
              workerSignature: '',
              proofOfEmployment: '',
              worksheetStatus: 'CREATED',
              ...worksheet,
            }}
            validationSchema={schema}
            onSubmit={(values) => {
              if (finalize.current) {
                values.worksheetStatus = 'REPORTED'
              } else {
                values.worksheetStatus = 'CREATED'
              }
              values.createdAt = moment(date).format('yyyy-MM-DD')
              sendData(values)
            }}
          >
            {({ values }) => {
              let notEditable =
                values.worksheetStatus === 'REPORTED' ||
                values.worksheetStatus === 'CLOSED'
                  ? true
                  : false

              let isClosed = values.worksheetStatus === 'Closed'

              return (
                <Form>
                  <h1 className="text-center">{title}</h1>
                  <Input
                    name="partnerId"
                    label="Partner"
                    type="text"
                    disabled={notEditable}
                  />
                  <SelectInput
                    status={notEditable}
                    name="typeOfWork"
                    label="Munkavégzés jellege"
                    container={TYPE_OF_WORK_LIST}
                  />
                  {values.typeOfWork === TYPE_OF_WORK.OTHER && (
                    <Input name="customTypeOfWork" label="Egyéb" type="text" />
                  )}
                  <SelectInput
                    status={notEditable}
                    name="assetSettlement"
                    label="Eszközök elszámolás módja"
                    container={ASSET_SETTLEMENT_LIST}
                  />
                  <SelectInput
                    status={notEditable}
                    name="workingTimeAccounting"
                    label="Munkaidő elszámolás módja"
                    container={WORKING_TIME_ACCOUNT_LIST}
                  />
                  <Input
                    disabled={notEditable}
                    name="numberOfEmployees"
                    label="Létszám"
                    type="number"
                    min="0"
                  />
                  <Input
                    disabled={notEditable}
                    name="overheadHour"
                    label="Rezsióra"
                    type="number"
                    min="0"
                  />
                  <Input
                    disabled={notEditable}
                    name="deliveryKm"
                    label="Kiszállás"
                    type="number"
                    min="0"
                  />
                  <Input
                    name="accountSerialNumber"
                    label="A munkalaphoz tartozó számla sorszáma"
                    type="text"
                  />
                  <TextareaInput
                    status={notEditable}
                    disabled={notEditable}
                    name="description"
                    label="Elvégzett munka leírása"
                  />
                  <Input
                    disabled={notEditable}
                    name="usedMaterial"
                    label="Felhasznált anyagok"
                    type="text"
                  />
                  <SelectInput
                    status={notEditable}
                    name="typeOfPayment"
                    label="Fizetés módja"
                    container={TYPE_OF_PAYMENT_LIST}
                  />
                  <span>Kelt: </span>
                  <CalendarDropDown
                    status={notEditable}
                    disabled={notEditable}
                    date={date}
                    setDate={setDate}
                  />
                  <div className={notEditable ? 'hidden' : 'mt-3'}>
                    Munkát elvégezte:
                    <Signature name="workerSignature" disabled={notEditable} />
                  </div>
                  <div className={notEditable ? 'hidden' : 'mt-3'}>
                    Munkavégzést igazolja:
                    <Signature
                      name="proofOfEmployment"
                      disabled={notEditable}
                    />
                  </div>
                  <div className="buttons">
                    <Link to="/worksheets">
                      <Button
                        text="Mégse"
                        moreClassName="h-auto"
                        disabled={notEditable}
                      />
                    </Link>
                    <Button
                      text="Mentés"
                      type="submit"
                      onClick={() => (finalize.current = false)}
                      moreClassName="h-auto"
                    />
                  </div>
                  <div className="buttons">
                    <Button
                      text="Mentés és készre jelentés"
                      type="submit"
                      onClick={() => (finalize.current = true)}
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
