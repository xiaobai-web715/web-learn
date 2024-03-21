import "ant-design-vue/dist/antd.css";
const TableJSX = () => {
  const columns = [
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "年龄",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "住址",
      dataIndex: "address",
      key: "address",
    },
  ];
  const dataSource = [
    {
      key: "1",
      name: "胡彦斌",
      age: 32,
      address: "西湖区湖底公园1号",
    },
    {
      key: "2",
      name: "胡彦祖",
      age: 42,
      address: "西湖区湖底公园1号",
    },
  ];
  const bodyCell = (columns) => {
    console.log("columns", columns);
    if (typeof columns.text === "number") {
      return 100;
    }
  };
  const VNode = () => {
    return {
      bodyCell: (columns) => bodyCell(columns)
    };
  };
  return (
    <a-table
      columns={columns}
      dataSource={dataSource}
      // v-slots={VNode()}
    >
      <slot name="bodyCell"></slot>
    </a-table>
  );
};
export default TableJSX;
