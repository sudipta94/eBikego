import {useFocusEffect} from '@react-navigation/native';
import React from 'react';
import {View, Text, ToastAndroid} from 'react-native';
import {connect} from 'react-redux';
import {StoreState} from '../../../models/reduxModels';
import {Tasks, userCreateModel} from '../../../models/userModel';
import CreateTaskView from './CreateTaskView';
import {
  GetAllUserAction,
  CreateTaskAction,
} from '../../../redux/actions/userAction';

const CreateTask = ({
  userList,
  GetAllUserAction,
  navigation,
  CreateTaskAction,
  route,
}: CreateTaskProps) => {
  useFocusEffect(
    React.useCallback(() => {
      GetAllUserAction();
    }, []),
  );
  const Submit = (data: Tasks) => {
    if (
      !!data.assign_to &&
      !!data.date &&
      !!data.task_desc &&
      !!data.task_title &&
      data.assign_to != -1
    ) {
      data.project_id = route.params.project_id;
      CreateTaskAction({task: data, navigation: navigation});
    } else {
      console.log(data);

      ToastAndroid.show('Invalid data', 2000);
    }
  };
  return <CreateTaskView userList={userList} Submit={Submit} />;
};

const mapDispatchToProps = {
  GetAllUserAction,
  CreateTaskAction,
};

const mapStateToProps = (state: StoreState) => {
  return {
    user: state.user.user,
    userList: state.user.userList,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateTask);
interface CreateTaskProps {
  user?: userCreateModel;
  userList?: userCreateModel[];
  route?: any;
  navigation?: any;
  GetAllUserAction?: any;
  CreateTaskAction?: any;
}
