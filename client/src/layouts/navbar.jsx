import React from 'react';
import { Button, Typography } from 'antd';

const navbar = () => {
  var strWindowFeatures =
    'menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes';

  const { Text } = Typography;
  return (
    <div className="" style={styles.navbar}>
      <nav className="navbar">
        <img src="./threndLogo.jpg" style={{ width: 100 }} alt="thrend logo" />
        <ul className="py-1">
          <li>
            <Button
              style={styles.btnRadius}
              type="ghost"
              onClick={() =>
                window.open(
                  'http://tohshine.herokuapp.com/',
                  'newWindow',
                  strWindowFeatures
                )
              }
            >
              <Text type="warning">About me</Text>
            </Button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

const styles = {
  navbar: {
    flex: 1
  },
  btnRadius: {
    borderRadius: '20px',
    color: '#fff'
  }
};

export default navbar;
