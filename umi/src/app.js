import { onReducer } from './commons/storage';

export const dva = {
  config: {
    onError(err) {
      err.preventDefault();
      console.error(err.message);
    },
    onReducer
  },
};
