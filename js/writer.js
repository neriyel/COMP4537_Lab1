// TODO: Serialize local storage in JSON format
// TODO: Remove redundancy (modularize, maybe declare common classes in script.js instead?)
// TODO: Do i rlly need NoteContainer.notes array since i'm just iterating through localstorage.length

const pretext = "Start writing ... "

class NoteBox {
    constructor(content = "", id = Date.now()) {
        this.noteID = id;
        this.content = content;

        this.textBox = document.createElement('textarea');
        this.textBox.placeholder = pretext;
        this.textBox.value = content;
        this.textBox.id = this.noteID;

        this.saveButton = document.createElement('button');
        this.saveButton.textContent = "Save";

        this.removeButton = document.createElement('button');
        this.removeButton.textContent = "Remove";
    }

    saveNote() {
        const textarea = document.getElementById(this.noteID);
        const text = textarea.value;
        localStorage.setItem(this.noteID, text);
        console.log(`saved note ${this.noteID}: ${text}`);
    }

}

class NoteContainer {
    constructor(container) {
        this.container = container;
        this.notes = {};
    }

    // Removes note
    removeNote(id) {
        const noteBox = this.notes[id];
        if (noteBox) {
            this.container.removeChild(noteBox.textBox); // Must remove DOM elements
            this.container.removeChild(noteBox.saveButton);
            this.container.removeChild(noteBox.removeButton);
            delete this.notes[id];
            localStorage.removeItem(id);
        }
    }

    // Creates and appends new note
    newNote() {
        const note = new NoteBox();

        this.container.appendChild(note.textBox);
        this.container.appendChild(note.saveButton);
        this.container.appendChild(note.removeButton);
        note.saveButton.addEventListener('click', () => {
            note.saveNote();
        });
        note.removeButton.addEventListener('click', () => {
            this.removeNote(note.noteID);
        });
        this.notes[note.noteID] = note;
    }

    // Load all notes from local storage
    loadNotes() {
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const value = localStorage.getItem(key);

            // Create a new NoteBox for each saved note
            const note = new NoteBox(value, key);

            this.container.appendChild(note.textBox);
            this.container.appendChild(note.saveButton);
            this.container.appendChild(note.removeButton);

            // Hook up save/remove functionality
            note.saveButton.addEventListener('click', () => {
                note.saveNote();
            });
            note.removeButton.addEventListener('click', () => {
                this.removeNote(note.noteID);
            });

            this.notes[note.noteID] = note;
        }
    }

}


// Adding note logic
const container = document.getElementById("notes-container");
const noteContainer = new NoteContainer(container);

document.getElementById("add-note").addEventListener('click', () => {
    noteContainer.newNote();
})

// todo: Load notes from local storage
window.addEventListener('load', () => {
    noteContainer.loadNotes()
})