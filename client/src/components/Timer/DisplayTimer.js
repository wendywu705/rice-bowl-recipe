import { React, useState } from 'react';
import { Button, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import GetTimes from './GetTimes';
import Timer from './Timer';

const InappTimer = (props) => {
  const [isVisible, setVisible] = useState(false);

  const handleClose = () => {
    setVisible(false);
  };
  const showModal = () => {
    setVisible(true);
  };
  const getTimeArr = () => {
    let numArr = GetTimes(props.directions);
    return numArr;
  }
  return (
    <div>
      <Button
        size="large"
        onClick={showModal}
        style={{
          fontSize: '20px',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 200,
          position: 'absolute',
          right: 100,
        }}
        icon={
          <PlusOutlined
            style={{
              display: 'inline-block',
              verticalAlign: 'middle',
              fontSize: 'small',
            }}
          />
        }
      >
        In-App Timer
      </Button>
      <Modal
        title="Timers"
        onCancel={handleClose}
        visible={isVisible}
        footer={[
          <Button key="ok" onClick={handleClose} type="primary">
            OK
          </Button>,
        ]}
      >
        {console.log(getTimeArr().length===0)}
        {getTimeArr().length!==0 ? 
          getTimeArr().map(data => {
            return (
              <div style={{display:'flex', alignItems:'center'}}>
                <div style={{marginRight:10, fontSize:15}}>{'STEP '+(data[1]+1)+": "}</div> 
                <Timer time={data[0]}/> 
              </div>
            );
          }):
        <div style={{color:'#A6A6A6', fontSize:17, textAlign:'center'}}>
          NO TIMERS AVAILABLE
        </div>
        }
      </Modal>
    </div>
  );
};

export default InappTimer;
