import { React, useState } from 'react';
import { Button } from 'antd';
import Countdown from 'react-countdown';
import './Timer.css'

const CompleteTimer = () => {
  setTimeout(function(){
    alert('Time is up')
  }, 100)
}

const prepend = (num) => {
  if (num < 10 && num >= 0) {
    return "0"+num;
  }
  else return num;
}

const Timer = (prop) => {
  const [pause, setPause] = useState(true);
  const [action, setAction] = useState(false)

  const renderer = ({hours, minutes, seconds, api, completed}) => {
    if (completed && !pause) {
      CompleteTimer()
      setPause(true)
      return <span>00:00:00</span>;
    } 
    if (!pause && action) { // pressed play (pause = false)
      setAction(false);
      api.start();  // start timer
    }
    else if (pause && action) { // pressed stop
      setAction(false);
      api.stop();  // stop timer
    }
    return (
      <span className="timer">
        {prepend(hours)}:{prepend(minutes)}:{prepend(seconds)}
      </span>
    );
  }
  return (
    <div className="TimerContainer">
      <Countdown 
        date={Date.now() + prop.time*1000}
        controlled={false}
        renderer={renderer}
        autoStart={false}
        className="timer"
      > 
      </Countdown>
      <Button
        className= "timerBtn"
        onClick={()=>{
          return(
            <div>
              {setPause(!pause)}
              {setAction(true)}
            </div>
          );
        }}
        style={{
          marginLeft:20,
          width: 100,
          marginRight:10
        }}
      >
        {pause ? 'START' : 'STOP'}
      </Button>   
    </div>

  );
};

export default Timer;