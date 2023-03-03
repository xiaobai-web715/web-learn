interface columnI {
    title: string,
    dataIndex: string,
    key: string,
    render?: (a: object, b: number) => {}
}
interface dataI {
    [key: string] : string
}
interface paramsI {
    data: dataI[],
    columns: columnI[],
    excelListRows: number,
}
function createTemplate(params: paramsI){
    const length: number = params.data.length;
    const tableNums: number = Math.ceil(length / params.excelListRows);
    const listArray: Array<dataI>[] = [];
    for (let i = 0; i < tableNums; i++) {
        listArray.push(params.data.slice(i * params.excelListRows, (i + 1) * params.excelListRows));
    }
    for (let i = 0; i < tableNums; i++) {
        ((i) => {
            const table = document.createElement('table');
            // 构造表头
            const thead = document.createElement('thead');
            const theadTr = document.createElement('tr');
            const theadTd = params.columns.map((item, index) => {
                const th = `<th style='border: 1px solid #000;text-align: center;'>${item.title}</th>`;
                return th;
            });
            theadTr.innerHTML = theadTd.join('');
            thead.appendChild(theadTr);
            // 构造表体
            const tbody = document.createElement('tbody');
            const tbodyTrs = (listArray[i] || []).map((item, index) => {
                const trTds: string[] = [];
                params.columns.forEach((column) => {
                    if (column.render) {
                        trTds.push(`<td style='border: 1px solid #000;text-align: center;'>${column.render(item, ((params.excelListRows * i) + index))}</td>`);
                    } else {
                        trTds.push(`<td style='border: 1px solid #000;text-align: center;'>${item[column.dataIndex]}</td>`);
                    }
                });
                return `<tr>${trTds.join('')}</tr>`;
            });
            tbody.innerHTML = tbodyTrs.join('');
            // 将表头和表体放入table内
            table.appendChild(thead);
            table.appendChild(tbody);
            // 对数据处理后转化成base64,通过uri数据导出
        })(i);
    }
}
export default createTemplate;