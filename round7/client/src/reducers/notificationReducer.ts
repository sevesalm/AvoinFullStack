export interface INotification {
  message: string;
  type: string;
}
const initialState: INotification | null = null;

const reducer = (store: INotification | null = initialState, action: any) => {
  switch (action.type) {
    case 'UPDATE_NOTIFICATION':
      return {
        message: action.notification.message,
        type: action.notification.type
      };
    case 'CLEAR_NOTIFICATION':
      return null;
    default:
      return store;
  }
};

let timeout: any = null;

export const notificationActions = {
  updateNotification(notification: INotification) {
    return {
      notification,
      type: 'UPDATE_NOTIFICATION'
    };
  },
  clearNotification() {
    return {
      type: 'CLEAR_NOTIFICATION'
    };
  },
  showNotification(notification: INotification, delay = 20) {
    return async (dispatch: any) => {
      dispatch(this.updateNotification(notification));
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        dispatch(this.clearNotification());
        timeout = null;
      }, delay * 1000);
    };
  }
};

export default reducer;
