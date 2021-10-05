import { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';

import axios from '.pnpm/axios@0.21.4/node_modules/axios';

const initialState = {
  data: [],
  loading: true,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'LOADING':
      return {
        ...state,
        loading: true,
      };

    case 'ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case 'SUCCESS':
      return {
        ...state,
        data: action.payload,
        error: null,
        loading: false,
      };

    default:
      return state;
  }
}

const Article = () => {
  const { articleId } = useParams();

  const [state, dispatch] = useReducer(reducer, initialState);

  const { data: posts, loading, error } = state;

  useEffect(() => {
    const getPosts = async () => {
      dispatch({ type: 'LOADING' });
      try {
        const { data } = await axios(
          `https://jsonplaceholder.typicode.com/posts/${articleId}`
        );
        dispatch({ type: 'SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'ERROR', payload: err });
      }
    };

    getPosts();
  }, [articleId]);

  console.log(posts);

  return (
    <div>
      {loading && <div>loading...</div>}
      {posts && posts.id}
      <br />
      {posts && posts.title}

      {error && <div>{error}</div>}
    </div>
  );
};

export default Article;
