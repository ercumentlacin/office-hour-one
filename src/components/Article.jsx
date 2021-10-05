/* eslint-disable react/prop-types */
import { useEffect, useReducer } from 'react';
import { useParams, withRouter } from 'react-router-dom';

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

const Article = ({ history }) => {
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

  if (loading)
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        loading...
      </div>
    );

  return (
    <div
      style={{
        padding: 10,
        margin: 10,
      }}
    >
      {posts && posts.id}
      <br />
      <h1>{posts && posts.title}</h1>
      <p>{posts && posts.body}</p>
      <button type="button" onClick={() => history.goBack()}>
        Go Back
      </button>
      <button
        type="button"
        onClick={() => history.push(`/article/${Number(articleId) + 1}`)}
      >
        Next Article
      </button>

      {error && <div>{error}</div>}
    </div>
  );
};

export default withRouter(Article);
