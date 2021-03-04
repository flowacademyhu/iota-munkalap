import React, { useRef, useEffect, useCallback } from 'react'
import SignaturePad from 'react-signature-pad-wrapper'
import { useField } from 'formik'

export default function Signature(props) {
  const signaturePadRef = useRef(null)
  const [field, , helpers] = useField(props)
  const { setValue } = helpers

  function clear() {
    signaturePadRef.current.clear()
    setValue(JSON.stringify([]))
  }

  const refreshSign = useCallback(
    async function () {
      signaturePadRef.current.fromData(JSON.parse(field.value))
    },
    [field.value]
  )
  useEffect(() => {
    refreshSign()
  }, [refreshSign])

  function onEnd() {
    const data = JSON.stringify(signaturePadRef.current.toData())
    setValue(data)
  }

  return (
    <>
      <div className="border border-secondary mb-1 signatureDiv">
        <SignaturePad
          ref={signaturePadRef}
          width={400}
          height={300}
          options={{
            minWidth: 1,
            maxWidth: 4,
            penColor: 'rgb(30, 30, 30)',
            onEnd,
          }}
        />
      </div>
      <span className="btn btn-success px-1 py-0 my-2" onClick={clear}>
        Törlés
      </span>
    </>
  )
}
