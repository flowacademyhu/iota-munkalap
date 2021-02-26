import { useState, useEffect, useCallback } from 'react'
import { postUser, putUser, getUser } from '../api/UserAPI'
import { useParams, useHistory } from 'react-router-dom'
import { PATH_VARIABLES } from '../Const'

export default function useEmployeeData() {
  const [sent, setSent] = useState(false)
  const [sentSuccessfully, setSentSuccessfully] = useState(false)
  const [popUpMessage, setPopUpMessage] = useState('')
  const [userData, setUserData] = useState()
  const { id } = useParams()

  const history = useHistory()

  function handleClick() {
    sentSuccessfully && history.push(`/${PATH_VARIABLES.EMPLOYEE}`)
    setSent(false)
  }
  const updateUser = useCallback(
    async function () {
      if (id !== undefined) {
        try {
          const response = await getUser(id)
          setUserData({ ...response.data, loaded: true })
        } catch (error) {
          setUserData({ loaded: true })
          setPopUpMessage('A módosítás sikertelen')
          setSent(true)
        }
      }
    },
    [id]
  )

  useEffect(() => {
    updateUser()
  }, [updateUser])

  async function saveEmployee(values) {
    try {
      const response =
        id === undefined ? await postUser(values) : await putUser(id, values)
      if (response.status === 200) {
        setPopUpMessage('Munkavállaló sikeresen módosítva')
        setSentSuccessfully(true)
      }
      if (response.status === 201) {
        setPopUpMessage('Munkavállaló sikeresen létrehozva')
        setSentSuccessfully(true)
      }
    } catch (error) {
      setPopUpMessage('A művelet sikertelen')
    } finally {
      setSent(true)
    }
  }

  return {
    updateUser,
    saveEmployee,
    handleClick,
    popUpMessage,
    sent,
    userData,
  }
}
