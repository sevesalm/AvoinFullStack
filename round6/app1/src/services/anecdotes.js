import axios from "axios";

const getAnecdotes = async () => {
  const result = await axios.get("http://localhost:3001/anecdotes");
  return result.data;
};

const create = async anecdote => {
  const result = await axios.post("http://localhost:3001/anecdotes", anecdote);
  return result.data;
};

const update = async (id, anecdote) => {
  const result = await axios.put(
    `http://localhost:3001/anecdotes/${id}`,
    anecdote
  );
  return result.data;
};

export default { getAnecdotes, create, update };
