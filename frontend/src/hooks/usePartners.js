import { useState, useEffect, useCallback } from 'react'
import {
  getPartners,
  activatePartner,
  inactivatePartner,
} from '../api/PartnerAPI'

export default function usePartners() {
  const [partners, setPartners] = useState()

  const updatePartners = useCallback(async function () {
    const { data } = await getPartners()
    if (data) {
      setPartners(data)
    }
  }, [])

  async function inactivate(id) {
    await inactivatePartner(id)
    updatePartners()
  }

  async function activate(id) {
    await activatePartner(id)
    updatePartners()
  }

  useEffect(() => {
    updatePartners()
  }, [updatePartners])

  return {
    partners,
    updatePartners,
    activate,
    inactivate,
  }
}
