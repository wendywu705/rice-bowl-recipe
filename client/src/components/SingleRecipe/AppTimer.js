import { React, useState } from 'react';
import { Button, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

function InAppTimer(){
  const [isVisible, setVisible] = useState(false);

  const handleClose = () => {
    setVisible(false);
  };
  const showModal = () => {
    setVisible(true);
  };
  return (
    <div className="Timer">
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
        title="Timers (WIP)"
        onCancel={handleClose}
        visible={isVisible}
        footer={[
          <Button key="ok" onClick={handleClose} type="primary">
            OK
          </Button>,
        ]}
      >
        Timer would go here
        <Button
          style={{
            position: 'absolute',
            right: 30,
          }}
        >
          Start
        </Button>
      </Modal>
    </div>
  );
};

export default InAppTimer;