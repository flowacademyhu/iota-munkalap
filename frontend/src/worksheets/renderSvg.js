import SignaturePad from 'signature_pad'

function renderSvg(signatureData) {
  const canvasSignature = document.createElement('canvas')
  canvasSignature.width = 400
  canvasSignature.height = 300
  const signaturePad = new SignaturePad(canvasSignature)
  signaturePad.fromData(JSON.parse(signatureData))
  const svgSignature = signaturePad.toDataURL('image/svg+xml')
  const data = svgSignature.split(',')[1]
  return atob(data)
}

export default renderSvg
