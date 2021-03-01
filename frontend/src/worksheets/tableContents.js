import { LOGO_STRING } from './LogoForPdf'
import { worksheet } from './workSheetPDF'

function createHeader(worksheet) {
  ///eleje
  return (
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
                text: `${worksheet.id}`,
                fontSize: 25,
              },
            ],
          ],
        ],
      },
    },
    function createDeails(worksheet) {
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
    },
    function createDescription(worksheet) {
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
  )

  function createMaterials(worksheet) {
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
}
export default {
  createHeader,
  createDeails,
  createDescription,
  createMaterials,
}
