import { createContext, useContext, useReducer, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { playlistReducer } from "../reducers";
import { getAllPlaylistsService } from "../services/playlist/playlistService";

const initialState = {
  playlists: [],
  loading: false,
  error: null,
};

const PlaylistContext = createContext(initialState);

const PlaylistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(playlistReducer, initialState);
  const {
    state: { token },
  } = useAuth();

  useEffect(() => {
    token && getAllPlaylistsService(token, dispatch);
  }, [token]);

  return (
    <PlaylistContext.Provider value={{ state, dispatch }}>
      {children}
    </PlaylistContext.Provider>
  );
};

const usePlaylist = () => useContext(PlaylistContext);

export { PlaylistProvider, usePlaylist };
