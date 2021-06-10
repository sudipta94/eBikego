import {StoreState} from '../../models/reduxModels';

const InitialState: StoreState = {
  user: {
    loading: false,
    user: undefined,
    project: [],
    userList: [],
    tasks: [],
    myTask: [],
  },
};
export default InitialState;
