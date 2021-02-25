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

const sentence1 =
  'A munkavégzést igazoló aláírásával a fent megjelölt munka teljesítését elismeri, az üzemelő rendszert átveszi.'
const sentence2 = 'A vállalkozó a számla benyújtására jogosult.'
const sentence3 =
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

      {
        style: 'tableExample',
        table: {
          widths: ['*', '*', '*'],
          body: [
            [
              [
                {
                  //  ITT A LOGO
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

      //2. táblázat
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
      //3. táblázat
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
      //4. táblázat
      {
        table: {
          widths: ['*'],
          body: [
            [{ text: 'Felhasznált anyagok:', bold: true }],
            [`${worksheet.usedMaterial}`],
          ],
        },
      },

      //5.táblázat
      {
        table: {
          widths: ['*', '*', '*'],
          body: [
            [
              {
                border: [true, true, true, false],
                text: sentence1,
                fontSize: 8,
              },
              'Fizetés  módja',
              'Kelt:',
            ],
            [
              {
                border: [true, false, true, false],
                text: sentence2,
                fontSize: 8,
                bold: true,
              },
              'Munkát végezte',
              'A munkavégzést igazolja:',
            ],
            [
              {
                border: [true, false, true, true],
                text: sentence3,
                fontSize: 8,
              },
              'Aláírás',
              'Aláírás',
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
