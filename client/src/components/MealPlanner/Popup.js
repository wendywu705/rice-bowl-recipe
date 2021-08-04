import React from 'react';
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import { Button } from 'antd';

const Popup = (props) => {
  const { title, children, openPopup, setOpenPopup } = props;

  return (
    <Dialog open={openPopup}>
      <DialogContent>{children}</DialogContent>
      <Button
        onClick={() => {
          setOpenPopup(false);
        }}
      >
        Close
      </Button>
    </Dialog>
  );
};

export default Popup;
