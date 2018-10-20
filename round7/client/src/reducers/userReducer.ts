import userService from '../services/users';

export interface IUser {
  id: string;
  username: string;
  name: string;
  isAdult: boolean;
  blogs: any[];
  [propname: string]: any;
}

const initialState: IUser[] | null = null;

const reducer = (store: IUser[] | null = initialState, action: any) => {
  switch (action.type) {
    case 'INIT_USERS':
      return action.users;
    default:
      return store;
  }
};

export const userActions = {
  initUsers() {
    return async (dispatch: any) => {
      const users = await userService.getAll();
      return dispatch({
        type: 'INIT_USERS',
        users
      });
    };
  }
};

export default reducer;
