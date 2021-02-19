import React, { useState, useEffect } from 'react'
import UpdateWorksheetForm from './UpdateWorkSheetForm'
import { getWorkSheets, putWorkSheet } from '../api/WorkSheetAPI'
import { useParams, useHistory } from 'react-router-dom'
import { PATH_VARIABLES } from '../Const'

function UpdateWorksheet() {
  const [sent, setSent] = useState(false)
  const [sentSuccessfully, setSentSuccessfully] = useState(false)
  const [popUpMessage, setPopUpMessage] = useState('')
  const { id } = useParams()
  const [worksheetData, setWorksheetData] = useState({})

  const history = useHistory()

  function handleClick() {
    sentSuccessfully && history.push(`/${PATH_VARIABLES.WORKSHEET}`)
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getWorkSheets(id)
        setWorksheetData({ ...response.data, loaded: true })
      } catch (error) {
        setWorksheetData({ loaded: true })
        setPopUpMessage('A módosítás sikertelen')
        setSent(true)
      }
    }
    fetchData()
  }, [id])

  async function putData(values) {
    try {
      const response = await putWorkSheet(id, values)
      if (response.status === 200) {
        setPopUpMessage('Munkalap sikeresen módosítva')
        setSentSuccessfully(true)
      }
    } catch (error) {
      setPopUpMessage('A módosítás sikertelen')
    } finally {
      setSent(true)
    }
  }

  return (
    <>
      {worksheetData.loaded && (
        <UpdateWorksheetForm
          handleClick={handleClick}
          sent={sent}
          popUpMessage={popUpMessage}
          sendData={putData}
          title="Adatok módosítása"
          worksheet={worksheetData}
        />
      )}
    </>
  )
}

export default UpdateWorksheet
