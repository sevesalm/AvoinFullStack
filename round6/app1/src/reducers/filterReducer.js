const initialState = "";

const filterReducer = (store = initialState, action) => {
  switch (action.type) {
    case "UPDATE_FILTER":
      return action.filter;
    default:
      return store;
  }
};

export const filterActions = {
  update(filter) {
    return {
      type: "UPDATE_FILTER",
      filter
    };
  }
};

export default filterReducer;
