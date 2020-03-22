import React from 'react';
import { Button, Typography } from 'antd';

const header = props => {
  const { room, creator, link, owner } = props;
  var strWindowFeatures =
    'menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes';

    const { Text } = Typography;
  return (
    <div style={style.header}>
      <div style={style.detail}>
        <div className="">
          <img
            src="./online.png"
            style={{ width: '7px' }}
            alt="online icon thread"
          />{' '}
          <span style={{ color: '#fff' }}>{room}</span>
        </div>

        <Button
              style={style.btnRadius}
              type="ghost"
              onClick={() =>
                window.open(
                  `${link}`,
                 
                )
              }
            >
              <Text type="warning">Github</Text>
            </Button>
           
      </div>
      <span>
        Admin: <span className="text-light">{creator}</span>
      </span>
    </div>
  );
};

const style = {
  header: {
    backgroundColor: '#003459',
    color: '#fff',
    padding: '15px',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btn: {
    borderRadius: '10px',
    color: '#fff'
  },
  detail: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  
  btnRadius: {
    borderRadius: '20px',
    color: '#fff'
  }
};


export default header;
