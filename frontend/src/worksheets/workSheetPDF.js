import pdfMake from 'pdfmake/build/pdfmake'
import vfsFonts from 'pdfmake/build/vfs_fonts'
import {
  typeOfWorkTranslation,
  assetSettlement,
  typeOfPayment,
} from './TranslationForWorkSheet'
import renderSvg from './renderSvg'
import {
  createHeader,
  createDetails,
  createDescription,
  createMaterials,
  createSignatureAndDate,
  createSignatureAndDate,
} from './tableContents'

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
      createHeader(worksheet),
      createDetails(worksheet),
      createDescription(worksheet),
      createMaterials(worksheet),
      createSignatureAndDate(worksheet),
      ],
      createStyles()
  }

  pdfMake.createPdf(doc).open()
}

export default workSheetPDF
