import { useState, useEffect, useCallback } from 'react'
import { createEmployee, updateEmployee, getEmployee } from '../api/EmployeeAPI'
import { useParams, useHistory } from 'react-router-dom'
import { PATH_VARIABLES } from '../Const'

export default function useEmployeeData() {
  const [sent, setSent] = useState(false)
  const [sentSuccessfully, setSentSuccessfully] = useState(false)
  const [popUpMessage, setPopUpMessage] = useState('')
  const [employeeData, setEmployeeData] = useState()
  const { id } = useParams()

  const history = useHistory()

  function handleClick() {
    sentSuccessfully && history.push(`/${PATH_VARIABLES.EMPLOYEE}`)
    setSent(false)
  }
  const employeeUpdater = useCallback(
    async function () {
      if (id !== undefined) {
        try {
          const response = await getEmployee(id)
          setEmployeeData({ ...response, loaded: true })
        } catch (error) {
          setEmployeeData({ loaded: true })
          setPopUpMessage('A módosítás sikertelen')
          setSent(true)
        }
      }
    },
    [id]
  )

  useEffect(() => {
    employeeUpdater()
  }, [employeeUpdater])

  async function saveEmployee(values) {
    try {
      const response =
        id === undefined
          ? await createEmployee(values)
          : await updateEmployee(id, values)
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
    employeeUpdater,
    saveEmployee,
    handleClick,
    popUpMessage,
    sent,
    employeeData,
  }
}
