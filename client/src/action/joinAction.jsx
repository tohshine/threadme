import { JOIN } from './types';

export const joinRoom = details => dispatch => {
  dispatch({
    type: JOIN,
    payload: details
  });
};

