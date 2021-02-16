import React from 'react';

const worksheets = [
  { id: '1', creater: 'employee1', date: '2020.12.01.', partner: 'partner1', type: 'type1', state: 'state1' },
  { id: '2', creater: 'employee2', date: '2020.08.11.', partner: 'partner2', type: 'type2', state: 'state2' },
  { id: '3', creater: 'employee3', date: '2000.12.01.', partner: 'partner3', type: 'type3', state: 'state3' },
  { id: '4', creater: 'employee4', date: '2010.08.11.', partner: 'partner4', type: 'type4', state: 'state4' }

];

export default function TableListOfWorkSheets() {
  return (
    <>
      <div className="border border-secondary">
        <div className="container-fluid">
          <table className="table table-hover text-center">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Létrehozó munkatárs</th>
                <th scope="col">Felvétel időpontja</th>
                <th scope="col">Partner neve</th>
                <th scope="col">Munkavégzés jellege</th>
                <th scope="col">Állapot</th>
              </tr>
            </thead>

            <tbody>
              {worksheets ? (
                worksheets.map(worksheet => (
                  <tr key={worksheet.id}>
                    <th scope="row">{worksheet.id}</th>
                    <td>{worksheet.creater}</td>
                    <td>{worksheet.date}</td>
                    <td>{worksheet.partner}</td>
                    <td>{worksheet.type}</td>
                    <td>{worksheet.state}</td>
                  </tr>
                )))
                :
                <tr>
                  <td>Loading...</td>
                </tr>
              }
            </tbody>

          </table>
        </div>
      </div>
    </>
  );
};
