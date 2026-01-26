import React from 'react';
import { Table } from 'antd';
const MyTable = (props: {
    data: Array<Record<string, any>>
}) => {
    const columns = [
        {
            title: '公司名称',
            dataIndex: 'company',
            key: 'company',
        },
        {
            title: '公司行业',
            dataIndex: 'compIndustry',
            key: 'compIndustry',
        },
        {
            title: '公司规模',
            dataIndex: 'compScale',
            key: 'compScale',
        },
        {
            title: "公司地址",
            dataIndex: 'dq',
            key: 'dq',
        }
    ]
    return (
        <Table columns={columns} dataSource={props.data} />
    )
}

export default MyTable;