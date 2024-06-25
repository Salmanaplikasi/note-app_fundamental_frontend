// Definisi class untuk custom component add-note-button
class AddNoteButton extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
      <i class="uil uil-plus"></i>
    `;
  }
}

// Definisi class untuk custom component popup-box
class PopupBox extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
      <popup class="popup">
        <content class="content">
          <header>
            <p></p>
            <i class="uil uil-times"></i>
          </header>
          <form id="noteForm">
            <div class="row title">
              <label>Title</label>
              <input type="text" id="noteTitle" spellcheck="false">
            </div>
            <div class="row description">
              <label>Description</label>
              <textarea id="noteDescription" spellcheck="false"></textarea>
            </div>
            <button type="submit">Add Note</button>
          </form>
        </content>
      </popup>
    `;
  }
}

// Definisi class untuk custom component note-list
class NoteList extends HTMLElement {
  constructor() {
    super();
    // Tidak perlu mendefinisikan konten HTML pada constructor,
    // karena konten akan ditambahkan secara dinamis menggunakan JavaScript
  }
}

// Registrasi custom elements
customElements.define('add-note-button', AddNoteButton);
customElements.define('popup-box', PopupBox);
customElements.define('note-list', NoteList);

// Data dummy catatan
const notesData = [
  {
    id: 'notes-jT-jjsyz61J8XKiI',
    title: 'Welcome to Notes, Dimas!',
    body: 'Welcome to Notes! This is your first note. You can archive it, delete it, or create new ones.',
    createdAt: '2022-07-28T10:03:12.594Z',
    archived: false,
  },
  {
    id: 'notes-aB-cdefg12345',
    title: 'Meeting Agenda',
    body: 'Discuss project updates and assign tasks for the upcoming week.',
    createdAt: '2022-08-05T15:30:00.000Z',
    archived: false,
  },
  {
    id: 'notes-XyZ-789012345',
    title: 'Shopping List',
    body: 'Milk, eggs, bread, fruits, and vegetables.',
    createdAt: '2022-08-10T08:45:23.120Z',
    archived: false,
  },
  // Masukkan catatan lainnya di sini...
];

// Function to display notes
function displayNotes() {
  const noteList = document.getElementById('noteList');
  noteList.innerHTML = ''; // Clear previous content

  notesData.forEach(note => {
    const noteDiv = document.createElement('div');
    noteDiv.classList.add('note');
    noteDiv.innerHTML = `
      <h3>${note.title}</h3>
      <p>${note.body}</p>
    `;

    // Add click event listener to show details of the clicked note
    noteDiv.addEventListener('click', () => {
      alert(`Title: ${note.title}\nDescription: ${note.body}`);
    });

    noteList.appendChild(noteDiv);
  });
}

// Function to add a new note
function addNote() {
  const noteTitle = document.getElementById('noteTitle').value;
  const noteBody = document.getElementById('noteDescription').value;

  // Check if title and body are not empty
  if (noteTitle.trim() !== '' && noteBody.trim() !== '') {
    // Generate a unique ID for the new note (for simplicity, you can use a library like UUID)
    const id = 'notes-' + Math.random().toString(36).substr(2, 9);
    const createdAt = new Date().toISOString();

    // Create a new note object
    const newNote = {
      id,
      title: noteTitle,
      body: noteBody,
      createdAt,
      archived: false,
    };

    // Add the new note to the notesData array
    notesData.push(newNote);

    // Display the updated list of notes
    displayNotes();

    // Clear the input fields
    document.getElementById('noteTitle').value = '';
    document.getElementById('noteDescription').value = '';
  } else {
    alert('Please enter both title and body for the note.');
  }
}

// Display the initial list of notes when the page loads
displayNotes();

// Toggle popup box visibility when add note button is clicked
document.querySelector('add-note-button').addEventListener('click', () => {
  document.querySelector('.popup-box').classList.toggle('show-popup');
});

// Close popup box when the close button is clicked
document.querySelector('.popup-box .uil-times').addEventListener('click', () => {
  document.querySelector('.popup-box').classList.remove('show-popup');
});

// Prevent popup box from closing when clicking inside the content area
document.querySelector('.popup').addEventListener('click', (e) => {
  e.stopPropagation();
});

// Submit form when the Enter key is pressed
document.getElementById('noteForm').addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent default form submission
  addNote();
});
