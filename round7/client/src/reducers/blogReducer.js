import blogService from '../services/blogs';
const initialState = null;

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.blogs;
    case 'UPDATE_BLOG':
      return state.map(blog => (blog.id === action.id ? action.blog : blog));
    case 'DELETE_BLOG':
      return state.filter(blog => blog.id !== action.id);
    default:
      return state;
  }
};

export const blogActions = {
  initBlogs() {
    return async dispatch => {
      const blogs = await blogService.getAll();
      return dispatch({
        type: 'INIT_BLOGS',
        blogs
      });
    };
  },

  updateBlog(id, updatedBlog) {
    return async dispatch => {
      const blog = await blogService.update(id, updatedBlog);
      return dispatch({
        type: 'UPDATE_BLOG',
        id,
        blog
      });
    };
  },

  deleteBlog: id => async dispatch => {
    await blogService.deleteBlog(id);
    return dispatch({
      type: 'DELETE_BLOG',
      id
    });
  }
};

export default reducer;
