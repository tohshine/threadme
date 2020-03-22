import { JOIN } from '../action/types';

const initialState = {
  join: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case JOIN:
      return (state.join = action.payload);

    default:
      return state;
  }
};
