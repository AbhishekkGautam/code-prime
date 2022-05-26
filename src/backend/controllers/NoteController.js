import { Response } from "miragejs";
import { requiresAuth } from "../utils/authUtils";
import { v4 as uuid } from "uuid";

export const getNotesHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  try {
    if (!user) {
      return new Response(
        404,
        {},
        {
          errors: ["The email you entered is not Registered. Not Found error"],
        }
      );
    }
    return new Response(200, {}, { notes: user.notes });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

export const addItemToNotes = function (schema, request) {
  const user = requiresAuth.call(this, request);
  try {
    if (!user) {
      return new Response(
        404,
        {},
        {
          errors: ["The email you entered is not Registered. Not Found error"],
        }
      );
    }
    const { videoId } = request.params;
    const { note } = JSON.parse(request.requestBody);
    user.notes.push({ ...note, _id: uuid(), videoId: videoId });
    return new Response(201, {}, { notes: user.notes });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

export const removeItemFromNotes = function (schema, request) {
  const user = requiresAuth.call(this, request);
  try {
    if (!user) {
      return new Response(
        404,
        {},
        {
          errors: ["The email you entered is not Registered. Not Found error"],
        }
      );
    }
    const { noteId } = request.params;
    const filteredNotes = user.notes.filter(item => item._id !== noteId);
    this.db.users.update({ notes: filteredNotes });
    return new Response(200, {}, { notes: filteredNotes });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};
