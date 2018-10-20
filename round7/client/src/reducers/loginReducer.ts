import { LOCAL_STORAGE_USER_KEY } from '../App';
import loginService, { ICredentials } from '../services/login';
import { notificationActions } from './notificationReducer';
import { IUser } from './userReducer';

const initialState: IUser | null = null;

const loginReducer = (state: IUser | null = initialState, action: any) => {
  switch (action.type) {
    case 'LOGIN_USER':
      return action.user;
    case 'LOGOUT_USER':
      return null;
    default:
      return state;
  }
};

export const loginActions = {
  setUser(user: IUser) {
    return {
      type: 'LOGIN_USER',
      user
    };
  },

  loginUser(credentials: ICredentials) {
    return async (dispatch: any) => {
      let user;
      try {
        user = await loginService.login(credentials);
        window.localStorage.setItem(
          LOCAL_STORAGE_USER_KEY,
          JSON.stringify(user)
        );
        return dispatch(this.setUser(user));
      } catch (error) {
        window.localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
        return dispatch(
          notificationActions.showNotification({
            message: 'Invalid credentials',
            type: 'error'
          })
        );
      }
    };
  },

  logoutUser(name: string) {
    return (dispatch: any) => {
      window.localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
      dispatch(
        notificationActions.showNotification({
          message: `${name} has logged out`,
          type: 'info'
        })
      );
      dispatch({
        type: 'LOGOUT_USER'
      });
    };
  }
};

export default loginReducer;
