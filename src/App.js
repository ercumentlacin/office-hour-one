/* eslint-disable react/button-has-type */
/* eslint-disable no-unused-vars */
import { fetchPosts } from 'agent';
import Article from 'components/Article';
import Counter from 'components/Counter';
import Post from 'components/Post';
import React, { useEffect, useMemo, useReducer, useState } from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  useHistory,
} from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import axios from '.pnpm/axios@0.21.4/node_modules/axios';

// useState
// useEffect
// useReducer
// useMemo

// usecallback
// useContext
// useRef

const initialState = {
  data: [],
  loading: true,
  error: null,
};

// constants
const LOADING = 'LOADING';
const ERROR = 'ERROR';
const SUCCESS = 'SUCCESS';

// actions
const fullfilled = (data) => ({
  type: SUCCESS,
  payload: data,
});
const failure = (error) => ({
  type: ERROR,
  payload: error,
});
const fetching = () => ({
  type: LOADING,
});

// REDUCER
function reducer(state, action) {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      };

    case ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case SUCCESS:
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

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { data: posts, loading, error } = state;

  useEffect(() => {
    const getPosts = async () => {
      dispatch(fetching());
      try {
        const { data } = await axios(
          'https://jsonplaceholder.typicode.com/posts'
        );
        dispatch(fullfilled(data));
      } catch (err) {
        dispatch(failure(err));
      }
    };

    getPosts();
  }, []);

  console.log('state', state);

  const [count, setCount] = useState(0);

  const arttir = () => setCount(count + 1);

  const besArttir = () => {
    for (let index = 0; index < 5; index += 1) {
      setCount((prev) => prev + 1);
    }
  };

  const [person, setPerson] = useState({
    name: 'ercu',
    age: 25,
  });

  const handleChange = ({ target }) =>
    setPerson((prev) => ({ ...prev, name: target.value }));

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <div>
            <Link to="/counter">Counter</Link>

            {loading && <div>loading...</div>}
            {posts.length > 0 &&
              posts.map((post) => <Post key={uuidv4()} {...post} />)}

            {error && <div>{error}</div>}
          </div>
        </Route>

        <Route path="/counter">
          <Counter
            count={count}
            arttir={arttir}
            besArttir={besArttir}
            person={person}
            handleChange={handleChange}
          />
        </Route>

        {/* dinamik sayfalar */}
        <Route path="/article/:articleId">
          <Article />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
