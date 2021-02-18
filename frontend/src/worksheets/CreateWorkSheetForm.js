import React from 'react'
import { Formik, Form } from 'formik'
import { Link } from 'react-router-dom'
import Input from '../Input'
import Button from '../Button'
import PopUp from '../PopUp'
import SelectInput from '../SelectInput'
import getCurrentDate from './Date'
import schema from './ValidationWorkSheet'
import { TYPE_OF_WORK } from '../Const'

function CreateWorkSheetForm({
  sent,
  handleClick,
  popUpMessage,
  sendData,
  title,
}) {
  const typeOfWorkList = [
    { label: 'Telepítés', value: 'INSTALLATION' },
    { label: 'Javítás', value: 'REPAIR' },
    { label: 'Karbantartás', value: 'MAINTENANCE' },
    { label: 'Egyéb', value: TYPE_OF_WORK.OTHER },
  ]

  const assetSettlementList = [
    { label: 'Térítéses', value: 'REPAYMENT' },
    { label: 'Garanciális', value: 'WARRANTY' },
  ]

  const workingTimeAccountingList = [
    { label: 'Térítéses', value: 'REPAYMENT' },
    { label: 'Garanciális', value: 'WARRANTY' },
  ]

  const typeOfPaymentList = [
    { label: 'Készpénz', value: 'CASH' },
    { label: 'Átutalás', value: 'BANKTRANSFER' },
  ]

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12">
          {sent && <PopUp handleClick={handleClick} body={popUpMessage} />}
          <Formik
            initialValues={{
              partnerId: '',
              typeOfWork: typeOfWorkList[0].value,
              customTypeOfWork: '',
              assetSettlement: assetSettlementList[0].value,
              workingTimeAccounting: workingTimeAccountingList[0].value,
              numberOfEmployees: 0,
              overheadHour: 0,
              deliveryKm: 0,
              accountSerialNumber: '',
              description: '',
              usedMaterial: '',
              typeOfPayment: typeOfPaymentList[0].value,
              localDateTime: getCurrentDate(),
              workerSignature: '',
              proofOfEmployment: '',
              status: '',
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
                    container={typeOfWorkList}
                  />
                  {values.typeOfWork === TYPE_OF_WORK.OTHER && (
                    <Input name="customTypeOfWork" label="Egyéb" type="text" />
                  )}
                  <SelectInput
                    name="assetSettlement"
                    label="Eszközök elszámolás módja"
                    container={assetSettlementList}
                  />
                  <SelectInput
                    name="workingTimeAccounting"
                    label="Munkaidő elszámolás módja"
                    container={workingTimeAccountingList}
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
                    container={typeOfPaymentList}
                  />
                  <span>Kelt: {getCurrentDate()}</span>
                  <Input
                    name="workerSignature"
                    label="Munkát végezte"
                    placeholder="IDE KELL E-ALÁIRÁS"
                  />
                  <Input
                    name="proofOfEmployment"
                    label="munkavégzést igazolja"
                    placeholder="IDE KELL MÉG EGY E-ALÁÍRÁS"
                  />

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

export default CreateWorkSheetForm
