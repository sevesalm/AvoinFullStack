const initialState = null;

const reducer = (store = initialState, action) => {
  switch (action.type) {
    case "UPDATE_NOTIFICATION":
      return {
        message: action.notification.message,
        type: action.notification.type
      };
    case "CLEAR_NOTIFICATION":
      return null;
    default:
      return store;
  }
};

export const notificationActions = {
  timeout: null,
  updateNotification(notification) {
    return {
      type: "UPDATE_NOTIFICATION",
      notification
    };
  },
  clearNotification() {
    return {
      type: "CLEAR_NOTIFICATION"
    };
  },
  showNotification(notification, delay = 2) {
    return async dispatch => {
      dispatch(this.updateNotification(notification));
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      this.timeout = setTimeout(() => {
        dispatch(this.clearNotification());
        this.timeout = null;
      }, delay * 1000);
    };
  }
};

export default reducer;
