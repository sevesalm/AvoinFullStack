import anecdoteService from "../services/anecdotes";

const reducer = (store = [], action) => {
  if (action.type === "VOTE") {
    const old = store.filter(a => a.id !== action.id);
    const voted = store.find(a => a.id === action.id);

    return [...old, { ...voted, votes: voted.votes + 1 }];
  }
  if (action.type === "CREATE") {
    return [...store, { ...action.anecdote }];
  }

  if (action.type === "INIT_ANECDOTES") {
    return action.anecdotes;
  }

  return store;
};

export const anecdoteActions = {
  voteAnecdote(anecdote) {
    return async dispatch => {
      await anecdoteService.update(anecdote.id, anecdote);
      return dispatch({
        type: "VOTE",
        id: anecdote.id
      });
    };
  },

  createAnecdote(anecdoteData) {
    return async dispatch => {
      const result = await anecdoteService.create(anecdoteData);
      return dispatch({
        type: "CREATE",
        anecdote: result
      });
    };
  },

  initAnecdotes() {
    return async dispatch => {
      const anecdotes = await anecdoteService.getAnecdotes();
      return dispatch({
        type: "INIT_ANECDOTES",
        anecdotes
      });
    };
  }
};

export default reducer;
