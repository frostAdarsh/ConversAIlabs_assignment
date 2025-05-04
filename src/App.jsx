import React, { useEffect, useState } from "react";
import supabase from "./superbase-client"; 

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

 
  const fetchNotes = async () => {
    const { data, error } = await supabase.from("NotesList").select("*");
    if (error) {
      console.error("Error fetching notes:", error.message);
    } else {
      setNotes(data);
    }
  };

  
  useEffect(() => {
    fetchNotes();
  }, []);

  
  const addNote = async () => {
    if (!newNote.trim()) return; 

    const { error } = await supabase
      .from("NotesList")
      .insert([{ name: newNote }]);

    if (error) {
      console.error("Error adding note:", error.message);
    } else {
      setNewNote("");
      fetchNotes(); 
    }
  };

  return (
    <div style={{ padding: "1rem", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Notes App</h1>
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="New note"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          style={{ marginRight: "0.5rem" }}
        />
        <button onClick={addNote}>Add Note</button>
      </div>

      <ul>
        {notes.map((note) => (
          <li key={note.id}>{note.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
