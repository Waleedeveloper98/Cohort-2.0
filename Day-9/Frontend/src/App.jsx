import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [notesData, setNotesData] = useState([]);

  const fetchAllNotes = () => {
    axios.get("http://localhost:3000/api/notes").then((res) => {
      setNotesData(res.data.notes);
      console.log(res.data.notes);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, description } = e.target.elements;
    console.log(title.value, description.value);
    axios
      .post("http://localhost:3000/api/notes", {
        title: title.value,
        description: description.value,
      })
      .then((res) => {
        console.log(res.data);
        fetchAllNotes();
      });
  };

  const handleDeleteNote = (noteId) => {
    axios.delete(`http://localhost:3000/api/notes/${noteId}`).then((res) => {
      console.log(res.data);
      fetchAllNotes();
    });
  };

  useEffect(() => {
    fetchAllNotes();
  }, []);

  return (
    <div className="app">
      <h1 className="app-title">Create Card</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="card-form">
        <input
          name="title"
          type="text"
          placeholder="Enter title"
          className="input"
        />

        <textarea
          name="description"
          placeholder="Enter description"
          className="textarea"
        ></textarea>

        <button type="submit" className="btn">
          Submit
        </button>
      </form>

      {/* Cards Container */}
      <div className="cards-container">
        {notesData.map((note) => {
          return (
            <div className="card">
              <h3 className="card-title">{note.title}</h3>
              <p className="card-desc">{note.description}</p>
              <button onClick={() => handleDeleteNote(note._id)}>Delete</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
