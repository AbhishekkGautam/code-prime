import {
  LOADING,
  ERROR,
  GET_ALL_PLAYLISTS,
  CREATE_PLAYLIST,
  DELETE_PLAYLIST,
  ADD_VIDEO_TO_PLAYLIST,
  DELETE_VIDEO_FROM_PLAYLIST,
} from "./actions";

export const playlistReducer = (state, { type, payload }) => {
  switch (type) {
    case LOADING:
      return { ...state, loading: true };
    case ERROR:
      return { ...state, loading: false, error: payload };
    case GET_ALL_PLAYLISTS:
      return { ...state, loading: false, playlists: payload };
    case CREATE_PLAYLIST:
      return { ...state, playlists: payload };
    case DELETE_PLAYLIST:
      return { ...state, playlists: payload };
    case ADD_VIDEO_TO_PLAYLIST:
      return {
        ...state,
        playlists: state.playlists.map(playlist =>
          playlist._id === payload._id ? payload : playlist
        ),
      };

    case DELETE_VIDEO_FROM_PLAYLIST:
      return {
        ...state,
        playlists: state.playlists.map(playlist =>
          playlist._id === payload._id ? payload : playlist
        ),
      };
    default:
      return state;
  }
};
