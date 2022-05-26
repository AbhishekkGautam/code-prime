import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useVideoContext } from "../../context/VideoContext";
import { addNoteService, deleteNoteService } from "../../services";
import "./VideoNotes.css";

export const VideoNotes = ({ notes, videoId }) => {
  const [noteContent, setNoteContent] = useState("");

  const {
    state: { token, isLoggedIn },
  } = useAuth();
  const { dispatch } = useVideoContext();

  const filteredNotes = notes.filter(note => note.videoId === videoId);

  return (
    <div className="">
      <p className="text-normal">Take Notes</p>
      {token && isLoggedIn ? (
        <>
          <textarea
            className="note-text-area"
            name="note"
            id="note"
            placeholder="write note here..."
            value={noteContent || ""}
            onChange={e => setNoteContent(e.target.value)}
          ></textarea>
          <button
            className="btn add-note-btn"
            onClick={() => {
              addNoteService(videoId, noteContent, token, dispatch);
              setNoteContent("");
            }}
          >
            Add Note
          </button>
          <hr />
          <p className="text-normal">All Notes</p>
          <div className="video-notes-list">
            {filteredNotes.length === 0 ? (
              <div className="user-feedback">No note available.</div>
            ) : (
              filteredNotes?.map(note => {
                return (
                  <div className="video-note" key={note._id}>
                    <p className="note-content">{note.content}</p>
                    <IoClose
                      className="delete-note-icon"
                      onClick={() =>
                        deleteNoteService(note._id, token, dispatch)
                      }
                    />
                  </div>
                );
              })
            )}
          </div>
        </>
      ) : (
        <div className="user-message-container">
          <h3>You're logged out.</h3>
          <p>Log in to take notes.</p>
          <Link className="btn btn-primary" to="/login">
            Login
          </Link>
        </div>
      )}
    </div>
  );
};
