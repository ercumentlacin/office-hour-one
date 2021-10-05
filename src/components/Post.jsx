/* eslint-disable react/prop-types */
import React from 'react';
import { withRouter } from 'react-router-dom';

const Post = ({ title, id, history }) => (
  <div
    aria-hidden="true"
    style={{
      padding: '10px',
      border: '1px solid black',
      margin: '10px',
    }}
    onClick={() => history.push(`/article/${id}`)}
  >
    <strong>{id}</strong>
    <h6>{title}</h6>
  </div>
);

export default withRouter(Post);
