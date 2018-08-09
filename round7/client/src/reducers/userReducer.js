import userService from '../services/users';
const initialState = null;

const reducer = (store = initialState, action) => {
  switch (action.type) {
    case 'INIT_USERS':
      return action.users;
    default:
      return store;
  }
};

export const userActions = {
  initUsers() {
    return async dispatch => {
      const users = await userService.getAll();
      return dispatch({
        type: 'INIT_USERS',
        users
      });
    };
  }
};

export default reducer;
