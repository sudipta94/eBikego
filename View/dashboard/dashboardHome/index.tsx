import React from 'react';
import {View, Text, ToastAndroid} from 'react-native';
import {connect} from 'react-redux';
import {StoreState} from '../../../models/reduxModels';
import {Project, Tasks, userCreateModel} from '../../../models/userModel';
import DashboardHomeView from './DashboardHomeView';
import {
  CreateProject,
  HomeLoadAction,
  TaskStatusUpdateAction,
} from '../../../redux/actions/userAction';
import {useFocusEffect} from '@react-navigation/native';

const DashboardHome = ({
  user,
  CreateProject,
  HomeLoadAction,
  project,
  navigation,
  myTask,
  TaskStatusUpdateAction,
}: DashboardHomeProps) => {
  const craeteProject = (data: string) => {
    if (!!data) {
      CreateProject({
        project_name: data,
        project_id: null,
        user_id: user?.user_id,
      });
    } else {
      ToastAndroid.show('Invalide Data', 2000);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      HomeLoadAction(user?.user_id);
    }, []),
  );
  const ProjectDetails = (data: number) => {
    navigation.navigate('project-details', {project_id: data});
  };
  const actionTigger = (data: any) => {
    TaskStatusUpdateAction({
      task_id: data.task_id,
      status: data.status,
      from: 1,
      user_id: user?.user_id,
      project_id: null,
    });
  };
  return (
    <DashboardHomeView
      user={user}
      craeteProject={craeteProject}
      project={project}
      ProjectDetails={ProjectDetails}
      myTask={myTask}
      actionTigger={actionTigger}
    />
  );
};

const mapDispatchToProps = {
  CreateProject,
  HomeLoadAction,
  TaskStatusUpdateAction,
};

const mapStateToProps = (state: StoreState) => {
  return {
    user: state.user.user,
    project: state.user.project,
    myTask: state.user.myTask,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DashboardHome);

interface DashboardHomeProps {
  user?: userCreateModel;
  CreateProject?: any;
  HomeLoadAction?: any;
  project?: Project[];
  navigation?: any;
  myTask?: Tasks[];
  TaskStatusUpdateAction?: any;
}
