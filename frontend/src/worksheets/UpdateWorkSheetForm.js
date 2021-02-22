import React from 'react'
import { Formik, Form } from 'formik'
import * as yup from 'yup'
import { Link } from 'react-router-dom'
import Input from '../Input'
import Button from '../Button'
import PopUp from '../PopUp'
import SelectInput from '../SelectInput'
import { TYPE_OF_WORK } from '../Const'
import {
  TYPE_OF_WORK_LIST,
  ASSET_SETTLEMENT_LIST,
} from './WorksheetDropdownOptions'

const schema = yup.object().shape({
  description: yup.string().required('A leírás kötelező!'),
  usedMaterial: yup.string().required('A felhasznált anyag kötelező!'),
})

function UpdateWorkSheetForm({
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
              partner: worksheet.partner || '',
              typeOfWork: worksheet.typeOfWork || TYPE_OF_WORK_LIST[0].value,
              assetSettlement:
                worksheet.assetSettlement || ASSET_SETTLEMENT_LIST[0].value,
              description: worksheet.description || '',
              usedMaterial: worksheet.usedMaterial || '',
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
                  <Input name="description" label="Leírás" type="text" />
                  <Input
                    name="usedMaterial"
                    label="Felhasznált anyagom"
                    type="text"
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

export default UpdateWorkSheetForm
