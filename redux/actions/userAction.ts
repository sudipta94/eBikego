import {ToastAndroid} from 'react-native';
import {
  Project,
  Tasks,
  TasksUpdate,
  userCreateModel,
} from '../../models/userModel';
import {
  CreateTask,
  Createuser,
  GetAllUser,
  GetMyProjects,
  GetTaskByProject,
  GetTaskByUser,
  projectCreate,
  updateStatus,
  UserLogin,
} from '../../service';

export enum UserActionTypes {
  User_Login_Success_Action = '[USER] User Login Success Action',

  User_SignUp_Success_Action = '[USER] User Signup Success Action',

  Loading_Start_Action = '[USER] Loading Start Action',

  Loading_Stop_Action = '[USER] Loading Stop Action',

  LogOut_Action = '[USER] Log Out Action',

  Home_Load_Success_Action = '[USER] Home Load Success Action',

  Home_Load_2_Success_Action = '[USER] Home Load 2 Success Action',

  Get_All_User_Action = '[USER] Get All User Action',

  Get_Task_By_Project = '[USER] Get Task By Project',

  Task_Update_Status_Action = '[USER] Task Update Status Action',
}

export const UserLoginAction = (payload: any) => {
  return (dispatch: any, getState: any) => {
    dispatch(LoadingStartAction());
    return UserLogin(payload.payload)
      .then(response => {
        dispatch(LoadingStopAction());
        if (
          !!response &&
          response != null &&
          !!response?._snapshot?.value &&
          !!response?._snapshot?.value[
            Object.keys(response._snapshot.value)[0]
          ] &&
          response?._snapshot?.value[Object.keys(response?._snapshot?.value)[0]]
            .user_password === payload.payload.user_password
        ) {
          console.log(response);
          dispatch(
            UserLoginSuccessAction(
              response._snapshot.value[
                Object.keys(response._snapshot.value)[0]
              ],
            ),
          );
        } else {
          console.log(response);
          console.log('error');

          ToastAndroid.show('Wrong email or password.', 4000);
        }
      })
      .catch((error: any) => {
        console.log(error);
        ToastAndroid.show('Invalide User', 4000);
      });
  };
};

export const UserLoginSuccessAction = (data: any) => {
  return {type: UserActionTypes.User_Login_Success_Action, payload: data};
};

export const UserSignUpAction = (payload: any) => {
  return (dispatch: any, getState: any) => {
    dispatch(LoadingStartAction());
    console.log(payload);

    return UserLogin({
      user_email: payload.payload.user_email,
      user_password: payload.payload.user_password,
    })
      .then(response => {
        console.log(response);

        dispatch(LoadingStopAction());
        if (
          !!response &&
          response != null &&
          !!response?._snapshot?.value &&
          !!response?._snapshot?.value[
            Object.keys(response?._snapshot?.value)[0]
          ]
        ) {
          ToastAndroid.show('User Already exist.', 4000);
        } else {
          dispatch(LoadingStartAction());
          Createuser(payload.payload)
            .then(data => {
              dispatch(LoadingStopAction());
              if (!!data) {
                payload.navigation.goBack();
                ToastAndroid.show('User successfully created.', 4000);
              } else {
                ToastAndroid.show('Error occure.please try again.', 4000);
              }
            })
            .catch(err => {
              dispatch(LoadingStopAction());
              ToastAndroid.show('Error occure.please try again.', 10000);
            });
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  };
};

export const UserSignupSuccessAction = () => {
  return {type: UserActionTypes.User_SignUp_Success_Action};
};

export const LoadingStartAction = () => {
  return {type: UserActionTypes.Loading_Start_Action};
};

export const LoadingStopAction = () => {
  return {type: UserActionTypes.Loading_Stop_Action};
};

export const LogOutAction = () => {
  return {type: UserActionTypes.LogOut_Action};
};

export const CreateProject = (payload: Project) => {
  return (dispatch: any, getState: any) => {
    dispatch(LoadingStartAction());
    return projectCreate(payload)
      .then(response => {
        dispatch(LoadingStopAction());
        if (!!response) {
          dispatch(HomeLoadAction(payload.user_id));
          ToastAndroid.show('Project Successfully Created', 4000);
        } else {
          ToastAndroid.show('Something wrong please try again.', 4000);
        }
      })
      .catch((error: any) => {
        console.log(error);
        ToastAndroid.show('Something wrong please try again.', 4000);
      });
  };
};

export const HomeLoadAction = (payload: number) => {
  return (dispatch: any, getState: any) => {
    dispatch(LoadingStartAction());
    return GetMyProjects(payload)
      .then(response => {
        dispatch(LoadingStopAction());
        dispatch(HomeLoad2Action(payload));
        let newData: Project[] = [];
        if (!!response && response != null && !!response?._snapshot?.value) {
          for (let i = 0; i < response?._snapshot?.childKeys.length; i++) {
            newData.push(
              response?._snapshot?.value[
                Object.keys(response?._snapshot?.value)[i]
              ],
            );
          }
          dispatch(HomeLoadSuccessAction(newData));
        } else {
          dispatch(HomeLoad2Action(payload));
          ToastAndroid.show('No project found.', 4000);
        }
      })
      .catch((error: any) => {
        dispatch(HomeLoad2Action(payload));
        console.log(error);
        ToastAndroid.show('Error encounter.please try again.', 4000);
      });
  };
};

export const HomeLoadSuccessAction = (payload: any) => {
  return {type: UserActionTypes.Home_Load_Success_Action, payload: payload};
};

export const GetAllUserAction = () => {
  return (dispatch: any, getState: any) => {
    dispatch(LoadingStartAction());
    return GetAllUser()
      .then(response => {
        dispatch(LoadingStopAction());
        let newData: userCreateModel[] = [];
        if (!!response && response != null && !!response?._snapshot?.value) {
          for (let i = 0; i < response?._snapshot?.childKeys.length; i++) {
            newData.push(
              response?._snapshot?.value[
                Object.keys(response?._snapshot?.value)[i]
              ],
            );
          }
          dispatch(GetAllUserSuccessAction(newData));
        } else {
          ToastAndroid.show('No user found.', 4000);
        }
      })
      .catch((error: any) => {
        console.log(error);
        ToastAndroid.show('Error encounter.please try again.', 4000);
      });
  };
};

export const GetAllUserSuccessAction = (payload: any) => {
  return {type: UserActionTypes.Get_All_User_Action, payload: payload};
};

export const CreateTaskAction = (payload: any) => {
  return (dispatch: any, getState: any) => {
    dispatch(LoadingStartAction());
    return CreateTask(payload.task)
      .then(response => {
        dispatch(LoadingStopAction());
        if (!!response) {
          payload.navigation.goBack();
          ToastAndroid.show('Task Successfully Created', 4000);
        } else {
          ToastAndroid.show('Something wrong please try again.', 4000);
        }
      })
      .catch((error: any) => {
        console.log(error);
        ToastAndroid.show('Something wrong please try again.', 4000);
      });
  };
};

export const ProjectDetailsLoadAction = (payload: number) => {
  return (dispatch: any, getState: any) => {
    dispatch(LoadingStartAction());
    return GetTaskByProject(payload)
      .then(response => {
        dispatch(LoadingStopAction());
        let newData: Project[] = [];
        if (!!response && response != null && !!response?._snapshot?.value) {
          for (let i = 0; i < response?._snapshot?.childKeys.length; i++) {
            newData.push(
              response?._snapshot?.value[
                Object.keys(response?._snapshot?.value)[i]
              ],
            );
          }
          dispatch(ProjectDetailsLoadSuccess(newData));
        } else {
          ToastAndroid.show('No task found.', 4000);
        }
      })
      .catch((error: any) => {
        console.log(error);
        ToastAndroid.show('Error encounter.please try again.', 4000);
      });
  };
};

export const ProjectDetailsLoadSuccess = (payload: any) => {
  return {type: UserActionTypes.Get_Task_By_Project, payload: payload};
};

export const HomeLoad2Action = (payload: number) => {
  return (dispatch: any, getState: any) => {
    dispatch(LoadingStartAction());
    return GetTaskByUser(payload)
      .then(response => {
        dispatch(LoadingStopAction());
        let newData: Project[] = [];
        if (!!response && response != null && !!response?._snapshot?.value) {
          for (let i = 0; i < response?._snapshot?.childKeys.length; i++) {
            newData.push(
              response?._snapshot?.value[
                Object.keys(response?._snapshot?.value)[i]
              ],
            );
          }
          dispatch(HomeLoad2SuccessAction(newData));
        } else {
          ToastAndroid.show('No task found', 4000);
        }
      })
      .catch((error: any) => {
        console.log(error);
        ToastAndroid.show('Error encounter.please try again.', 4000);
      });
  };
};

export const HomeLoad2SuccessAction = (payload: any) => {
  return {type: UserActionTypes.Home_Load_2_Success_Action, payload: payload};
};

export const TaskStatusUpdateAction = (payload: TasksUpdate) => {
  return (dispatch: any, getState: any) => {
    dispatch(LoadingStartAction());
    return updateStatus(payload)
      .then(response => {
        dispatch(LoadingStopAction());
        if (payload.from == 1 && payload?.user_id) {
          dispatch(HomeLoadAction(payload.user_id));
        } else if (payload.project_id) {
          dispatch(ProjectDetailsLoadAction(payload.project_id));
        }
      })
      .catch((error: any) => {
        console.log(error);
        ToastAndroid.show('Error encounter.please try again.', 4000);
      });
  };
};
