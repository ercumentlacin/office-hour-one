import axios from 'axios';

// eslint-disable-next-line import/prefer-default-export
export const fetchPosts = async () => {
  try {
    const { data } = await axios('https://jsonplaceholder.typicode.com/posts');
    return {
      loading: false,
      error: null,
      data,
    };
  } catch (error) {
    return {
      loading: false,
      data: [],
      error,
    };
  }
};
