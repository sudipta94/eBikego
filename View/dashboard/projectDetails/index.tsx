import React from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {StoreState} from '../../../models/reduxModels';
import {Project, Tasks, userCreateModel} from '../../../models/userModel';
import ProjectDetailsView from './ProjectDetailsView';
import {
  ProjectDetailsLoadAction,
  TaskStatusUpdateAction,
} from '../../../redux/actions/userAction';
import {useFocusEffect} from '@react-navigation/native';

const ProjectDetail = ({
  project,
  user,
  route,
  navigation,
  ProjectDetailsLoadAction,
  task,
  TaskStatusUpdateAction,
}: ProjectManagementProps) => {
  console.log(route);
  console.log(project);
  const SetTask = () => {
    navigation.navigate('create-task', {project_id: route.params.project_id});
  };
  useFocusEffect(
    React.useCallback(() => {
      ProjectDetailsLoadAction(route.params.project_id);
    }, []),
  );
  const actionTigger = (data: any) => {
    TaskStatusUpdateAction({
      task_id: data.task_id,
      status: data.status,
      from: 2,
      user_id: user?.user_id,
      project_id: route.params.project_id,
    });
  };
  return (
    <ProjectDetailsView
      SetTask={SetTask}
      task={task}
      project={project?.find(m => m.project_id == route.params.project_id)}
      actionTigger={actionTigger}
    />
  );
};

const mapDispatchToProps = {
  ProjectDetailsLoadAction,
  TaskStatusUpdateAction,
};

const mapStateToProps = (state: StoreState) => {
  return {
    user: state.user.user,
    project: state.user.project,
    task: state.user.tasks,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetail);
interface ProjectManagementProps {
  user?: userCreateModel;
  project?: Project[];
  route?: any;
  navigation?: any;
  ProjectDetailsLoadAction?: any;
  task?: Tasks[];
  TaskStatusUpdateAction?: any;
}
