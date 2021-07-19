import React from 'react';
import { Layout } from 'antd';

import SideBar from './Sider.js';

const { 
  Header, 
  Content, 
  Footer
} = Layout;


const PageLayout = () => {
  return (
    <div style={{height:'100%'}}>
      <SideBar />
      {/* <Layout 
        className="site-layout" 
        style={{ marginLeft: 280 }}
      >
        <Header 
          className="headerClass" 
          style={{ 
            padding: 0, 
            backgroundColor: 'white'
          }} 
        />
        <Content 
          style={{ 
            margin: '24px 16px 0',
            overflow: 'initial' 
          }}>
        <div 
          className="mainContent" 
          style={{ 
            padding: 24, 
            textAlign: 'center' 
          }}>
          Put Page Content Here
        </div>
        </Content>
        {/* <Footer 
          style={{ 
            textAlign: 'center', 
            position:'absolute', 
            height: 100,
            bottom:0, 
            width:'100%' 
          }}>470 Final Project ©2021
        </Footer> */}
      {/* </Layout> */} 

    </div>
  );
};

export default PageLayout;
