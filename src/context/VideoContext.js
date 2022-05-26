import { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";
import { videoReducer } from "../reducers";
import { useAuth } from "../context/AuthContext";
import {
  getLikedVideosService,
  getHistoryService,
  getWatchLaterService,
} from "../services";

const initialState = {
  videos: [],
  history: [],
  likedVideos: [],
  watchLater: [],
  notes: [],
  filters: {
    category: "All",
    search: "",
  },
  loading: false,
  error: null,
};

const VideoContext = createContext(initialState);

const VideoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(videoReducer, initialState);
  const {
    state: { token },
  } = useAuth();

  useEffect(() => {
    dispatch({ type: "LOADING" });
    (async () => {
      try {
        const { data, status } = await axios.get("/api/videos");
        if (status === 200) {
          dispatch({ type: "LOAD_ALL_VIDEOS", payload: data.videos });
        }
      } catch (error) {
        dispatch({ type: "ERROR", payload: error });
      }
    })();
  }, []);

  useEffect(() => {
    token && getLikedVideosService(token, dispatch);
    token && getHistoryService(token, dispatch);
    token && getWatchLaterService(token, dispatch);
  }, [token]);

  return (
    <VideoContext.Provider value={{ state, dispatch }}>
      {children}
    </VideoContext.Provider>
  );
};

const useVideoContext = () => useContext(VideoContext);

export { VideoProvider, useVideoContext };
