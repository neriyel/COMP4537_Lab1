import { NoteBox } from "./writer.js";
import { NoteContainer } from "./writer.js";
import { labels } from "../lang/messages/en/user.js";


// Setting page labels
document.title = labels.pageTitle;
document.getElementById("header-writer-title").textContent = labels.headerWriterTitle;
document.getElementById("home-link").textContent = labels.home;
document.getElementById("read-link").textContent = labels.readNotes;
document.getElementById("add-note").textContent = labels.addNote;
document.getElementById("time-stamp").textContent = labels.timeStampTitle;

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

// todo: Load notes from local storag
window.addEventListener('load', () => {
    noteContainer.loadNotes()
})