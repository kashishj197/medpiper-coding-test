import { Button, Form, Input } from 'antd';
import React from 'react';
import "./Create.css";
import { ICreateForm } from '../../Interfaces/Create';
import axios from '../../Axios';
import ITable from '../../Interfaces/Table';
import { fillTable } from '../../Store/Actions';
import { useDispatch } from 'react-redux';
import swal from 'sweetalert';
import { INotification } from '../../Interfaces/Notifications';

const Create: React.FunctionComponent<{}> = props => {
  const dispatch = useDispatch();
  const onFinish = (values: ICreateForm) => {
    async function fetchData() {
      await axios.post<ITable>("/users", values)
        .then((res) => {
          if (res && res.data) {
            res.data.key = res.data.id;
            res.data.fullAddress = `${res.data.address.suite} ${res.data.address.street}, ${res.data.address.city}`;
            dispatch(fillTable(res.data));
            const successContent: INotification = { title: "Create", text: "User added successfully", icon: "success" };
            swal(successContent);
          }
        })
        .catch((error) => {
        console.log(error);
      });
    }

    fetchData();
  };

  return (
    <div className='createuser'>
      <Form
        name="createuser"
        className="createuser-form"
        labelCol={{ flex: '110px' }}
        labelAlign="left"
        labelWrap
        wrapperCol={{ flex: 1 }}
        colon={false}
        onFinish={onFinish}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please provide your Fullname!' }]}
        >
          <Input placeholder="Full Name" />
        </Form.Item>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please add your Username!' }]}
        >
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item
          label="Address"
          name="address"
        >
          <Input.Group compact>
            <Form.Item name={['address', 'street']} rules={[{ required: true, message: 'Street is required!' }]}>
              <Input
                placeholder="Street"
                />
            </Form.Item>
            <Form.Item name={['address', 'suite']}>
              <Input
                placeholder="Block/Apartment"
                />
            </Form.Item>
            <Form.Item name={['address', 'city']} rules={[{ required: true, message: 'City is required!' }]}>
              <Input
                placeholder="City"
                />
            </Form.Item>
          </Input.Group>
        </Form.Item>
        <Form.Item
          label="Phone"
          name="phone"
          rules={[{ required: true, message: 'Please input your Phone!' }]}
        >
          <Input
            type="phone"
            placeholder="Phone number"
          />
        </Form.Item>
        <Form.Item
          label="Website"
          name="website"
          rules={[{ required: false, message: 'Please input your Website!' }]}
        >
          <Input
            placeholder="Website URL"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="submit-form-button">
            Create
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Create;