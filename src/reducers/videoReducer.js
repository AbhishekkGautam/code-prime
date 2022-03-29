import { LOAD_ALL_VIDEOS, LOADING, ERROR } from "./actions";

export const videoReducer = (state, { type, payload }) => {
  switch (type) {
    case LOADING:
      return { ...state, loading: true };
    case ERROR:
      return { ...state, loading: false, error: payload };
    case LOAD_ALL_VIDEOS:
      return { ...state, loading: false, videos: payload };
    default:
      return state;
  }
};
