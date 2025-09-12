// TODO: Remove redundancy (modularize, maybe declare common classes in script.js instead?)
// TODO: Remove redundancy with serialization (Storing key as id in object is redundant)
// TODO: Do i rlly need NoteContainer.notes array since i'm just iterating through localstorage.length

import { labels } from "../lang/messages/en/user.js";


export class NoteBox {
    constructor(content = "", id = Date.now()) {
        this.noteID = id;
        this.content = content;

        this.textBox = document.createElement('textarea');
        this.textBox.placeholder = labels.preText;
        this.textBox.value = content;
        this.textBox.id = this.noteID;

        this.saveButton = document.createElement('button');
        this.saveButton.textContent = labels.saveButton;
        this.saveButton.className = "save-button";

        this.removeButton = document.createElement('button');
        this.removeButton.textContent = labels.removeButton;
        this.removeButton.className = "remove-button";
    }

}

export class NoteContainer {
    constructor(container) {
        this.container = container;

        // Autosave properties
        this.startAutoSave();
        this.timestampBox = document.getElementById('time-stamp');
    }

    saveNoteToStorage(note) {

        // Create JSON object to store (only id and content)
        const noteObj = {
            id: note.noteID,
            content: note.textBox.value
        }
        localStorage.setItem(note.noteID, JSON.stringify(noteObj));
        this.updateTimestamp();
        console.log(`Note ${note.noteID} saved.`);
    }

    removeNoteFromStorage(id) {
        localStorage.removeItem(id);
    }

    renderNote(note) {
        this.container.appendChild(note.textBox);
        // Button group container
        const buttonGroup = document.createElement('div');
        buttonGroup.className = "button-group";
        buttonGroup.appendChild(note.saveButton);
        buttonGroup.appendChild(note.removeButton);
        this.container.appendChild(buttonGroup);
        note.saveButton.addEventListener('click', () => {
            this.saveNoteToStorage(note);
        });
        note.removeButton.addEventListener('click', () => {
            this.removeNoteFromStorage(note.noteID);
            this.container.removeChild(note.textBox);
            this.container.removeChild(buttonGroup);
        });
    }

    // Creates and appends new note
    newNote() {
        const note = new NoteBox();
        this.renderNote(note);
    }

    // Load all notes from local storage
    loadNotes() {
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const jsonValue = localStorage.getItem(key);

            // Parse JSON string to object & extract content
            const jsonParsed = JSON.parse(jsonValue);
            const content = jsonParsed.content;

            // Create a new NoteBox for each saved note
            const note = new NoteBox(content, key);
            this.renderNote(note);
        }
    }

    disableEditing() {
        this.container.querySelectorAll('.save-button, .remove-button, textarea').forEach(elem => {
            elem.disabled = true; // Makes buttons unclickable & textarea read-only
        });
    }

    startAutoSave() {
        setInterval(() => {
            this.updateTimestamp();
            this.container.querySelectorAll('textarea').forEach(textarea => {
                const id = textarea.id;
                const noteObj = {
                    id: id,
                    content: textarea.value,
                };
                localStorage.setItem(id, JSON.stringify(noteObj));
            });
        }, 2000);
    }

    updateTimestamp() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        const formatted = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        this.timestampBox.textContent = `Last saved: ${formatted}`;
    }


}
