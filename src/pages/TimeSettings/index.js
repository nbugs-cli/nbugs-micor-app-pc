import { message, Popconfirm, Table } from "antd";
import React from "react";
import { useAntdTable } from "ahooks";
import Container from "@/components/Container";
import OperateDropdown from "@/components/OperateDropdown";
import {
  deleteTimeSettings,
  getTimeSettingsList
} from "@/services/timeSettings";
import FormModal from "./FormModal";
import styles from "./index.less";

const getTableData = ({ current, pageSize }) => {
  return getTimeSettingsList({ page: current, limit: pageSize }).then(res => ({
    total: res?.totalElements,
    list: res?.content
  }));
};

// 课后时间安排设置
export default () => {
  const { tableProps, search } = useAntdTable(getTableData);
  const { reset } = search;

  const onDelete = async id => {
    await deleteTimeSettings({ id });
    message.success("删除成功");
    reset();
  };

  const columns = [
    {
      title: "名称",
      dataIndex: "name"
    },
    {
      title: "课节时间",
      dataIndex: "timeRange",
      render: (_, { startTime, endTime }) => `${startTime}-${endTime}`
    },
    {
      title: "操作",
      dataIndex: "action",
      render: (_, record) => {
        const data = [
          {
            text: (
              <FormModal trigger={<span>编辑</span>} reset={reset} data={record} />
            )
          },
          {
            // text可以为string或者ReactNode
            text: (
              <Popconfirm
                title="确认删除次时间安排吗？"
                onConfirm={() => onDelete(record.id)}
              >
                <span>删除</span>
              </Popconfirm>
            )
          }
        ];
        return <OperateDropdown data={data} />;
      }
    }
  ];

  return (
    <Container breStates isSplitBar className={styles.root}>
      <FormModal reset={reset} />

      <Table columns={columns} rowKey="id" {...tableProps} />
    </Container>
  );
};
