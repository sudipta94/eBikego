import React from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {StoreState} from '../../models/reduxModels';
import {userCreateModel} from '../../models/userModel';
import ProfileView from './ProfileView';
import {LogOutAction} from '../../redux/actions/userAction';

const Profile = ({user, LogOutAction}: ProfileProps) => {
  const LogOut = () => {
    LogOutAction();
  };
  return <ProfileView user={user} LogOut={LogOut} />;
};

const mapDispatchToProps = {
  LogOutAction,
};

const mapStateToProps = (state: StoreState) => {
  return {
    user: state.user.user,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);

interface ProfileProps {
  user?: userCreateModel;
  LogOutAction?: any;
}
