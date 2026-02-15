
# CLI Task Manager

A lightweight, zero-dependency command-line task manager built with Node.js. Manage your daily tasks directly from your terminal with persistent local storage.

## Features

- 📝 **Task Management**: Add, list, complete, and delete tasks with ease.
- 📁 **Persistent Storage**: Tasks are saved to a local `tasks.json` file.
- 🎯 **Filtering**: View all tasks or filter by `completed` or `pending` status.
- 🕐 **Timestamps**: Automatically tracks when tasks are created.
- 🚀 **Zero Dependencies**: Built using only native Node.js modules.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/cli-task-manager.git
   ```

2. Navigate to the project directory:
   ```bash
   cd cli-task-manager
   ```

3. (Optional) Link the package to use it as a global command:
   ```bash
   npm link
   ```

## Usage

If you haven't linked the package, run the script using `node task-manager.js`. If you have linked it, you can use the `tasks` command.

### Add a Task
```bash
node task-manager.js add "Finish my portfolio website"
```

### List Tasks
```bash
# View all tasks
node task-manager.js list

# View only pending tasks
node task-manager.js list pending

# View only completed tasks
node task-manager.js list completed
```

### Complete a Task
```bash
node task-manager.js complete <task-id>
```

### Delete a Task
```bash
node task-manager.js delete <task-id>
```

## Project Structure

- `task-manager.js`: The main logic for the CLI and file operations.
- `tasks.json`: (Auto-generated) Stores your task data.
- `package.json`: Project metadata and configuration.

## License

This project is licensed under the MIT License.

