import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../Axios';
import ITable from '../../Interfaces/Table';
import './Dashboard.css';
import { PlusOutlined } from '@ant-design/icons';
import swal from 'sweetalert';
import { fillTable } from '../../Store/Actions';
import { TableState } from '../../Store/tableReducer';
import { Button, Table } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { Link, useNavigate } from 'react-router-dom';
import { INotification } from '../../Interfaces/Notifications';

const Dashboard: React.FunctionComponent<{}> = props => {
  const navigate = useNavigate();
  const tableData = useSelector<TableState, TableState["data"]>((state) => state.data);
  const dispatch = useDispatch();
  const columns: ColumnType<ITable>[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 100,
      render: (text: string, record: ITable) => {
        const detailsUrl = `/dashboard/${record.key}`
        return <Link to={detailsUrl}>{text}</Link>
      }
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      width: 80,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 100,
    },
    {
      title: 'Address',
      dataIndex: 'fullAddress',
      key: 'fullAddress',
      width: 150,
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      width: 100,
    },
    {
      title: 'Website',
      dataIndex: 'website',
      key: 'website',
      width: 100,
    }
  ];
  useEffect(() => {
    async function fetchData() {
      await axios.get<ITable[]>("/users")
        .then((res) => {
          if (res && res.data) {
            res.data.map((val: ITable) => {
              val.key = val.id;
              val.fullAddress = `${val.address.suite} ${val.address.street}, ${val.address.city}`;
              dispatch(fillTable(val));
            });
          }
        })
        .catch((err) => {
          const error: INotification = {
            title: "Error",
            text: "Not able to fetch table data",
            icon: "error"
          };
          swal(error);
          console.log(err);
      });
    }

    fetchData();
  }, []);
  return (
    <div className='dashboard'>
      <div className='dashboard-table'>
        <Table
          columns={columns}
          dataSource={tableData}
          size="middle"
          pagination={false}
          scroll={{ x: 'calc(700px + 50%)', y: 700 }}
        />
      </div>
      <Button type="primary" onClick={() => {navigate('../../create')}}className="create-user--button">
        <PlusOutlined style={{ fontSize: '24px' }}/>
      </Button>
    </div>
  )
}

export default Dashboard