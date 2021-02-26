import React from 'react'
import LoadingScreen from '../LoadingScreen'
import usePartners from '../hooks/usePartners'
import Address from './Address'

export default function TableListofPartners() {
  const partners = [
    {
      nev: 'bela',
      adoszam: 123 - 456 - 78,
      szamlazasiCimIranyitoszam: 1234,
      szamlazasiCimTelepulesNev: 'szeged',
      szamlazasiCimKozteruletNev: 'utca',
      szamlazasiCimKozteruletJellegNev: 'utca',
      szamlazasiCimHazszam: 12,
      szamlazasiCimEpulet: 'A',
    },
  ]

  return (
    <>
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
                    <Address />
                    <td>{partner.adoszam}</td>
                    <td></td>
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
