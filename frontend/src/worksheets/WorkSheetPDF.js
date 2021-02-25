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

const sentence1 =
  'A munkavégzést igazoló aláírásával a fent megjelölt munka teljesítését elismeri, az üzemelő rendszert átveszi.'
const sentence2 = 'A vállalkozó a számla benyújtására jogosult.'
const sentence3 =
  'A számla kiegyenlítéséig a felszerelt eszközök a vállalkozó tulajdonában maradnak. A fizetés ellehetetlenülésekor az eszközök leszerelésre és elszállításra kerülnek.'
const sentenceSum = (
  <p>
    <p>{sentence1}</p>
    <p>
      <b>{sentence2}</b>
    </p>
    <p>{sentence3}</p>
  </p>
)

function WorkSheetPDF(worksheet) {
  const { vfs } = vfsFonts.pdfMake
  pdfMake.vfs = vfs
  const workerSignatureSvg = renderSvg(worksheet.workerSignature)
  const proofOfEmploymentSvg = renderSvg(worksheet.proofOfEmployment)

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
              {
                //image: 'sampleImage.jpg',
                //width: 150,
              },
              'Az ügyfél adatai \n köv sor\n {importAdatok}',
              'ID sorszám \n {importID}',
            ],
          ],
        },
      },

      {
        style: 'tableExample',
        table: {
          widths: ['*', '*', '*'],
          body: [['Munkavégzés jellege:', '{importJelleg}', 'Egyéb:']],
        },
      },

      {
        style: 'tableExample',
        table: {
          widths: ['*', '*'],
          body: [['Az eszközök elszámolásának módja:', '{importElszmod}']],
        },
      },

      {
        style: 'tableExample',
        table: {
          widths: ['*'],
          body: [['Az elvégzett munka leírása:'], ['{importLeiras}']],
        },
      },

      {
        style: 'tableExample',
        table: {
          widths: ['*'],
          body: [['Felhasznált anyagok:'], ['{importAnyagok}']],
        },
      },

      //NEW TABLE
      {
        style: 'tableExample',
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
