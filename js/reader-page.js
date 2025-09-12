import { NoteBox } from "./writer.js";
import { NoteContainer } from "./writer.js";
import { labels } from "../lang/messages/en/user.js";

// Setting page labels
document.title = labels.pageTitle;
document.getElementById("header-reader-title").textContent = labels.headerReaderTitle;
document.getElementById("home-link").textContent = labels.home;
document.getElementById("write-link").textContent = labels.writeNotes;
document.getElementById("time-stamp").textContent = labels.timeStampTitle;

// Load notes and disable editing
const container = document.getElementById("notes-container");
const noteContainer = new NoteContainer(container);

window.addEventListener('load', () => {
    noteContainer.loadNotes();
    noteContainer.disableEditing();
})