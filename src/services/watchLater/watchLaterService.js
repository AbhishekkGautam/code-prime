import axios from "axios";
import toast from "react-hot-toast";
import {
  ADD_VIDEO_TO_WATCH_LATER,
  DELETE_VIDEO_FROM_WATCH_LATER,
  ERROR,
  GET_WATCH_LATER,
  LOADING,
} from "../../reducers/actions";

export const getWatchLaterService = async (token, dispatch) => {
  dispatch({ type: LOADING });
  try {
    const { data, status } = await axios.get("/api/user/watchlater", {
      headers: { authorization: token },
    });
    if (status === 200) {
      dispatch({ type: GET_WATCH_LATER, payload: data.watchlater });
    }
  } catch (error) {
    dispatch({ type: ERROR, payload: error.response });
  }
};

export const addVideoToWatchLaterService = async (video, token, dispatch) => {
  const toastId = toast.loading("Adding video to watch later...");
  try {
    const { data, status } = await axios.post(
      "/api/user/watchlater",
      { video },
      {
        headers: { authorization: token },
      }
    );
    if (status === 200 || status === 201) {
      toast.success("Video added to watch later", {
        id: toastId,
      });
      dispatch({ type: ADD_VIDEO_TO_WATCH_LATER, payload: data.watchlater });
    }
  } catch (error) {
    dispatch({ type: ERROR, payload: error.response });
  }
};

export const deleteVideoFromWatchLaterService = async (
  videoId,
  token,
  dispatch
) => {
  const toastId = toast.loading("Deleting video from watch later...");
  try {
    const { data, status } = await axios.delete(
      `/api/user/watchlater/${videoId}`,
      {
        headers: { authorization: token },
      }
    );
    if (status === 200) {
      toast.success("Video deleted from watch later.", {
        id: toastId,
      });
      dispatch({
        type: DELETE_VIDEO_FROM_WATCH_LATER,
        payload: data.watchlater,
      });
    }
  } catch (error) {
    toast.error("Some error occured. Try Again.", {
      id: toastId,
    });
    dispatch({ type: ERROR, payload: error.response });
  }
};
