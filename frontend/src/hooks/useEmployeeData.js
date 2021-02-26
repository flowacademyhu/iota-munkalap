import { useState, useEffect, useCallback } from 'react'
import { postEmployee, putEmployee, getEmployee } from '../api/EmployeeAPI'
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
  const updateEmployee = useCallback(
    async function () {
      if (id !== undefined) {
        try {
          const response = await getEmployee(id)
          setEmployeeData({ ...response.data, loaded: true })
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
    updateEmployee()
  }, [updateEmployee])

  async function saveEmployee(values) {
    try {
      const response =
        id === undefined
          ? await postEmployee(values)
          : await putEmployee(id, values)
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
    updateEmployee,
    saveEmployee,
    handleClick,
    popUpMessage,
    sent,
    employeeData,
  }
}
