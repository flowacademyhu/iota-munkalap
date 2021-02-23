import React, { useRef, useEffect } from 'react'
import SignaturePad from 'react-signature-pad-wrapper'
import { useField } from 'formik'

export default function Signature(props) {
  const signaturePadRef = useRef(null)

  const [field, helpers] = useField(props)
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
  }, [field.value, setValue])

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
      <span
        className="border rounded p-1 bg-success text-white"
        onClick={clear}
      >
        Clear
      </span>
    </>
  )
}
