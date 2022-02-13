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
import { Navigate, useNavigate } from 'react-router-dom';

const Create: React.FunctionComponent<{}> = props => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const numberRegex: RegExp = new RegExp(/^[0 - 9]/);
  const websiteRegex: RegExp = new RegExp(/^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/);
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
            navigate(`../dashboard/${res.data.key}`)
          }
        })
        .catch((err) => {
          const error: INotification = {
            title: "Error",
            text: "Not able to create user",
            icon: "error"
          };
          swal(error);
          console.log(err);
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
          rules={[{ required: true, message: 'Please input your Phone!' },
          { pattern: numberRegex, message: 'Only number allowed!' }]}
        >
          <Input
            type="phone"
            placeholder="Phone number"
          />
        </Form.Item>
        <Form.Item
          label="Website"
          name="website"
          rules={[{ required: false, message: 'Please input your Website!' },
          {pattern: websiteRegex, message: 'Please enter valid url'}]}
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