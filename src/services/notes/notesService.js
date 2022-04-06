import axios from "axios";
import toast from "react-hot-toast";
import { ADD_NOTE, DELETE_NOTE, ERROR } from "../../reducers/actions";

export const addNoteService = async (videoId, content, token, dispatch) => {
  const toastId = toast.loading("Saving note...");
  try {
    const { data, status } = await axios.post(
      `/api/video/${videoId}`,
      {
        note: { content: content },
      },
      {
        headers: { authorization: token },
      }
    );
    if (status === 200 || status === 201) {
      toast.success("Note saved successfully!", {
        id: toastId,
      });
      dispatch({ type: ADD_NOTE, payload: data.video });
    }
  } catch (error) {
    toast.error("Some error occured. Try Again.", {
      id: toastId,
    });
    dispatch({ type: ERROR, payload: error.response });
  }
};

export const deleteNoteService = async (videoId, noteId, token, dispatch) => {
  const toastId = toast.loading("Deleting note...");
  try {
    const { data, status } = await axios.delete(
      `/api/video/${videoId}/${noteId}`,
      {
        headers: { authorization: token },
      }
    );
    if (status === 200) {
      toast.success("note deleted successfully.", {
        id: toastId,
      });
      dispatch({ type: DELETE_NOTE, payload: data.video });
    }
  } catch (error) {
    toast.error("Some error occured. Try Again.", {
      id: toastId,
    });
    dispatch({ type: ERROR, payload: error.response });
  }
};
