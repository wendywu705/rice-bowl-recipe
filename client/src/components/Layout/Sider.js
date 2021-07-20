import React from 'react';
import 'antd/dist/antd.css';
import './Sider.css';
import { Link } from 'react-router-dom';

import { 
  Layout, 
  Menu, 
  AutoComplete, 
  Button
} from 'antd';

import {
  HomeOutlined,
  GlobalOutlined,
  CalendarOutlined,
  ShoppingCartOutlined,
  LogoutOutlined
} from '@ant-design/icons';

const { Sider } = Layout;

const recipes = [
  { value: 'Recent Search 1' },
  { value: 'Recipe 2' },
  { value: 'Recipe 3' },
];


const SideBar = () => {
  return (
    <Layout>
      <Sider
        width = '280'
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          backgroundColor: 'white',
          left: 0,
        }}
      >
        <div className="logo">
          <img 
            className='riceimage' 
            src={process.env.PUBLIC_URL + '/logo-blue.png'} 
            alt="rice logo" 
          />
          <div className="title">
            Rice Bowl
          </div>
        </div>
        <div 
          style={{
            display:'flex',
            justifyContent:'center', 
            paddingBottom:15, 
            paddingTop: 10
          }}>
          <AutoComplete
            style={{ width: 230 }}
            placeholder="Search Recipes"
            options={recipes}
          />
        </div>
        <Menu  
          mode="inline"
          defaultSelectedKeys={[ '1' ]}
        >
          <Menu.Item 
            className='itemClass'
            key="1" 
            icon={<HomeOutlined className='itemIcon'/>}
          ><Link to="/home">
            Home
            </Link>
          </Menu.Item>
          <Menu.Item 
            className='itemClass' 
            key="2" 
            icon={<GlobalOutlined className='itemIcon' />}
          >
            Browse
          </Menu.Item>
          <Menu.Item 
            className='itemClass' 
            key="3" 
            icon={<CalendarOutlined className='itemIcon' />}
          >
            Meal Planner
          </Menu.Item>
          <Menu.Item 
            className='itemClass' 
            key="4" 
            icon={<ShoppingCartOutlined className='itemIcon' />}
          >
            Cart
          </Menu.Item>
        </Menu>
        <Link to="/">
          <Button
            className='signButton'
            style={{
              backgroundColor:'#E6F7FF',
              width: 280,
              height: 50,
              position:'absolute',
              bottom:0,
              border: 0,
              fontSize: '20px',
            }}
            icon={<LogoutOutlined />}
          >
            Sign Out
          </Button>
        </Link>
      </Sider>
    </Layout>
  );
};

export default SideBar;