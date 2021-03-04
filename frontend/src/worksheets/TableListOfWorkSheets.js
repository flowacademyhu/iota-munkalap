import React from 'react'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import useWorkSheets from '../hooks/useWorkSheets'
import {
  typeOfWorkTranslation,
  statusTranslation,
} from './TranslationForWorkSheet'
import { closeWorkSheet, finalizeWorkSheet } from '../api/WorkSheetAPI'
import LoadingScreen from '../LoadingScreen'
import workSheetPDF from './workSheetPDF'
import WorksheetListHeader from './WorksheetListHeader'
import WorkSheetOperationButtons from './WorkSheetOperationButtons'
import { getPartner } from '../api/PartnerAPI'

export default function TableListOfWorkSheets() {
  const {
    workSheets,
    updateWorkSheets,
    startDate,
    endDate,
    setStartDate: onStartDate,
    setEndDate: onEndDate,
    status,
    setStatus: onStatus,
  } = useWorkSheets()

  async function handlePrint(worksheet) {
    const partnerData = await getPartner(worksheet.partnerId)
    workSheetPDF(worksheet, partnerData.data)
  }

  async function closeAndReload(id) {
    await closeWorkSheet(id)
    updateWorkSheets()
  }

  async function finalizeAndReload(id) {
    await finalizeWorkSheet(id)
    updateWorkSheets()
  }

  return (
    <>
      <WorksheetListHeader
        startDate={startDate}
        onStartDate={onStartDate}
        endDate={endDate}
        onEndDate={onEndDate}
        status={status}
        onStatus={onStatus}
      />
      <div className="border border-secondary">
        <div className="container-fluid">
          <Table className="table table-hover table-striped text-center">
            <Thead>
              <Tr>
                <Th scope="col">#</Th>
                <Th scope="col">Létrehozó munkatárs</Th>
                <Th scope="col">Felvétel időpontja</Th>
                <Th scope="col">Partner neve</Th>
                <Th scope="col">Munkavégzés jellege</Th>
                <Th scope="col">Állapot</Th>
                <Th scope="col">Műveletek</Th>
              </Tr>
            </Thead>
            <Tbody>
              {workSheets ? (
                workSheets.map((worksheet, index) => (
                  <Tr key={index}>
                    <Th scope="row">{worksheet.id}</Th>
                    <Td>{worksheet.createdBy}</Td>
                    <Td>{worksheet.createdAt}</Td>
                    <Td>{worksheet.partnerName}</Td>
                    <Td>{typeOfWorkTranslation[worksheet.typeOfWork]}</Td>
                    <Td>{statusTranslation[worksheet.worksheetStatus]}</Td>
                    <Td>
                      <WorkSheetOperationButtons
                        status={worksheet.worksheetStatus}
                        id={worksheet.id}
                        onFinalize={() => finalizeAndReload(worksheet.id)}
                        onClose={() => closeAndReload(worksheet.id)}
                        onPrint={() => handlePrint(worksheet)}
                      />
                    </Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan="7">
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
