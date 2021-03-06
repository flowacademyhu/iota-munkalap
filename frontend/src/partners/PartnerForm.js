import React from 'react'
import { Formik, Form } from 'formik'
import { Link } from 'react-router-dom'
import Input from '../Input'
import Button from '../Button'
import PopUp from '../PopUp'
import schema from './ValidationPartner'
import { TYPE_OF_CUSTOMER } from './PartnerRadioButtonOptions'
import RadioInputGroup from '../RadioInputGroup'

export default function PartnerForm({
  sent,
  handleClick,
  popUpMessage,
  sendData,
  title,
  partner,
}) {
  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12">
          {sent && <PopUp handleClick={handleClick} body={popUpMessage} />}
          <Formik
            initialValues={{
              partnerEmail: '',
              telefon: '',
              megrendeloTipusa: '',
              nev: '',
              rovidNev: '',
              adoszam: '',
              kadoszamtipus: '',
              bankszamlaszam: '',
              szamlazasiCimOrszagKod: '',
              szamlazasiCimOrszagNev: '',
              szamlazasiCimMegyeNev: '',
              szamlazasiCimIranyitoszam: '',
              szamlazasiCimTelepulesNev: '',
              szamlazasiCimKerulet: '',
              szamlazasiCimKozteruletNev: '',
              szamlazasiCimKozteruletJellegNev: '',
              szamlazasiCimHazszam: '',
              szamlazasiCimEpulet: '',
              szamlazasiCimLepcsohaz: '',
              szamlazasiCimSzint: '',
              szamlazasiCimAjto: '',
              szamlazasiCimHrsz: '',
              ...partner,
            }}
            validationSchema={schema}
            onSubmit={(values) => {
              const calculatedData =
                values.megrendeloTipusa === 'PRIVATE'
                  ? { ...values, adoszam: '', kadoszamtipus: '' }
                  : values
              sendData(calculatedData)
            }}
          >
            {({ values }) => {
              return (
                <Form>
                  <h1 className="text-center">{title}</h1>
                  <Input name="partnerEmail" label="Email cím" type="text" />
                  <Input name="telefon" label="Telefonszám" type="text" />
                  <RadioInputGroup
                    name="megrendeloTipusa"
                    label="Megrendelő típusa:"
                    options={TYPE_OF_CUSTOMER}
                  />
                  <Input name="nev" label="Név" type="text" />
                  <Input name="rovidNev" label="Rövid név" type="text" />
                  {values.megrendeloTipusa === 'LEGAL' && (
                    <>
                      <Input name="adoszam" label="Adószám" type="text" />
                      <Input
                        name="kadoszamtipus"
                        label="ÁFA-kód"
                        type="number"
                      />
                    </>
                  )}

                  <Input
                    name="bankszamlaszam"
                    label="Bankszámla szám"
                    type="text"
                  />
                  <Input
                    name="szamlazasiCimOrszagKod"
                    label="Országkód"
                    type="text"
                  />
                  <Input
                    name="szamlazasiCimOrszagNev"
                    label="Országnév"
                    type="text"
                  />
                  <Input
                    name="szamlazasiCimMegyeNev"
                    label="Megye"
                    type="text"
                  />
                  <Input
                    name="szamlazasiCimIranyitoszam"
                    label="Irányítószám"
                    type="text"
                  />
                  <Input
                    name="szamlazasiCimTelepulesNev"
                    label="Település"
                    type="text"
                  />
                  <Input
                    name="szamlazasiCimKerulet"
                    label="Kerület"
                    type="text"
                  />
                  <Input
                    name="szamlazasiCimKozteruletNev"
                    label="Közterület neve"
                    type="text"
                  />
                  <Input
                    name="szamlazasiCimKozteruletJellegNev"
                    label="Közterület jellege"
                    type="text"
                  />
                  <Input
                    name="szamlazasiCimHazszam"
                    label="Házszám"
                    type="text"
                  />
                  <Input
                    name="szamlazasiCimEpulet"
                    label="Épület"
                    type="text"
                  />
                  <Input
                    name="szamlazasiCimLepcsohaz"
                    label="Lépcsőház"
                    type="text"
                  />
                  <Input name="szamlazasiCimSzint" label="Szint" type="text" />
                  <Input name="szamlazasiCimAjto" label="Ajtó" type="text" />
                  <Input
                    name="szamlazasiCimHrsz"
                    label="Helyrajzi szám"
                    type="text"
                  />
                  <div className="buttons">
                    <Link to="/partners">
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
