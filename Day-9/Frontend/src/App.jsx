import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  /* ===================== STATE ===================== */

  // All notes fetched from database
  const [notesData, setNotesData] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [editFormData, setEditFormData] = useState({
    title: "",
    description: "",
  });
  const [editNoteId, setEditNoteId] = useState(null);

  /* ===================== API CALLS ===================== */
  const fetchAllNotes = () => {
    axios.get("http://localhost:3000/api/v1/notes").then((res) => {
      setNotesData(res.data.notes);
    });
  };

  const handleDeleteNote = (noteId) => {
    axios.delete(`http://localhost:3000/api/v1/notes/${noteId}`).then(() => {
      fetchAllNotes();
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) return;
    axios.post("http://localhost:3000/api/v1/notes", formData).then(() => {
      setFormData({ title: "", description: "" });
      fetchAllNotes();
    });
  };

  const handleEditNote = (note) => {
    setEditNoteId(note._id);
    setEditFormData({
      title: note.title,
      description: note.description,
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!editFormData.title.trim() || !editFormData.description.trim()) return;
    axios
      .patch(`http://localhost:3000/api/v1/notes/${editNoteId}`, editFormData)
      .then(() => {
        setEditNoteId(null)
        console.log("updated");
        fetchAllNotes();
      });
  };

  /* ===================== EFFECTS ===================== */

  useEffect(() => {
    fetchAllNotes();
  }, []);

  /* ===================== UI ===================== */

  return (
    <div className="app">
      <h1 className="app-title">Create Card</h1>

      {/* ===== Form (Create / Edit) ===== */}
      <form onSubmit={(e) => handleSubmit(e)} className="card-form">
        <input
          type="text"
          placeholder="Enter title"
          className="input"
          value={formData.title}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              title: e.target.value,
            }))
          }
        />

        <textarea
          placeholder="Enter description"
          className="textarea"
          value={formData.description}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
        ></textarea>

        <button type="submit" className="btn">
          Save
        </button>
      </form>

      {/* ===== Notes List ===== */}
      <div className="cards-container">
        {notesData.map((note) => {
          return (
            <div key={note._id} className="card">
              {editNoteId === note._id ? (
                <form onSubmit={(e) => handleEditSubmit(e)} className="edit-form">
                  <div>
                    <label htmlFor="title">Title</label>
                    <input
                      type="text"
                      value={editFormData.title}
                      onChange={(e) =>
                        setEditFormData((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <label htmlFor="description">Description</label>
                    <textarea
                      value={editFormData.description}
                      onChange={(e) =>
                        setEditFormData((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                    ></textarea>
                  </div>
                  <button type="submit">Save</button>
                </form>
              ) : (
                <>
                  <h3 className="card-title">{note.title}</h3>
                  <p className="card-desc">{note.description}</p>

                  <button
                    onClick={() => handleDeleteNote(note._id)}
                    id="delete-btn"
                  >
                    Delete
                  </button>

                  <button onClick={() => handleEditNote(note)} id="edit-btn">
                    Edit
                  </button>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;

{
  /* <form className="edit-form">
              <div>
                <label htmlFor="title">Title</label>
                <input type="text" value={editForm.title}/>
              </div>
              <div>
                <label htmlFor="description">Description</label>
                <textarea value={editForm.description}></textarea>
              </div>
              <button type="submit">Save</button>
            </form> */
}
