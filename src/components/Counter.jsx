/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */

import { Link, useHistory } from 'react-router-dom';

const Counter = ({ count, person, handleChange, arttir, besArttir }) => {
  const history = useHistory();

  console.log({ history });

  //   yönlendirme için
  /**
   * Link
   * Link özelliği, bir sayfaya yönlendirme işlemi yapar.
   * history.push('/');
   * history.push('/home');
   * history.push('/home/about');
   * history.goBack();
   */

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={() => history.push('/')}>Go Back</button>
      <div>
        <Link to="/">Go Back</Link>
        <input type="text" value={person.name} onChange={handleChange} />
      </div>
      <div>
        <button onClick={arttir}>1 arttır</button>
        <button onClick={besArttir}>5 arttır</button>
      </div>
    </div>
  );
};

// Counter.propTypes = {
//     count: PropTypes.number.isRequired

// }

// Counter.defaultProps = {
//     count: 0
// }

// https://www.npmjs.com/package/prop-types

export default Counter;
