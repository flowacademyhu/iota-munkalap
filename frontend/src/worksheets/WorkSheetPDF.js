import React from 'react'
import logo from '../img/uj_logo.png'
import pdfMake from 'pdfmake/build/pdfmake'
import vfsFonts from 'pdfmake/build/vfs_fonts'
import {
  typeOfWork,
  status,
  assetSettlement,
  workingTimeAccounting,
  typeOfPayment,
} from '../TranslationForWorkSheet'
import moment from 'moment'

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
  //let workSheet = getWorkSheet(id)

  const { vfs } = vfsFonts.pdfMake
  pdfMake.vfs = vfs

  // partnerId: '',
  // typeOfWork: TYPE_OF_WORK_LIST[0].value,
  // customTypeOfWork: '',
  // assetSettlement: ASSET_SETTLEMENT_LIST[0].value,
  // workingTimeAccounting: WORKING_TIME_ACCOUNT_LIST[0].value,
  // numberOfEmployees: 0,
  // overheadHour: 0,
  // deliveryKm: 0,
  // accountSerialNumber: '',
  // description: '',
  // usedMaterial: '',
  // typeOfPayment: TYPE_OF_PAYMENT_LIST[0].value,
  // localDateTime: getCurrentDate(),
  // workerSignature: '',
  // proofOfEmployment: '',
  // status: '',

  console.log(worksheet)
  console.log(worksheet.description)

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
                // {
                //   image: '../img/uj_logo.png',
                //   width: 150,
                // },
              ],
              [
                {
                  text: 'Az ügyfél adatai \n',
                  bold: true,
                },
                {
                  text: `Partner ID:  ${worksheet.partnerId}`,
                },
              ],

              {
                text: `ID sorszám:  ${worksheet.partnerId}`,
              },
            ],
          ],
        },
      },

      {
        style: 'tableExample',
        table: {
          widths: ['*', '*', '*'],
          body: [
            [
              `Munkavégzés jellege: ${typeOfWork[worksheet.typeOfWork]}, ${
                typeOfWork[worksheet.typeOfWork] === 'Egyéb' &&
                'Egyéb: ' + worksheet.customTypeOfWork
              }`,
            ],
          ],
        },
      },

      {
        style: 'tableExample',
        table: {
          widths: ['*', '*'],
          body: [
            [
              `Az eszközök elszámolásának módja: ${
                assetSettlement[worksheet.assetSettlement]
              }`,
            ],
          ],
        },
      },

      {
        style: 'tableExample',
        table: {
          widths: ['*'],
          body: [['Az elvégzett munka leírása:'], [`${worksheet.description}`]],
        },
      },

      {
        style: 'tableExample',
        table: {
          widths: ['*'],
          body: [['Felhasznált anyagok:'], [`${worksheet.usedMaterial}`]],
        },
      },

      {
        style: 'tableExample',
        table: {
          widths: [90, '*', '*'],
          body: [
            [
              [
                { text: sentence1, fontSize: 8 },
                { text: sentence2, fontSize: 8, bold: true },
                { text: sentence3, fontSize: 8 },
              ],
              {
                table: {
                  widths: ['*', '*'],
                  body: [
                    [
                      'Fizetés módja',
                      `${typeOfPayment[worksheet.typeOfPayment]}`,
                    ],
                    [{ colSpan: 2, text: 'A munkát végezte: ' }],
                    [{ colSpan: 2, text: `${worksheet.workerSignature}` }],
                  ],
                },
              },
              {
                table: {
                  widths: ['*', ''],
                  body: [
                    [
                      {
                        //   text:
                        //     'Kelt: ' +
                        //     moment(worksheet.localDateTime).format('MM-DD-YYYY'),
                        // }`Kelt: ${worksheet.localDateTime}`,
                      },
                    ],
                    [{ colSpan: 2, text: 'A munkavégzést igazolja:' }],
                    [{ colSpan: 2, text: `${worksheet.proofOfEmployment}` }],
                  ],
                },
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
