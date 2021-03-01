import React from 'react'
import LoadingScreen from '../LoadingScreen'
import { Link } from 'react-router-dom'
import Button from '../Button'
import Address from './Address'
import EditButton from '../specialButtons/EditButton'
import InactivateButton from '../specialButtons/InactivateButton'
import ActivateButton from '../specialButtons/ActivateButton'
import usePartners from '../hooks/usePartners'
import { inactivatePartner, activatePartner } from '../api/PartnerAPI'

export default function TableListofPartners() {
  const { partners, updatePartners } = usePartners()

  async function inactivateAndReload(id) {
    await inactivatePartner(id)
    updatePartners()
  }

  async function activateAndReload(id) {
    await activatePartner(id)
    updatePartners()
  }

  return (
    <>
      <div className="d-flex justify-content-between p-1">
        <Link to={`/partners/new`}>
          <Button text="Új partner létrehozása" moreClassName="w-auto p-1" />
        </Link>
      </div>
      <div className="border border-secondary">
        <div className="container-fluid align-items-center">
          <table className="table table-hover text-center">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Név</th>
                <th scope="col">Cím</th>
                <th scope="col">Adószám</th>
                <th scope="col">Módosítás</th>
              </tr>
            </thead>
            <tbody>
              {partners ? (
                partners.map((partner, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{partner.nev}</td>
                    <Address partner={partner} />
                    <td>{partner.adoszam}</td>
                    <td>
                      <Link to={`/partners/update/${partner.id}`}>
                        <EditButton />
                      </Link>
                    </td>
                    <td>
                      {partner.enabled ? (
                        <InactivateButton
                          onClick={() => inactivateAndReload(partner)}
                        />
                      ) : (
                        <ActivateButton
                          onClick={() => activateAndReload(partner)}
                        />
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">
                    <LoadingScreen />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
