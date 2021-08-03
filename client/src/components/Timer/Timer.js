import { React, useState } from 'react';
import Countdown from 'react-countdown';
import { Divider, InputNumber, Button, Modal } from 'antd';

const CompleteTimer = () => {
  // alert('Time is up')
}




// {
//   total: 0,
//   days: 0,
//   hours: 0,
//   minutes: 0,
//   seconds: 0,
//   milliseconds: 0,
//   completed: true,
//   api: { ... },
//   props: { ... },
//   formatted: { ... }
// }

const Timer = (prop) => {
  const [pause, setPause] = useState(true);

  const renderer = ({hours, minutes, seconds, api, completed}) => {
    // console.log('in renderer',value)
    console.log('api', api);
    if (completed) {
      CompleteTimer()
      return <span>00:00:00</span>;
    } 
    if (api.pause && pause) {
      // return api.start();
      setPause(false)
      api.start()
    }
    if (!api.isPaused && !pause) {
      setPause(true)
      api.pause()
    }
    return <span>{hours}:{minutes}:{seconds}</span>;
  }
  let x;
  console.log('paused', pause)
  // window.onload = function() {
  //   x = document.getElementById('timerBtn');
  //   console.log('THE X',x)
  // }
  // // window.addEventListener('load', function() {
  //   // let x = document.getElementsByClassName('timerBtn')[0];
  //   // console.log('THE X',x)
  // // })

  // if (x) {
  //   x.addEventListener('click', function(){
  //     // console.log('clicked')
  //     setPause((pause)=>!pause)
  //     console.log('paused', pause)
  //   })

  // }

  return (
    <div>
      <Countdown 
        date={Date.now() + prop.time*1000}
        controlled={false}
        renderer={renderer}
        // renderer = {api => <div>{console.log(api())}</div>}
        autoStart={false}
      >
        {/* seconds * 1000 = seconds */}
        {/* {CompleteTimer(prop.time)} */}
   
      </Countdown>
      <Button
        className= "timerBtn"
        onClick={()=>setPause(!pause)}
      >
        Click Button
      </Button>   


    </div>

  );
};

export default Timer;