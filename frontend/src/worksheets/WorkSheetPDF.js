import React from 'react'
import { logo } from '../img/uj_logo.png'
import {
  PDFDocument,
  PDFText,
  PDFTable,
  PDFTableRow,
  PDFTableColumn,
  PDFColumns,
  PDFColumn,
} from 'react-pdfmake'

function WorkSheetPDF() {
  var workSheet = {
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
                image: 'sampleImage.jpg',
                width: 150,
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

      {
        style: 'tableExample',
        table: {
          widths: [90, '*', '*'],
          body: [
            [
              'A munkavégzésr igazoló lorem ipsum cdvndosv  jvnpwo vwnv pwe vvh wpev eivpenpweNP  E PWEf vnwvv  I VWi vwvwieuvn',
              {
                table: {
                  widths: ['*', '*'],
                  body: [
                    ['Fizetés módja', '{importFizmod}'],
                    [{ colSpan: 2, text: 'A munkát végezte:' }],
                    [{ colSpan: 2, text: 'importAlairas\nide' }],
                  ],
                },
              },
              {
                table: {
                  widths: ['*', ''],
                  body: [
                    ['Kelt: {importKeltezes}'],
                    [{ colSpan: 2, text: 'A munkavégzést igazolja:' }],
                    [{ colSpan: 2, text: '{importAlairas}\nide' }],
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
    }}

    pdfMake.createPdf(workSheet).open();
  }

  return <>a</>
}

export default WorkSheetPDF
