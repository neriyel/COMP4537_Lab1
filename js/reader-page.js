import { NoteBox } from "./writer.js";
import { NoteContainer } from "./writer.js";


// Load notes and disable editing
const container = document.getElementById("notes-container");
const noteContainer = new NoteContainer(container);

window.addEventListener('load', () => {
    noteContainer.loadNotes();
    noteContainer.disableEditing();
})