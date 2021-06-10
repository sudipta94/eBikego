export interface userCreateModel {
  user_email: string;
  user_name: string;
  user_password: string;
  user_id: number;
}

export interface userLoginService {
  user_email: string;
  user_password: string;
}

export interface userModelMain {
  user?: userCreateModel;
  loading: boolean;
  project?: Project[];
  userList?: userCreateModel[];
  tasks?: Tasks[];
  myTask?: Tasks[];
}

export interface Project {
  project_name?: string;
  project_id?: number;
  user_id: number;
}

export interface Tasks {
  task_id: number;
  task_title?: string;
  task_desc?: string;
  date?: any;
  assign_to?: number;
  project_id?: number;
  status?: number;
}
export interface TasksUpdate {
  task_id: number;
  status?: number;
  from?: number;
  user_id?: number;
  project_id?: number;
}
