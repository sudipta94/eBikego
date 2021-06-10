import React from 'react';
import {View, Text, ToastAndroid} from 'react-native';
import {connect} from 'react-redux';
import {StoreState} from '../../models/reduxModels';
import {Createuser, UserLogin} from '../../service';
import LoginView from './LoginView';
import {UserLoginAction} from '../../redux/actions/userAction';

const Login = ({navigation, UserLoginAction}: LoginProps) => {
  const Signupcall = () => {
    navigation.navigate('signup');
  };
  const LoginEvent = (data: any) => {
    if (!!data.user_email && !!data.user_password) {
      UserLoginAction({payload: data, navigation: navigation});
    } else {
      ToastAndroid.show('Invalide Data', 2000);
    }
  };
  return <LoginView Signupcall={Signupcall} LoginEvent={LoginEvent} />;
};

interface LoginProps {
  navigation?: any;
  route?: any;
  UserLoginAction?: any;
}
const mapDispatchToProps = {
  UserLoginAction,
};

const mapStateToProps = (state: StoreState) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
