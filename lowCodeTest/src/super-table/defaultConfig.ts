export const defaultPagination = {
    size: 'normal',
    hideOnSinglePage: false,
    showTotal: (total: number, range: number[]) => {
        return `总数：${total}条`
    },
    pageSizeOptions: ['10', '20', '50']
}