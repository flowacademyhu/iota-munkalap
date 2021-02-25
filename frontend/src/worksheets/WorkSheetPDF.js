import logo from '../img/pdf_logo.png'
import pdfMake from 'pdfmake/build/pdfmake'
import vfsFonts from 'pdfmake/build/vfs_fonts'
import {
  typeOfWork,
  status,
  assetSettlement,
  workingTimeAccounting,
  typeOfPayment,
} from '../TranslationForWorkSheet'
import SignaturePad from 'signature_pad'
import imageToBase64 from 'image-to-base64'

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

let logoBase64 =
  'data:image/png;base64,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'
const acknowledge =
  'A munkavégzést igazoló aláírásával a fent megjelölt munka teljesítését elismeri, az üzemelő rendszert átveszi.'
const billable = 'A vállalkozó a számla benyújtására jogosult.'
const possession =
  'A számla kiegyenlítéséig a felszerelt eszközök a vállalkozó tulajdonában maradnak. A fizetés ellehetetlenülésekor az eszközök leszerelésre és elszállításra kerülnek.'

function WorkSheetPDF(worksheet) {
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
                  image: logoBase64,
                  width: 150,
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
                  text: `ML-00001`,
                  fontSize: 25,
                },
              ],
            ],
          ],
        },
      },

      //2nd table 
      {
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

export default WorkSheetPDF
