import useWorkSheets from './useWorkSheets'

function useWorkSheetsWithNumber() {
  const { workSheets } = useWorkSheets()
  const workSheetsWithNumber = []
  if (workSheets) {
    for (let i = 0; i < workSheets.length; i++) {
      workSheetsWithNumber.push({ listId: i + 1, givenData: workSheets[i] })
    }
  }
  return { workSheetsWithNumber }
}

export default useWorkSheetsWithNumber
