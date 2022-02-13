import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home/Home';
import Dashboard from './Pages/Dashboard/Dashboard';
import Create from './Pages/User/Create';
import { Layout } from 'antd';
import Details from './Pages/User/Details';

const App: React.FunctionComponent<{}> = props => {
  const [loggedIn, setLogin] = useState<boolean>(false);
  const header = 'Coding Test';
  return (
    <Layout className="layout">
      <Layout.Header className="layout-header">
        <span className="header">{header}</span>
      </Layout.Header>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route path="home" element={<Home setLoginStatus={setLogin}/>} />
          <Route path="dashboard">
            <Route index element={loggedIn && <Dashboard />} />
            <Route path=":id" element={loggedIn && <Details />} />
          </Route>
          <Route path="create" element={<Create />} />
        </Routes>
      </BrowserRouter>
    </Layout>
  );
}

export default App;
