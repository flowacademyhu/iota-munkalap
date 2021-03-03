import React, { useRef } from 'react'
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
import SearchSelect from '../SearchSelect'
import usePartners from '../hooks/usePartners'
import LoadingScreen from '../LoadingScreen'

export default function WorkSheetForm({
  sent,
  handleClick,
  popUpMessage,
  sendData,
  title,
  worksheet,
}) {
  const { partners } = usePartners()
  const partnersForSelect = partners?.map((partner) => ({
    label: `${partner.nev}, a.sz.: ${partner.adoszam}`,
    value: partner.partnerId,
  }))

  const finalize = useRef(false)
  return partnersForSelect ? (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12">
          {sent && <PopUp handleClick={handleClick} body={popUpMessage} />}
          <Formik
            initialValues={{
              partnerId: worksheet?.partner.partnerId || '',
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
              createdAt: moment(new Date()).format('yyyy-MM-DD'),
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
              values.createdAt = moment(values.createdAt).format('yyyy-MM-DD')
              sendData(values)
            }}
          >
            {({ values, setFieldValue }) => {
              let notEditable =
                values.worksheetStatus === 'REPORTED' ||
                values.worksheetStatus === 'CLOSED'
                  ? true
                  : false

              let isReported = values.worksheetStatus === 'REPORTED'

              return (
                <Form>
                  <h1 className="text-center">{title}</h1>
                  <SearchSelect
                    status={notEditable}
                    options={partnersForSelect}
                    name="partnerId"
                    label="Partner"
                    placeholder="Partner neve"
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
                  <TextareaInput
                    status={notEditable}
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
                  <Input
                    disabled={isReported ? false : notEditable}
                    name="accountSerialNumber"
                    label="A munkalaphoz tartozó számla sorszáma"
                    type="text"
                  />
                  <span>Kelt: </span>
                  <CalendarDropDown
                    status={notEditable}
                    name="createdAt"
                    setFieldValue={setFieldValue}
                    value={values.createdAt}
                  />
                  <div className={notEditable ? 'hidden' : 'mt-3'}>
                    Munkát elvégezte:
                    <Signature name="workerSignature" />
                  </div>
                  <div className={notEditable ? 'hidden' : 'mt-3'}>
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
  ) : (
    <LoadingScreen />
  )
}
