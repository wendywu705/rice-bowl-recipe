import React from 'react';
import './Title.css';
// import logo from './logo.png';
import chopsticks from './chopsticks.png';

function Title() {
    return (
        <div className="Title">
            {/*<img src={logo} alt='logo' height="30" color="white"/>*/}
            <h1>RICE BOWL</h1>
            <img src={chopsticks} alt='chopsticks' height="34"/>
        </div>
    )
}

export default Title
