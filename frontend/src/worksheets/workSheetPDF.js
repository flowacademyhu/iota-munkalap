import pdfMake from 'pdfmake/build/pdfmake'
import vfsFonts from 'pdfmake/build/vfs_fonts'
import { getPartner } from '../api/PartnerAPI'
import usePartnerData from '../hooks/usePartnerData'

import {
  createHeader,
  createDetails,
  createDescription,
  createMaterials,
  createSignatureAndDate,
  createStyles,
} from './tableContents'

function workSheetPDF(worksheet, partnerData) {
  const { vfs } = vfsFonts.pdfMake
  pdfMake.vfs = vfs

  //const { partnerData } = usePartnerData()

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

export default workSheetPDF
