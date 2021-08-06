import { Layout } from 'antd';
const { Footer } = Layout;

const WebsiteFooter = () => {
  return(
    <Layout style={{marginLeft:280, marginTop:20}} >
      <Footer style={{
          height:'100px', 
          backgroundColor:'#e6f7ff',
          display:'flex',
          justifyContent:'center'
        }}
      >
        <img
          style={{
            height:50,
            marginRight:15
          }}
          src={process.env.PUBLIC_URL + '/logo-blue.png'} 
          alt="rice logo"
        />
        <div>
          <div>
            CMPT 470 Final Project
          </div>
          <div>
            Created by Group 21. &copy; 2021
          </div>
        </div>
      </Footer>
    </Layout>
  );
}

export default WebsiteFooter;