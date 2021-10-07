/* eslint-disable react/button-has-type */
/* eslint-disable no-unused-vars */
import { useThemeContext } from 'context/ThemeContext';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const App = () => {
  const { theme, toggleTheme, themeStyle } = useThemeContext();

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <div style={{ ...themeStyle, minHeight: '100vh', padding: 20 }}>
            <h1>Şuanki tema: {theme}</h1>

            <div>
              <button onClick={toggleTheme}>Toggle Theme</button>
            </div>
          </div>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
