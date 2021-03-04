import pdfMake from 'pdfmake/build/pdfmake'
import vfsFonts from 'pdfmake/build/vfs_fonts'

import {
  createHeader,
  createDetails,
  createDescription,
  createMaterials,
  createSignatureAndDate,
  createStyles,
} from './tableContents'

function workSheetPDF(worksheet, partners) {
  const { vfs } = vfsFonts.pdfMake
  pdfMake.vfs = vfs

  const doc = {
    content: [
      createHeader(worksheet, partners),
      createDetails(worksheet),
      createDescription(worksheet),
      createMaterials(worksheet),
      createSignatureAndDate(worksheet),
    ],
    style: createStyles(),
  }

  pdfMake.createPdf(doc).open()
}

export default workSheetPDF
