import { NoteBox } from "./writer.js";
import { NoteContainer } from "./writer.js";


// Adding note logic
const container = document.getElementById("notes-container");
const noteContainer = new NoteContainer(container);

document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById("add-note");

    if (addButton) {
        addButton.addEventListener('click', () => {
            noteContainer.newNote();
        })
    };

});

// todo: Load notes from local storage

window.addEventListener('load', () => {
    noteContainer.loadNotes()
})