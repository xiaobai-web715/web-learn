const toExcel = () => {
    const table = document.getElementById('impTable');
    console.log('table', [table]);
    const excelContent  = table.innerHTML;
    const template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">' +
                '<head>' +
                '<!--[if gte mso 9]>' +
                '<xml>' +
                '<x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>' +
                '<x:Name>%s</x:Name>' +
                '<x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets>' +
                '</x:ExcelWorkbook>' +
                '</xml>' +
                '<![endif]-->' +
                '</xml>' +
                '<meta charset="UTF-8"></head><body><table>%s</table></body></html>';
    const excelUrl = new Blob([format(template, 'Worksheet', excelContent)], {type: 'application/vnd.ms-excel'});
    console.log('excelUrl', excelUrl);
    const a = document.createElement('a');
    a.href = window.URL.createObjectURL(excelUrl);
    a.download = '测试文件下载.xls';
    a.style.display = 'none';
    a.click();
};
const button = document.getElementById('button');
button.addEventListener('click', toExcel);