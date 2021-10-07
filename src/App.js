/* eslint-disable react/button-has-type */
/* eslint-disable no-unused-vars */
import Article from 'components/Article';
import Counter from 'components/Counter';
import { useThemeContext } from 'context/ThemeContext';
import React, { useEffect, useReducer, useState } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
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

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { data: posts, loading, error } = state;

  useEffect(() => {
    const getPosts = async () => {
      dispatch({ type: 'LOADING' });
      try {
        const { data } = await axios(
          'https://jsonplaceholder.typicode.com/posts'
        );
        dispatch({ type: 'SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'ERROR', payload: err });
      }
    };

    getPosts();
  }, []);

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

  const { toggleTheme, themeStyle } = useThemeContext();

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <div style={themeStyle}>
            <div>
              <button onClick={toggleTheme}>Toggle Theme</button>
            </div>

            <Link to="/counter">Counter</Link>

            {loading && <div>loading...</div>}
            {posts.length > 0 &&
              posts.map((post) => <div key={uuidv4()}>{post.title}</div>)}

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
