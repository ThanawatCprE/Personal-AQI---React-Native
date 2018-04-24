import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Text } from 'native-base';
import  Map  from './map';
import  MXHeader  from './header';
class FooterTabs extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      arr: [
                { name: "Home"},
                { name: "Mesurement"},
                { name: "Info"},
            ],
      header: "Home",
      index: 0 ,
      };
  }
  onPress = (seq) => {
    this.setState({ 
      header: this.state.arr[seq].name,
      index: seq 
      
    });
  }
  render() {
    return (
        <Container>
          <MXHeader headerText={this.state.header}/>
          <Map />
          <Footer style={{position: 'absolute' ,bottom:0 }}>
            <FooterTab>           
               {this.state.arr.map((el, index) =>
                      <Button key={index} active={(this.state.index == index) ? true : false}  onPress={() => this.onPress(index)} >
                         <Text>{el.name}</Text>
                      </Button>
                  )}
            </FooterTab>
          </Footer>
        </Container>
    );
  }
}
export default FooterTabs;