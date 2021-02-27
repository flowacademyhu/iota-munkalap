import React, { useRef, useEffect } from 'react'
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
      <div className="border border-secondary">
        <SignaturePad
          id={props.name}
          ref={signaturePadRef}
          options={{
            minWidth: 1,
            maxWidth: 4,
            penColor: 'rgb(30, 30, 30)',
            onEnd,
          }}
        />
      </div>
      <span className="btn btn-success mt-1" onClick={clear}>
        Törlés
      </span>
    </>
  )
}
