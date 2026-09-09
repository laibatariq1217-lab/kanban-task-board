let draggedCard = null;

function openModal() {
    document.getElementById('taskModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('taskModal').style.display = 'none';
}

function createTask() {
    const title = document.getElementById('taskTitle').value;
    const desc = document.getElementById('taskDesc').value;

    if (!title) return alert("Please enter a title");

    const card = document.createElement('div');
    card.className = 'card';
    card.draggable = true;
    card.ondragstart = drag;

    card.innerHTML = `
        <span class="delete-btn" onclick="this.parentElement.remove()">&times;</span>
        <h4 contenteditable="true" title="Click to edit">${title}</h4>
        <p contenteditable="true" title="Click to edit">${desc || 'No description'}</p>
    `;

    // Default: Pehle column (Incompleted) mein add ho
    const firstColumn = document.querySelector('.cards-container');
    firstColumn.appendChild(card);

    document.getElementById('taskTitle').value = '';
    document.getElementById('taskDesc').value = '';
    closeModal();
}

// Drag & Drop Functions
function allowDrop(e) {
    e.preventDefault();
}

function drag(e) {
    draggedCard = e.target;
}

function drop(e) {
    e.preventDefault();
    let target = e.target;
    
    // Tarja: Ensure targeting .cards-container or .column
    if (target.classList.contains('card')) {
        target = target.parentElement;
    } else if (target.classList.contains('column')) {
        target = target.querySelector('.cards-container');
    }
    
    if (target && target.classList.contains('cards-container')) {
        target.appendChild(draggedCard);
    }
}

// Add Dynamic List/Column
function addNewList() {
    const listName = prompt("Enter List Name:", "New Stage");
    if (!listName) return;

    const board = document.getElementById('board');
    const newCol = document.createElement('div');
    newCol.className = 'column';
    newCol.ondragover = allowDrop;
    newCol.ondrop = drop;

    newCol.innerHTML = `
        <h3 contenteditable="true">${listName}</h3>
        <div class="cards-container"></div>
    `;

    board.appendChild(newCol);
}