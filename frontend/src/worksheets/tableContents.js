import { LOGO_STRING } from './LogoForPdf'
import {
  typeOfWorkTranslation,
  assetSettlement,
  typeOfPayment,
} from './TranslationForWorkSheet'
import renderSvg from './renderSvg'

const acknowledge =
  'A munkavégzést igazoló aláírásával a fent megjelölt munka teljesítését elismeri, az üzemelő rendszert átveszi.'
const billable = 'A vállalkozó a számla benyújtására jogosult.'
const possession =
  'A számla kiegyenlítéséig a felszerelt eszközök a vállalkozó tulajdonában maradnak. A fizetés ellehetetlenülésekor az eszközök leszerelésre és elszállításra kerülnek.'

export const createHeader = function (worksheet) {
  let worksheetStatus =
    worksheet.worksheetStatus === 'CLOSED'
      ? 'Lezárt'
      : (worksheet.worksheetStatus =
          worksheet.worksheetStatus === 'REPORTED'
            ? 'Készre jelentett'
            : 'Létrehozott')

  return (
    {
      text: 'Munkalap',
      style: 'header',
      alignment: 'right',
    },
    {
      style: 'tableExample',
      table: {
        widths: ['*', '*', '*'],
        body: [
          [
            [
              {
                image: LOGO_STRING,
                width: 150,
                margin: [4, 13, 2, 8],
              },
            ],
            [
              {
                text: 'Az ügyfél adatai \n',
                bold: true,
                fontSize: 10,
              },
              {
                text: `Partner ID:`,
                bold: true,
                fontSize: 8,
              },
              {
                text: `${worksheet.partnerId}\n`,
                fontSize: 8,
              },
              {
                text: `Az Ügyfél számlázási neve:`,
                fontSize: 8,
                bold: true,
              },
              {
                text: `{partner.BillingName}\n`,
                fontSize: 8,
              },
              {
                text: `Az Ügyfél számlázási címe:`,
                fontSize: 8,
                bold: true,
              },
              {
                text: `{partner.BillingAddress}\n`,
                fontSize: 8,
              },
              {
                text: `Az Ügyfél elérhetősége:`,
                fontSize: 8,
                bold: true,
              },
              {
                text: `{partner.phone}\n`,
                fontSize: 8,
              },
            ],
            [
              {
                text: `Munkalap sorszám:\n`,
                fontSize: 15,
                bold: true,
              },
              {
                text: `${worksheet.id}\n\n`,
                fontSize: 25,
              },
              {
                text: `Munkalap státusza:\n`,
                fontSize: 15,
              },
              {
                text: `${worksheetStatus}`,
                fontSize: 25,
              },
            ],
          ],
        ],
      },
    }
  )
}

export const createDetails = function (worksheet) {
  return {
    style: 'tableExample',
    table: {
      widths: [130, 130, '*', '*', '*'],
      body: [
        [
          { text: `Munkavégzés jellege:`, bold: true },
          { text: `Az eszközök elszámolásának módja:`, bold: true },
          { text: `Létszám:`, bold: true },
          { text: `Rezsióra:`, bold: true },
          { text: `Kiszállás:`, bold: true },
        ],
        [
          {
            text: `${typeOfWorkTranslation[worksheet.typeOfWork]} ${
              typeOfWorkTranslation[worksheet.typeOfWork] === 'Egyéb'
                ? 'Egyéb: ' + worksheet.customTypeOfWork
                : ''
            }`,
          },
          `${assetSettlement[worksheet.assetSettlement]}`,
          `${worksheet.numberOfEmployees} fő`,
          `${worksheet.overheadHour} HUF`,
          `${worksheet.deliveryKm} Km`,
        ],
      ],
    },
  }
}

export const createDescription = function (worksheet) {
  return {
    style: 'tableExample',
    table: {
      widths: ['*'],
      body: [
        [
          {
            text: `Az elvégzett munka leírása:`,
            bold: true,
          },
        ],
        [`${worksheet.description}`],
      ],
    },
  }
}

export const createMaterials = function (worksheet) {
  return {
    style: 'tableExample',
    table: {
      widths: ['*'],
      body: [
        [{ text: 'Felhasznált anyagok:', bold: true }],
        [`${worksheet.usedMaterial}`],
      ],
    },
  }
}
export const createSignatureAndDate = function (worksheet) {
  const workerSignatureSvg = renderSvg(worksheet.workerSignature)
  const proofOfEmploymentSvg = renderSvg(worksheet.proofOfEmployment)

  return {
    style: 'tableExample',
    table: {
      widths: ['*', '*', '*'],
      body: [
        [
          {
            border: [true, true, true, false],
            text: acknowledge,
            fontSize: 10,
          },
          `Fizetés  módja: \n ${typeOfPayment[worksheet.typeOfPayment]}`,
          `Kelt: \n ${worksheet.createdAt}`,
        ],
        [
          {
            border: [true, false, true, false],
            text: billable,
            fontSize: 10,
            bold: true,
          },
          'Munkát végezte:',
          'A munkavégzést igazolja:',
        ],
        [
          {
            border: [true, false, true, true],
            text: possession,
            fontSize: 10,
          },
          {
            svg: workerSignatureSvg,
            fit: [80, 60],
          },
          {
            fit: [80, 60],
            svg: proofOfEmploymentSvg,
          },
        ],
      ],
    },
  }
}

export const createStyles = function () {
  return {
    header: {
      fontSize: 18,
      bold: true,
      margin: [0, 0, 0, 10],
    },
    subheader: {
      fontSize: 16,
      bold: true,
      margin: [0, 10, 0, 5],
    },
    tableExample: {
      margin: [0, 5, 0, 15],
    },
    tableHeader: {
      bold: true,
      fontSize: 13,
      color: 'black',
    },
  }
}
