import React from 'react';
import {View, Text, ToastAndroid} from 'react-native';
import {connect} from 'react-redux';
import {StoreState} from '../../models/reduxModels';
import {Createuser} from '../../service';
import SignupView from './SignupView';
import {UserSignUpAction} from '../../redux/actions/userAction';

const Signup = ({navigation, UserSignUpAction}: SignupProps) => {
  const Goback = () => {
    navigation.goBack();
  };
  const SingUp = (data: any) => {
    if (!!data.user_email && !!data.user_name && !!data.user_password) {
      UserSignUpAction({payload: data, navigation: navigation});
    } else {
      ToastAndroid.show('Invalid data', 2000);
    }
  };
  return <SignupView Goback={Goback} SingUp={SingUp} />;
};

const mapDispatchToProps = {
  UserSignUpAction,
};

const mapStateToProps = (state: StoreState) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(Signup);

interface SignupProps {
  navigation?: any;
  route?: any;
  UserSignUpAction?: any;
}
