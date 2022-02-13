import React, { useEffect, useState } from 'react';
import { Descriptions } from 'antd';
import './Details.css';
import ITable from '../../Interfaces/Table';
import { useSelector } from 'react-redux';
import { TableState } from '../../Store/tableReducer';
import { useParams } from 'react-router-dom';

const Details: React.FunctionComponent<{}> = props => {
  const tableData = useSelector<TableState, TableState["data"]>((state) => state.data);
  const [userData, setUserData] = useState<ITable>();
  const params = useParams();
  useEffect(() => {
    const id = Number(params.id);
    const data = tableData.find((item: ITable) => item.id === id);
    setUserData(data);
  }, [])
  return (
    <div className='details'>
      <Descriptions title="User Details" layout="vertical" bordered>
        <Descriptions.Item label="Name">{userData?.name}</Descriptions.Item>
        <Descriptions.Item label="Username">{userData?.username}</Descriptions.Item>
        <Descriptions.Item label="Address" span={2}>{`${userData?.fullAddress}, ${userData?.address.zipcode}`}</Descriptions.Item>
        <Descriptions.Item label="Phone">{userData?.phone}</Descriptions.Item>
        {userData?.website && <Descriptions.Item label="Website">{userData?.website}</Descriptions.Item>}
        {userData?.company?.name && <Descriptions.Item label="Company" span={2}>{userData?.company?.name}</Descriptions.Item>}
      </Descriptions>
    </div>
  )
}

export default Details;