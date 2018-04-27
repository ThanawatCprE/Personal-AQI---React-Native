import React, {Component} from 'react';
import {Button, View, Text, Body} from 'native-base';
class Choose extends Component {
	render() {
    	return (
        <Body style={{ top:100 }}>
          <Button style={styles.buttonPM} large primary>
            <Text>PM2.5</Text>
          </Button>
          <Button style={styles.buttonPM} large primary>
            <Text>PM10</Text>
          </Button>
        </Body>
    	);
	}
}

export default Choose;

const styles ={
  buttonPM :{
    margin:10,
    justifyContent: 'center',
    alignItems: 'center',
  }
}