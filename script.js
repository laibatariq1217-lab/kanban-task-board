let taskIdCounter = 0;

function openModal() {
    document.getElementById('taskModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('taskModal').style.display = 'none';
}

function addTask() {
    const title = document.getElementById('title').value;
    const desc = document.getElementById('desc').value;
    const priority = document.getElementById('priority').value;
    const dueDate = document.getElementById('dueDate').value;

    if (!title) {
        alert("Please enter a task title!");
        return;
    }

    taskIdCounter++;
    const card = document.createElement('div');
    card.className = 'task-card';
    card.id = 'task-' + taskIdCounter;
    card.draggable = true;
    card.ondragstart = drag;

    card.innerHTML = `
        <h4>${title}</h4>
        <p>${desc}</p>
        <span class="tag ${priority}">${priority}</span>
        <p><small style="color: #666; display: block; margin-top: 5px;">Due: ${dueDate || 'No Date'}</small></p>
    `;

    document.getElementById('todo-list').appendChild(card);

    // Form clear aur modal close
    document.getElementById('title').value = '';
    document.getElementById('desc').value = '';
    closeModal();
}

// Drag and Drop Logic
function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    const draggedElement = document.getElementById(data);
    
    // Nearest task-list target dhundna
    let targetList = event.target;
    if (!targetList.classList.contains('task-list')) {
        targetList = targetList.closest('.column').querySelector('.task-list');
    }
    
    if (targetList) {
        targetList.appendChild(draggedElement);
    }
}