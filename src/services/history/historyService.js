import axios from "axios";
import toast from "react-hot-toast";
import {
  GET_HISTORY,
  ADD_VIDEO_TO_HISTORY,
  DELETE_VIDEO_FROM_HISTORY,
  CLEAR_HISTORY,
  LOADING,
} from "../../reducers/actions";

export const getHistoryService = async (token, dispatch) => {
  dispatch({ type: LOADING });
  try {
    const { data, status } = await axios.get("/api/user/history", {
      headers: { authorization: token },
    });
    if (status === 200) {
      dispatch({ type: GET_HISTORY, payload: data.history });
    }
  } catch (error) {
    dispatch({ type: "ERROR", payload: error.response });
  }
};

export const addVideoToHistoryService = async (video, token, dispatch) => {
  try {
    const { data, status } = await axios.post(
      "/api/user/history",
      { video },
      {
        headers: { authorization: token },
      }
    );
    if (status === 200 || status === 201) {
      dispatch({ type: ADD_VIDEO_TO_HISTORY, payload: data.history });
    }
  } catch (error) {
    dispatch({ type: "ERROR", payload: error.response });
  }
};

export const deleteVideoFromHistoryService = async (
  videoId,
  token,
  dispatch
) => {
  const toastId = toast.loading("Deleting video from history...");
  try {
    const { data, status } = await axios.delete(
      `/api/user/history/${videoId}`,
      {
        headers: { authorization: token },
      }
    );
    if (status === 200) {
      toast.success("Video deleted from history.", {
        id: toastId,
      });
      dispatch({ type: DELETE_VIDEO_FROM_HISTORY, payload: data.history });
    }
  } catch (error) {
    toast.error("Some error occured. Try Again.", {
      id: toastId,
    });
    dispatch({ type: "ERROR", payload: error.response });
  }
};

export const clearHistoryService = async (token, dispatch) => {
  const toastId = toast.loading("Deleting the history...");
  try {
    const { data, status } = await axios.delete("/api/user/history/all", {
      headers: { authorization: token },
    });
    if (status === 200) {
      toast.success("History has been cleared.", {
        id: toastId,
      });
      dispatch({ type: CLEAR_HISTORY, payload: data.history });
    }
  } catch (error) {
    toast.error("Some error occured. Try Again.", {
      id: toastId,
    });
    dispatch({ type: "ERROR", payload: error.response });
  }
};
