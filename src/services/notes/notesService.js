import axios from "axios";
import toast from "react-hot-toast";
import { GET_NOTE, ADD_NOTE, DELETE_NOTE, ERROR } from "../../reducers/actions";

export const getNotesService = async (token, dispatch) => {
  try {
    const { data, status } = await axios.get("/api/user/history", {
      headers: { authorization: token },
    });
    if (status === 200) {
      dispatch({ type: GET_NOTE, payload: data.history });
    }
  } catch (error) {
    dispatch({ type: ERROR, payload: error.response });
  }
};

export const addNoteService = async (videoId, content, token, dispatch) => {
  const toastId = toast.loading("Saving note...");
  try {
    const { data, status } = await axios.post(
      `/api/user/notes/${videoId}`,
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
      dispatch({ type: ADD_NOTE, payload: data.notes });
    }
  } catch (error) {
    toast.error("Some error occured. Try Again.", {
      id: toastId,
    });
    dispatch({ type: ERROR, payload: error.response });
  }
};

export const deleteNoteService = async (noteId, token, dispatch) => {
  const toastId = toast.loading("Deleting note...");
  try {
    const { data, status } = await axios.delete(`/api/user/notes/${noteId}`, {
      headers: { authorization: token },
    });
    if (status === 200) {
      toast.success("note deleted successfully.", {
        id: toastId,
      });
      dispatch({ type: DELETE_NOTE, payload: data.notes });
    }
  } catch (error) {
    toast.error("Some error occured. Try Again.", {
      id: toastId,
    });
    dispatch({ type: ERROR, payload: error.response });
  }
};
