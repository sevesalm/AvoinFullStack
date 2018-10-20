import blogService from '../services/blogs';
import { IUser } from './userReducer';

export interface IBlog {
  author: string;
  title: string;
  url: string;
  likes: number;
  user: IUser;
  comments: string[];
  [propname: string]: any;
}

const initialState: IBlog[] | null = null;

const reducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.blogs;
    case 'UPDATE_BLOG':
      return state.map(
        (blog: IBlog) => (blog.id === action.id ? action.blog : blog)
      );
    case 'DELETE_BLOG':
      return state.filter((blog: IBlog) => blog.id !== action.id);
    case 'CREATE_BLOG':
      return state.concat(action.blog);
    default:
      return state;
  }
};

export const blogActions = {
  initBlogs() {
    return async (dispatch: any) => {
      const blogs = await blogService.getAll();
      return dispatch({
        blogs,
        type: 'INIT_BLOGS'
      });
    };
  },

  createBlog(newBlog: IBlog, token: string) {
    return async (dispatch: any) => {
      const result = await blogService.create(newBlog, token);
      return dispatch({
        blog: result,
        type: 'CREATE_BLOG'
      });
    };
  },

  updateBlog(id: string, updatedBlog: any) {
    return async (dispatch: any) => {
      const blog = await blogService.update(id, updatedBlog);
      return dispatch({
        blog,
        id,
        type: 'UPDATE_BLOG'
      });
    };
  },

  commentBlog(id: string, comment: string) {
    return async (dispatch: any) => {
      const blog = await blogService.addComment(id, { comment });
      return dispatch({
        blog,
        id,
        type: 'UPDATE_BLOG'
      });
    };
  },

  deleteBlog: (id: string, token: string) => async (dispatch: any) => {
    await blogService.deleteBlog(id, token);
    return dispatch({
      id,
      type: 'DELETE_BLOG'
    });
  }
};

export default reducer;
