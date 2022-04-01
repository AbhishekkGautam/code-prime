import axios from "axios";
import toast from "react-hot-toast";

export const getLikedVideosService = async (token, dispatch) => {
  dispatch({ type: "LOADING" });
  try {
    const { data, status } = await axios.get("/api/user/likes", {
      headers: { authorization: token },
    });
    if (status === 200) {
      dispatch({ type: "GET_LIKED_VIDEOS", payload: data.likes });
    }
  } catch (error) {
    dispatch({ type: "ERROR", payload: error.response });
  }
};

export const likeVideoService = async (video, token, dispatch) => {
  const toastId = toast.loading("Adding video to liked list...");
  try {
    const { data, status } = await axios.post(
      "/api/user/likes",
      { video },
      {
        headers: { authorization: token },
      }
    );
    if (status === 200 || status === 201) {
      toast.success("Video added to liked list", {
        id: toastId,
      });
      dispatch({ type: "LIKE_VIDEO", payload: data.likes });
    }
  } catch (error) {
    toast.error("Some error occured. Try Again.", {
      id: toastId,
    });
    dispatch({ type: "ERROR", payload: error.response });
  }
};

export const dislikeVideoService = async (videoId, token, dispatch) => {
  const toastId = toast.loading("Deleting video from liked list...");
  try {
    const { data, status } = await axios.delete(`/api/user/likes/${videoId}`, {
      headers: { authorization: token },
    });
    if (status === 200) {
      toast.success("Video deleted from liked list.", {
        id: toastId,
      });
      dispatch({ type: "DISLIKE_VIDEO", payload: data.likes });
    }
  } catch (error) {
    toast.error("Some error occured. Try Again.", {
      id: toastId,
    });
    dispatch({ type: "ERROR", payload: error.response });
  }
};

export const toggleLike = (isVideoAlreadyLiked, token, video, id, dispatch) =>
  isVideoAlreadyLiked
    ? dislikeVideoService(id, token, dispatch)
    : likeVideoService(video, token, dispatch);
