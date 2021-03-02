import { useState, useEffect, useCallback } from 'react'
import { createPartner, updatePartner, getPartner } from '../api/PartnerAPI'
import { useParams, useHistory } from 'react-router-dom'
import { PATH_VARIABLES } from '../Const'

export default function usePartnerData() {
  const [sent, setSent] = useState(false)
  const [sentSuccessfully, setSentSuccessfully] = useState(false)
  const [popUpMessage, setPopUpMessage] = useState('')
  const [partnerData, setPartnerData] = useState()
  const { id } = useParams()

  const history = useHistory()

  function handleClick() {
    sentSuccessfully && history.push(`/${PATH_VARIABLES.PARTNER}`)
    setSent(false)
  }

  const refreshPartner = useCallback(
    async function () {
      if (id !== undefined) {
        try {
          const response = await getPartner(id)
          setPartnerData({ ...response.data, loaded: true })
        } catch (error) {
          setPartnerData({ loaded: true })
          setPopUpMessage('A lekérés sikertelen')
          setSent(true)
        }
      }
    },
    [id]
  )

  useEffect(() => {
    refreshPartner()
  }, [refreshPartner])

  async function savePartner(values) {
    try {
      const response =
        id !== undefined
          ? await updatePartner(id, values)
          : await createPartner(values)
      if (response.status === 200) {
        setPopUpMessage('Partner sikeresen módosítva')
        setSentSuccessfully(true)
      }
      if (response.status === 201) {
        setPopUpMessage('Partner sikeresen létrehozva')
        setSentSuccessfully(true)
      }
    } catch (error) {
      setPopUpMessage('A művelet sikertelen')
    } finally {
      setSent(true)
    }
  }

  return {
    refreshPartner,
    savePartner,
    handleClick,
    popUpMessage,
    sent,
    partnerData,
  }
}
