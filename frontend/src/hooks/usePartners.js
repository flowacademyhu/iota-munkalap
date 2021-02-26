import { useState, useEffect, useCallback } from 'react'
import { getPartners } from '../api/PartnerAPI'

export default function usePartners() {
  const [partners, setPartners] = useState()

  const updatePartners = useCallback(async function () {
    const { data } = await getPartners()
    if (data) {
      setPartners(data)
    }
  }, [])

  useEffect(() => {
    updatePartners()
  }, [updatePartners])

  return {
    partners,
    updatePartners,
  }
}
