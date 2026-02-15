
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const TASKS_FILE = path.join(__dirname, 'tasks.json');

// Initialize tasks file if it doesn't exist
function initTasksFile() {
  if (!fs.existsSync(TASKS_FILE)) {
    fs.writeFileSync(TASKS_FILE, JSON.stringify([], null, 2));
  }
}

// Read tasks from file
function readTasks() {
  const data = fs.readFileSync(TASKS_FILE, 'utf8');
  return JSON.parse(data);
}

// Write tasks to file
function writeTasks(tasks) {
  fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));
}

// Add a new task
function addTask(description) {
  const tasks = readTasks();
  const newTask = {
    id: Date.now(),
    description,
    completed: false,
    createdAt: new Date().toISOString()
  };
  tasks.push(newTask);
  writeTasks(tasks);
  console.log(`✅ Task added: "${description}" (ID: ${newTask.id})`);
}

// List all tasks
function listTasks(filter = 'all') {
  const tasks = readTasks();
  let filteredTasks = tasks;

  if (filter === 'completed') {
    filteredTasks = tasks.filter(t => t.completed);
  } else if (filter === 'pending') {
    filteredTasks = tasks.filter(t => !t.completed);
  }

  if (filteredTasks.length === 0) {
    console.log('📭 No tasks found.');
    return;
  }

  console.log('\n📋 Tasks:\n');
  filteredTasks.forEach(task => {
    const status = task.completed ? '✓' : '○';
    const date = new Date(task.createdAt).toLocaleDateString();
    console.log(`[${status}] ${task.id} - ${task.description} (${date})`);
  });
  console.log('');
}

// Mark task as complete
function completeTask(id) {
  const tasks = readTasks();
  const task = tasks.find(t => t.id === parseInt(id));
  
  if (!task) {
    console.log('❌ Task not found.');
    return;
  }

  task.completed = true;
  task.completedAt = new Date().toISOString();
  writeTasks(tasks);
  console.log(`✅ Task completed: "${task.description}"`);
}

// Delete a task
function deleteTask(id) {
  const tasks = readTasks();
  const filteredTasks = tasks.filter(t => t.id !== parseInt(id));
  
  if (tasks.length === filteredTasks.length) {
    console.log('❌ Task not found.');
    return;
  }

  writeTasks(filteredTasks);
  console.log(`🗑️  Task deleted (ID: ${id})`);
}

// Main CLI handler
function main() {
  initTasksFile();
  
  const args = process.argv.slice(2);
  const command = args[0];

  switch (command) {
    case 'add':
      const description = args.slice(1).join(' ');
      if (!description) {
        console.log('❌ Please provide a task description.');
        return;
      }
      addTask(description);
      break;

    case 'list':
      const filter = args[1] || 'all';
      listTasks(filter);
      break;

    case 'complete':
      if (!args[1]) {
        console.log('❌ Please provide a task ID.');
        return;
      }
      completeTask(args[1]);
      break;

    case 'delete':
      if (!args[1]) {
        console.log('❌ Please provide a task ID.');
        return;
      }
      deleteTask(args[1]);
      break;

    case 'help':
    default:
      console.log(`
📝 Task Manager CLI

Usage:
  node task-manager.js <command> [arguments]

Commands:
  add <description>     Add a new task
  list [filter]         List tasks (all/completed/pending)
  complete <id>         Mark a task as completed
  delete <id>           Delete a task
  help                  Show this help message

Examples:
  node task-manager.js add Buy groceries
  node task-manager.js list pending
  node task-manager.js complete 1234567890
  node task-manager.js delete 1234567890
      `);
  }
}

main();
