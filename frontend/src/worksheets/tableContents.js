function createHeader() {
  ///eleje
  content: [
    {
      text: 'Munkalap',
      style: 'header',
      alignment: 'right',
    },
    ///eleje
    //tartalom///
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
    //tartalom///
    ///vége
  ],
    {
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
  //vége
}

export default { createHeader }
