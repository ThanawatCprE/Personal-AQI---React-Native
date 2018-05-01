
import React ,{ Component }from 'react';
import {
  AppRegistry,
  StyleSheet,
  Dimensions,
  Text,
  View
} from 'react-native';
import firebase from "../components/configFirebase";
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base';
class DetailUser extends Component {
  constructor(props) {
      super(props)
       this.state = ({
        user:this.props.user,
        navigate:this.props.navigate,
        login: true
      })
    }
   signOutUser = async () => {
      try {
          await firebase.auth().signOut();
          this.setState({login: false})
          // navigate('Auth');
      } catch (e) {
          console.log(e);
      }
  }
   render() {
    return (
        <Container style={styles.container}>
          <Form>
            <Item>
              <Label>Name:</Label>
              <Text>{this.state.user.displayName}</Text>
            </Item>
            <Item>
              <Label>Email:</Label>
              <Text>{this.state.user.email}</Text>
            </Item>
             <Item>
              <Label>UserID:</Label>
              <Text>{this.state.user.uid}</Text>
            </Item>
          <Button style={{ marginTop: 10 }}
              full
              rounded
              danger
              onPress={() => {this.signOutUser(); this.state.navigate('Home',{login:this.state.login});}}
            >
               <Text style={{ color: 'white' }}> Logout</Text>
            </Button>
          </Form>
        </Container >
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 10
  },
});
export default DetailUser;