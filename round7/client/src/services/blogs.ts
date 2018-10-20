import axios from 'axios';
const baseUrl = '/api/blogs';

const getAll = async () => {
  const result = await axios.get(baseUrl);
  return result.data;
};

const create = async (newBlog: any, token: string) => {
  const config = {
    headers: { Authorization: `bearer ${token}` }
  };
  const result = await axios.post(baseUrl, newBlog, config);
  return result.data;
};

const addComment = async (id: string, data: { comment: string }) => {
  const result = await axios.post(`${baseUrl}/${id}/comments`, data);
  return result.data;
};

const update = async (id: string, updatedBlog: any) => {
  const result = await axios.put(`${baseUrl}/${id}`, updatedBlog);
  return result.data;
};

const deleteBlog = async (id: string, token: string) => {
  const config = {
    headers: { Authorization: `bearer ${token}` }
  };
  await axios.delete(`${baseUrl}/${id}`, config);
};

export default { getAll, create, addComment, update, deleteBlog };
