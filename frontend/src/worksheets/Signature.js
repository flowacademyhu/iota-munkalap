import React, { useRef, useEffect } from 'react'
import SignaturePad from 'react-signature-pad-wrapper'
import { useField } from 'formik'

export default function Signature(props) {
  const signaturePadRef = useRef(null)

  const [field, meta, helpers] = useField(props)
  const { setValue } = helpers
  function clear() {
    signaturePadRef.current.clear()
  }

  useEffect(() => {
    try {
      signaturePadRef.current.fromData(JSON.parse(field.value))
    } catch {
      setValue(JSON.stringify([]))
    }
  }, [field.value])

  function onEnd() {
    const data = JSON.stringify(signaturePadRef.current.toData())
    setValue(data)
  }

  return (
    <>
      <SignaturePad
        id={props.name}
        ref={(ref) => (signaturePadRef.current = ref)}
        options={{
          minWidth: 1,
          maxWidth: 4,
          penColor: 'rgb(30, 30, 30)',
          onEnd,
        }}
      />
      <button onClick={() => clear()}>Clear</button>
      <button></button>
    </>
  )
}
