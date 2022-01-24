import React, { useState } from 'react';
import { Button, Input, Modal, Space, Table, Form } from 'antd';

const AppTable = ({ dataApi }) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [editingForm, setEditingForm] = useState(null);
  const [page, setPage] = useState(1);

  // Pagination
  const handleChange = (page) => {
    setPage(page);
  };

  // Form Edit
  const onEditForm = (record) => {
    setVisible(true);
    setEditingForm({ ...record });
    console.log(editingForm);
  };

  // Columns
  const columns = [
    {
      title: 'Time',
      dataIndex: 'Datetime',
      key: 'Datetime',
      responsive: ['xs', 'md', 'lg'],
    },
    {
      title: 'LINE',
      dataIndex: 'lineName',
      key: 'lineName',
      responsive: ['xs', 'md', 'lg'],
    },
    {
      title: 'SKU',
      dataIndex: 'SKU',
      key: 'SKU',
      responsive: ['xs', 'md', 'lg'],
    },
    {
      title: 'Status',
      dataIndex: 'Status',
      key: 'Status',
      responsive: ['xs', 'md', 'lg'],
    },
    {
      title: 'Alasan',
      dataIndex: 'Reason',
      key: 'Reason',
      responsive: ['xs', 'md', 'lg'],
    },
    {
      title: 'Location',
      dataIndex: 'DowntimeLoc',
      key: 'DowntimeLoc',
      responsive: ['xs', 'md', 'lg'],
    },
    {
      title: 'PIC',
      dataIndex: 'PIC',
      key: 'PIC',
      responsive: ['xs', 'md', 'lg'],
    },
    {
      title: 'Catatan',
      dataIndex: 'catatan',
      key: 'catatan',
      responsive: ['xs', 'md', 'lg'],
    },
    {
      title: 'Action',
      key: 'action',
      render: (e) => (
        <Space size='middle'>
          <Button
            type='ghost'
            onClick={() => {
              onEditForm(e);
            }}>
            Edit
          </Button>
          <Modal
            title='Edit Form'
            // dataForm={dataForm}
            visible={visible}
            // onCreate={onCreate}
            onCancel={() => {
              setVisible(false);
            }}>
            <Form form={form} onFinish='' onFinishFailed='' layout='vertical'>
              <Form.Item name='Datetime' label='Datetime:'>
                <Input
                  value={editingForm?.Datetime}
                  // onChange={(e) => {
                  //   setEditingForm((pre) => {
                  //     return { ...pre, Datetime: e.target.value };
                  //   });
                  // }}
                />
              </Form.Item>
            </Form>
          </Modal>
        </Space>
      ),
    },
  ];

  const data = dataApi;

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={{
        current: page,
        onChange: handleChange,
        pageSize: 10,
        // total: data.length,
        showSizeChanger: false,
      }}
      scroll={{ x: 150 }}
    />
  );
};

export default AppTable;
