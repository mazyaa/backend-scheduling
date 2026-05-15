import ExcelJS from 'exceljs';

export async function parseExcelToObjects(buffer: Buffer): Promise<Array<{ row: Record<string, any>, rowNumber: number }>> {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(buffer as any);
  
  const worksheet = workbook.worksheets[0];
  if (!worksheet) {
    throw new Error('No worksheet found in the Excel file');
  }

  const result: Array<{ row: Record<string, any>, rowNumber: number }> = [];
  let headers: string[] = [];

  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) {
      row.eachCell((cell, colNumber) => {
        headers[colNumber] = cell.value ? cell.value.toString().trim() : ''; // Store header names based on column number
      });
    } else {
      const rowData: Record<string, any> = {};
      row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
        const header = headers[colNumber];
        if (header) {
          const val = cell.value;
          // Handle complex formula/rich text if needed
          const finalVal = val && typeof val === 'object' && 'text' in val ? (val as any).text : val; // Get text value if it's a rich text object
          rowData[header] = finalVal;
        }
      });
      result.push({ row: rowData, rowNumber });
    }
  });

  return result;
}
