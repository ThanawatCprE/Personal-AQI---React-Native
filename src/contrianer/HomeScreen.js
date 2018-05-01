
import React from 'react';
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base';
import {  StyleSheet, Text, View,YellowBox } from 'react-native';
import Login from './Login'
import DetailUser from './DetailUser'
import firebase from "../components/configFirebase";
class HomeScreen extends React.Component {
  constructor(props) {
      super(props)

      this.state = ({
        page: '',
        user: null
      })
    }
  componentWillReceiveProps =(nextprops) =>{
  		console.log(nextprops)
  		// this.signOutUser()
  		const  {navigate}  = this.props.navigation;
        var user = firebase.auth().currentUser;
        // console.log(user)
        if(user != null){
          this.setState({page:<DetailUser navigate={navigate} user={user} />})
        }
        else{
          this.setState({page:<Login navigate={navigate} />})
        }    
  }

   componentDidMount =(props) =>{
   	 // this.signOutUser()
   	  const  {navigate}  = this.props.navigation;
      var user = firebase.auth().currentUser;
        console.log(user)
        if(user != null){
          this.setState({page:<DetailUser navigate={navigate} user={user} />})
        }
        else{
          this.setState({page:<Login navigate={navigate} />})
        }    
    }
  render() {
  	
    return (
    	<Container >
    		{this.state.page}
      	</Container >
    );
  }
}

export default HomeScreen;