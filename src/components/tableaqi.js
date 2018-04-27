import React, {Component} from 'react';
import { Text, View } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";

class TableAQI extends React.Component {
  render() {
    return (
      <Grid>
    	<Col style={{justifyContent: 'center',  flex: 0.5}}>
        	<Row style={{alignItems: 'center', justifyContent: 'center',backgroundColor:'#00ff00'}}>
            	<Text>0-50</Text>
        	</Row>
        	<Row style={{alignItems: 'center', justifyContent: 'center', backgroundColor:'#ffff1a'}}>
            	<Text>51-100</Text>
        	</Row>
        	<Row style={{alignItems: 'center', justifyContent: 'center', backgroundColor:'#ff9933'}}>
            	<Text style={{color:'#fff'}}>101-150</Text>
        	</Row>
        	<Row style={{alignItems: 'center', justifyContent: 'center', backgroundColor:'#ff471a'}}>
            	<Text style={{color:'#fff'}}>151-200</Text>
        	</Row>
        	<Row style={{alignItems: 'center', justifyContent: 'center', backgroundColor:'#993399'}}>
            	<Text style={{color:'#fff'}}>201-300</Text>
        	</Row>
        	<Row style={{alignItems: 'center', justifyContent: 'center', backgroundColor:'#990033'}}>
            	<Text style={{color:'#fff'}}>301-500</Text>
        	</Row>
    	</Col>
    	<Col style={{justifyContent: 'center',  flex: 1, paddingTop:20}}>
        	<Row>
            	<Text>good</Text>
        	</Row>
        	<Row>
            	<Text>moderate</Text>
        	</Row>
        	<Row>
            	<Text>sensitive</Text>
        	</Row>
        	<Row>
            	<Text>unheal</Text>
        	</Row>
        	<Row>
            	<Text>veryun</Text>
        	</Row>
        	<Row>
            	<Text>hazadous</Text>
        	</Row>
    	</Col>
    	<Col style={{justifyContent: 'center',  flex: 1, paddingTop:20}}>
        	<Row>
            	<Text>ok</Text>
        	</Row>
        	<Row>
            	<Text>accept</Text>
        	</Row>
        	<Row>
            	<Text>sen</Text>
        	</Row>
        	<Row>
            	<Text>effect</Text>
        	</Row>
        	<Row>
            	<Text>wanning</Text>
        	</Row>
        	<Row>
            	<Text>serious</Text>
        	</Row>
    	</Col>
	</Grid>
    );
  }
}
export default TableAQI;

