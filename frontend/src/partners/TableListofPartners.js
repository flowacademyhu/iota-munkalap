import React from 'react'
import LoadingScreen from '../LoadingScreen'
import { Link } from 'react-router-dom'
import Button from '../Button'
import Address from './Address'
import EditButton from '../specialButtons/EditButton'
import InactivateButton from '../specialButtons/InactivateButton'
import ActivateButton from '../specialButtons/ActivateButton'
import usePartners from '../hooks/usePartners'

export default function TableListofPartners() {
  const { partners, activate, inactivate } = usePartners()

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
                      <Link to={`/partners/update/${partner.partnerId}`}>
                        <EditButton />
                      </Link>
                      {partner.enabled ? (
                        <InactivateButton
                          onClick={() => inactivate(partner.partnerId)}
                        />
                      ) : (
                        <ActivateButton
                          onClick={() => activate(partner.partnerId)}
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
