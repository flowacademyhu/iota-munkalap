import React from 'react'
import { Link } from 'react-router-dom'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import LoadingScreen from '../LoadingScreen'
import usePartners from '../hooks/usePartners'
import Button from '../Button'
import Address from './Address'
import EditButton from '../specialButtons/EditButton'
import InactivateButton from '../specialButtons/InactivateButton'
import ActivateButton from '../specialButtons/ActivateButton'

export default function TableListofPartners() {
  const { partners, activate, inactivate } = usePartners()

  return (
    <>
      <div className="d-flex justify-content-center my-3">
        <Link to={`/partners/new`}>
          <Button text="Új partner létrehozása" moreClassName="w-auto p-1" />
        </Link>
      </div>
      <div className="border border-secondary">
        <div className="container-fluid align-items-center">
          <Table className="table table-hover table-striped text-center">
            <Thead>
              <Tr>
                <Th scope="col">#</Th>
                <Th scope="col">Név</Th>
                <Th scope="col">Cím</Th>
                <Th scope="col">Adószám</Th>
                <Th scope="col">Állapot</Th>
                <Th scope="col">Módosítás</Th>
              </Tr>
            </Thead>
            <Tbody>
              {partners ? (
                partners.map((partner, index) => (
                  <Tr key={index}>
                    <Th scope="row">{index + 1}</Th>
                    <Td>{partner.nev}</Td>
                    <Td>
                      <Address partner={partner} />
                    </Td>
                    <Td>{partner.adoszam}</Td>
                    <Td>{partner.enabled ? 'Aktív' : 'Inaktív'}</Td>
                    <Td>
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
                    </Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan="5">
                    <LoadingScreen />
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </div>
      </div>
    </>
  )
}
