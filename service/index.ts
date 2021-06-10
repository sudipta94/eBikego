import {ToastAndroid} from 'react-native';
import {userRef} from '../environments';
import {ReactNativeFirebase} from '@react-native-firebase/app';
import {
  Project,
  Tasks,
  TasksUpdate,
  userCreateModel,
  userLoginService,
} from '../models/userModel';
export const Createuser = async (data: userCreateModel): Promise<any> => {
  console.log(data);

  var a = false;
  var id = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);
  data.user_id = id;
  await userRef.ref('users/' + id).set(data, () => {
    return (a = true);
  });
  return a;
};

export const UserLogin = async (data: userLoginService): Promise<any> => {
  var b = await userRef
    .ref('users')
    .orderByChild('user_email')
    .startAt(data.user_email)
    .endAt(data.user_email)
    .once('value', response => {
      return response;
    });
  return b;
};

export const projectCreate = async (data: Project): Promise<any> => {
  var a = false;
  var id = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);
  data.project_id = id;
  await userRef.ref('projects/' + id).set(data, () => {
    return (a = true);
  });
  return a;
};

export const CreateTask = async (data: Tasks): Promise<any> => {
  var a = false;
  var id = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);
  data.task_id = id;
  await userRef.ref('taskss/' + id).set(data, () => {
    return (a = true);
  });
  return a;
};

export const GetMyProjects = async (user_id: number): Promise<any> => {
  var b = await userRef
    .ref('projects')
    .orderByChild('user_id')
    .startAt(user_id)
    .endAt(user_id)
    .once('value', response => {
      return response;
    });
  return b;
};

export const GetAllUser = async (): Promise<any> => {
  var b = await userRef.ref('users').once('value', response => {
    return response;
  });
  return b;
};

export const GetTaskByProject = async (proj_id: number): Promise<any> => {
  var b = await userRef
    .ref('taskss')
    .orderByChild('project_id')
    .startAt(proj_id)
    .endAt(proj_id)
    .once('value', response => {
      return response;
    });
  return b;
};

export const GetTaskByUser = async (Userid: number): Promise<any> => {
  var b = await userRef
    .ref('taskss')
    .orderByChild('assign_to')
    .startAt(Userid)
    .endAt(Userid)
    .once('value', response => {
      return response;
    });
  return b;
};

export const updateStatus = async (data: TasksUpdate): Promise<any> => {
  return await userRef
    .ref('taskss/' + data.task_id)
    .update({status: data.status});
};
