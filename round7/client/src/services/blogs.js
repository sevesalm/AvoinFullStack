import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = newToken => {
  token = newToken;
};

const getAll = async () => {
  const result = await axios.get(baseUrl);
  return result.data;
};

const create = async newBlog => {
  const config = {
    headers: { Authorization: `bearer ${token}` }
  };
  const result = await axios.post(baseUrl, newBlog, config);
  return result.data;
};

const update = async (id, updatedBlog) => {
  const result = await axios.put(`${baseUrl}/${id}`, updatedBlog);
  return result.data;
};

const deleteBlog = async id => {
  const config = {
    headers: { Authorization: `bearer ${token}` }
  };
  await axios.delete(`${baseUrl}/${id}`, config);
};

export default { setToken, getAll, create, update, deleteBlog };
