import axios from "axios";
import toast from "react-hot-toast";
import {
  ADD_VIDEO_TO_PLAYLIST,
  CREATE_PLAYLIST,
  DELETE_PLAYLIST,
  DELETE_VIDEO_FROM_PLAYLIST,
  ERROR,
  GET_ALL_PLAYLISTS,
  LOADING,
} from "../../reducers/actions";

export const getAllPlaylistsService = async (token, dispatch) => {
  dispatch({ type: LOADING });
  try {
    const { data, status } = await axios.get("/api/user/playlists", {
      headers: { authorization: token },
    });
    if (status === 200) {
      dispatch({ type: GET_ALL_PLAYLISTS, payload: data.playlists });
    }
  } catch (error) {
    dispatch({ type: ERROR, payload: error.response });
  }
};

export const createPlaylistService = async (title, token, dispatch) => {
  const toastId = toast.loading("Creating playlist...");
  try {
    const { data, status } = await axios.post(
      "/api/user/playlists",
      {
        playlist: { title: title },
      },
      {
        headers: { authorization: token },
      }
    );
    if (status === 200 || status === 201) {
      toast.success("Playlist created successfully!", {
        id: toastId,
      });
      dispatch({ type: CREATE_PLAYLIST, payload: data.playlists });
    }
  } catch (error) {
    toast.error("Some error occured. Try Again.", {
      id: toastId,
    });
    dispatch({ type: ERROR, payload: error.response });
  }
};

export const deletePlaylistService = async (playlistId, token, dispatch) => {
  const toastId = toast.loading("Deleting playlist...");
  try {
    const { data, status } = await axios.delete(
      `/api/user/playlists/${playlistId}`,
      {
        headers: { authorization: token },
      }
    );
    if (status === 200) {
      toast.success("Playlist deleted successfully.", {
        id: toastId,
      });
      dispatch({ type: DELETE_PLAYLIST, payload: data.playlists });
    }
  } catch (error) {
    toast.error("Some error occured. Try Again.", {
      id: toastId,
    });
    dispatch({ type: ERROR, payload: error.response });
  }
};

export const addVideoToPlaylistService = async (
  playlistId,
  video,
  token,
  dispatch
) => {
  const toastId = toast.loading("Adding video to playlist...");
  try {
    const { data, status } = await axios.post(
      `/api/user/playlists/${playlistId}`,
      { video },
      {
        headers: { authorization: token },
      }
    );
    if (status === 200 || status === 201) {
      toast.success("Video added to playlist", {
        id: toastId,
      });
      dispatch({ type: ADD_VIDEO_TO_PLAYLIST, payload: data.playlist });
    }
  } catch (error) {
    toast.error("Some error occured. Try Again.", {
      id: toastId,
    });
    dispatch({ type: ERROR, payload: error.response });
  }
};

export const deleteVideoFromPlaylistService = async (
  playlistId,
  videoId,
  token,
  dispatch
) => {
  const toastId = toast.loading("Removing video...");
  try {
    const { data, status } = await axios.delete(
      `/api/user/playlists/${playlistId}/${videoId}`,
      {
        headers: { authorization: token },
      }
    );
    if (status === 200) {
      toast.success("Video removed successfully.", {
        id: toastId,
      });
      dispatch({ type: DELETE_VIDEO_FROM_PLAYLIST, payload: data.playlist });
    }
  } catch (error) {
    toast.error("Some error occured. Try Again.", {
      id: toastId,
    });
    dispatch({ type: ERROR, payload: error.response });
  }
};

export const toggleCheckbox = (
  isVideoAlreadyInPlaylist,
  playlistId,
  videoId,
  video,
  token,
  dispatch
) =>
  isVideoAlreadyInPlaylist
    ? deleteVideoFromPlaylistService(playlistId, videoId, token, dispatch)
    : addVideoToPlaylistService(playlistId, video, token, dispatch);
