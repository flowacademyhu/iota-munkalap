import pdfMake from 'pdfmake/build/pdfmake'
import vfsFonts from 'pdfmake/build/vfs_fonts'
import {
  typeOfWorkTranslation,
  assetSettlement,
  typeOfPayment,
} from './TranslationForWorkSheet'
import renderSvg from './renderSvg'
import { createHeader, createDetails, createDescription } from './tableContents'

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
      createHeader(worksheet),
      //2nd table (details)
      createDetails(worksheet),
      //3rd table (description)
      createDescription(worksheet),
      //4th table (materials)

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
    defaultStyle: {},
  }

  pdfMake.createPdf(doc).open()
}

export default workSheetPDF
