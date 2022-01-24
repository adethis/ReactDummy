import React, { useState } from 'react';
import { Button, Input, Modal, Space, Table, Form } from 'antd';
import axios from 'axios';

const newData = {
  id: null,
  dtForm: null,

  // title: "",
  // description: "",
  // duration: "",
  // year: "",
  // genre: "",
  // rating: "",
  // review: "",
  // image_url: "",
  // statusForm: "",
};

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
    setEditingForm(record);
    form.setFieldsValue(record);
  };

  // onFinish
  const onFinish = (values) => {
    console.log('ini adalah values', values);
    editingForm.Datetime = values.Datetime;
    axios.put('http://demokitiot.ddns.net:9191/downtimes/chopp', editingForm)
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
    setVisible(false);
  };

  // onCancel
  const onCancel = () => {
    setVisible(false);
  };
  const onFieldChange = (values) => {
    console.log('ini OnfieldChange', values);
  };

  const onHandleChange = (e) => {
    console.log(e.target.value);
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
            visible={visible}
            title='Edit Form'
            onCancel={onCancel}
            onOk={() => {
              form
                .validateFields()
                .then((values) => {
                  form.resetFields();
                  onFinish(values);
                })
                .catch((info) => {
                  console.log('Validate Failed:', info);
                });
            }}>
            <Form
              form={form}
              onFinish={onFinish}
              layout='vertical'>
              <Form.Item
                name='Datetime'
                label='Datetime:'>
                <Input />
              </Form.Item>
            </Form>
          </Modal>
        </Space>
      ),
    },
  ];

  const data = dataApi;

  // Rendering
  return (
    <Table
      rowKey="id"
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
