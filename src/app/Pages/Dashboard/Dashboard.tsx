import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../Axios';
import ITable from '../../Interfaces/Table';
import './Dashboard.css';
import { fillTable } from '../../Store/Actions';
import { TableState } from '../../Store/tableReducer';
import { Table } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { Link } from 'react-router-dom';
import Details from '../User/Details';

const Dashboard: React.FunctionComponent<{}> = props => {
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
        .catch((error) => {
        console.log(error);
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
    </div>
  )
}

export default Dashboard