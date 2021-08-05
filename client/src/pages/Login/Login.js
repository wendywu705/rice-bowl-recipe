import React from 'react';
import './Login.css';
import { Button } from 'reactstrap';
require('dotenv').config();

const Login = () => {
    const url = process.env.REACT_APP_SERVER_URL;
    console.log(url);
  return (
    <div className="center">
        <div className="align-flex">
          <img 
            className='riceimage' 
            src={process.env.PUBLIC_URL + '/logo-blue.png'} 
            alt="rice logo"
          />
          <div className="title-name">Rice Bowl</div>
        </div><br/><br/>
        <a href={url+"/auth/login"}>
          <Button className="btn" outline color="primary">Log In using Google</Button></a>
    </div>
  );
};

export default Login;
