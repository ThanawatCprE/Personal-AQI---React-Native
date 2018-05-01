
import React ,{ Component }from 'react';
import {
  AppRegistry,
  StyleSheet,
  Dimensions,
  Text,
  View
} from 'react-native';
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base';
import firebase from "../components/configFirebase";
import Logo from '../components/logo';

class Login extends Component {
    constructor(props) {
      super(props)

      this.state = ({
        email: '',
        password: '',
        navigate:this.props.navigate,
        login: false
      })
    }

  signOutUser = async () => {
      try {
          await firebase.auth().signOut();
          // navigate('Auth');
      } catch (e) {
          console.log(e);
      }
  }
   
  signUpUser = (email, password) => {

     firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(() => { alert("success"); this.setState({ error: '' }); })
                    .catch(() => {
                        this.setState({ error: 'Authentication failed.' });
                        alert("failed signup");
                    });
  }

  loginUser = (email, password) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => { 
              this.setState({ login:true }); 
              // let user =  firebase.auth().currentUser;
              // console.log(user)
              // this.setState({ user});
              // console.log(this.state.user)
              // return 'sad'
           // firebase.auth().onAuthStateChanged(function(user) {
           //      if (user) {
           //     //   user.updateProfile({
           //     //   displayName: "Jane Q. User",
           //     //   photoURL: "https://example.com/jane-q-user/profile.jpg"
           //     // }).then(function() {
           //     //   // Update successful.
           //     // }).catch(function(error) {
           //     //   // An error happened.
           //     // });
               
           //        // User is signed in.
           //        // var displayName = user.displayName;
           //        // var email = user.email;
           //        // var emailVerified = user.emailVerified;
           //        // var photoURL = user.photoURL;
           //        // var isAnonymous = user.isAnonymous;
           //        // var uid = user.uid;
           //        // var providerData = user.providerData
           //        console.log(user)
           //        // ...
           //      } else {
           //        // User is signed out.
           //        // ...
           //      }
           //    });
            })
            .catch(() => {
                //Login was not successful, let's create a new account
               this.setState({ error: 'Authentication failed.' });
                alert("failed login");
            });
        
  }
   render() {
    return (
       <Container style={styles.container}>
       <Logo/>
          <Form>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={(email) => this.setState({ email })}
              />

            </Item>

            <Item floatingLabel>
              <Label>Password</Label>
              <Input
                secureTextEntry={true}
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={(password) => this.setState({ password })}
              />
            </Item>

            <Button style={{ marginTop: 10 }}
              full
              rounded
              success
              onPress={() =>{this.loginUser(this.state.email, this.state.password);this.state.navigate('Home',{login:this.state.login}); } }
            >
              <Text style={{ color: 'white' }}> Login</Text>
            </Button>

            <Button style={{ marginTop: 10 }}
              full
              rounded
              primary
              onPress={() => this.signUpUser(this.state.email, this.state.password)}
            >
              <Text style={{ color: 'white' }}> Sign Up</Text>
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
export default Login;