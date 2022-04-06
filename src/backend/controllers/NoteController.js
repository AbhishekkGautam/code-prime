import { Response } from "miragejs";
import { requiresAuth } from "../utils/authUtils";
import { v4 as uuid } from "uuid";

// export const getNotesHandler = function (schema, request) {
//   const user = requiresAuth.call(this, request);
//   try {
//     if (!user) {
//       return new Response(
//         404,
//         {},
//         {
//           errors: ["The email you entered is not Registered. Not Found error"],
//         }
//       );
//     }
//     const { videoId } = request.params;
//     const video = schema.videos.findBy({ _id: videoId }).attrs;
//     return new Response(200, {}, { notes: video.notes });
//   } catch (error) {
//     return new Response(
//       500,
//       {},
//       {
//         error,
//       }
//     );
//   }
// };

export const addItemToNotes = function (schema, request) {
  const user = requiresAuth.call(this, request);
  if (user) {
    const { videoId } = request.params;
    const { note } = JSON.parse(request.requestBody);
    const video = schema.videos.findBy({ _id: videoId }).attrs;
    video.notes.push({ ...note, _id: uuid() });
    return new Response(201, {}, { video });
  }
  return new Response(
    404,
    {},
    {
      errors: ["The email you entered is not Registered. Not Found error"],
    }
  );
};

export const removeItemFromNotes = function (schema, request) {
  const user = requiresAuth.call(this, request);
  if (user) {
    const { videoId, noteId } = request.params;
    const video = schema.videos.findBy({ _id: videoId }).attrs;
    const filteredNotes = video.notes.filter(item => item._id !== noteId);
    this.db.videos.update({ notes: filteredNotes });
    video.notes = filteredNotes;
    return new Response(200, {}, { video });
  }
  return new Response(
    404,
    {},
    { errors: ["The user you request does not exist. Not Found error."] }
  );
};
