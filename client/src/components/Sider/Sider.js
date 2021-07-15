import React from 'react';
import { Layout, Menu } from 'antd';

const { Sider } = Layout;

const SideBar = () => {
  return (
    <Layout>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          }}
        >
      </Sider>
    </Layout>    
  );

};

export default SideBar;
