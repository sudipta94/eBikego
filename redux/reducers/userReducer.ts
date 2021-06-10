import {StoreState} from '../../models/reduxModels';
import {userModelMain} from '../../models/userModel';
import {UserActionTypes} from '../actions/userAction';
import InitialState from './initialState';

const initialState: userModelMain = InitialState.user;

export default function UserReducer(
  state: userModelMain = initialState,
  action: any,
) {
  switch (action.type) {
    case UserActionTypes.User_Login_Success_Action:
      return {...state, user: action.payload};
    case UserActionTypes.Loading_Start_Action:
      return {...state, loading: true};
    case UserActionTypes.Loading_Stop_Action:
      return {...state, loading: false};
    case UserActionTypes.LogOut_Action:
      return {...initialState};
    case UserActionTypes.Home_Load_Success_Action:
      return {...state, project: action.payload};
    case UserActionTypes.Get_All_User_Action:
      return {...state, userList: action.payload};
    case UserActionTypes.Get_Task_By_Project:
      return {...state, tasks: action.payload};
    case UserActionTypes.Home_Load_2_Success_Action:
      return {...state, myTask: action.payload};
    default:
      return state;
  }
}
