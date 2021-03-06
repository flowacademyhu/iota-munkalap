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

function createWorksheetPDF(worksheet, partnerData) {
  const { vfs } = vfsFonts.pdfMake
  pdfMake.vfs = vfs

  const doc = {
    content: [
      createHeader(worksheet, partnerData),
      createDetails(worksheet),
      createDescription(worksheet),
      createMaterials(worksheet),
      createSignatureAndDate(worksheet),
    ],
    style: createStyles(),
  }

  pdfMake.createPdf(doc).open()
}

export default createWorksheetPDF
