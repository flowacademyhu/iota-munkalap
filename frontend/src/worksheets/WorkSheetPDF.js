import { LOGO_STRING } from './LogoForPdf'
import pdfMake from 'pdfmake/build/pdfmake'
import vfsFonts from 'pdfmake/build/vfs_fonts'
import {
  typeOfWork,
  assetSettlement,
  typeOfPayment,
} from '../TranslationForWorkSheet'
import SignaturePad from 'signature_pad'

function renderSvg(param) {
  const canvasSignature = document.createElement('canvas')
  canvasSignature.width = 400
  canvasSignature.height = 300
  const signaturePad = new SignaturePad(canvasSignature)
  signaturePad.fromData(JSON.parse(param))
  const svgSignature = signaturePad.toDataURL('image/svg+xml')
  const data = svgSignature.split(',')[1]
  return atob(data)
}

const acknowledge =
  'A munkavégzést igazoló aláírásával a fent megjelölt munka teljesítését elismeri, az üzemelő rendszert átveszi.'
const billable = 'A vállalkozó a számla benyújtására jogosult.'
const possession =
  'A számla kiegyenlítéséig a felszerelt eszközök a vállalkozó tulajdonában maradnak. A fizetés ellehetetlenülésekor az eszközök leszerelésre és elszállításra kerülnek.'

function workSheetPDF(worksheet) {
  const workerSignatureSvg = renderSvg(worksheet.workerSignature)
  const proofOfEmploymentSvg = renderSvg(worksheet.proofOfEmployment)

  const { vfs } = vfsFonts.pdfMake
  pdfMake.vfs = vfs

  var doc = {
    content: [
      {
        text: 'Munkalap',
        style: 'header',
        alignment: 'right',
      },
      //1st table (header)
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

      //2nd table
      {
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
                text: `${typeOfWork[worksheet.typeOfWork]} ${
                  typeOfWork[worksheet.typeOfWork] === 'Egyéb'
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
      },
      //3rd table (description)
      {
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
      },
      //4th table (materials)
      {
        style: 'tableExample',
        table: {
          widths: ['*'],
          body: [
            [{ text: 'Felhasznált anyagok:', bold: true }],
            [`${worksheet.usedMaterial}`],
          ],
        },
      },

      //5. table (sigatures, date)
      {
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
                colSpan: 2,
                svg: workerSignatureSvg,
                fit: [100, 100],
              },
              {
                colSpan: 2,
                fit: [100, 100],
                svg: proofOfEmploymentSvg,
              },
            ],
          ],
        },
      },
    ],

    styles: {
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
    },
    defaultStyle: {
      // alignment: 'justify'
    },
  }

  pdfMake.createPdf(doc).open()
  //pdfMake.createPdf({ content: 'Hi. I am a PDF.' }).open()
}

export default workSheetPDF
