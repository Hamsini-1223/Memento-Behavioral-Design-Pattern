# Memento Design Pattern

A TypeScript implementation of the Memento behavioral design pattern using a text editor with undo/redo functionality.

## Overview

The Memento pattern captures and restores an object's internal state without violating encapsulation. This implementation demonstrates the pattern through an interactive text editor that supports undo and redo operations.

## Project Structure

```

├── src/
│   ├── models/
│   │   ├── textEditor.ts                # Originator: main text editor logic
│   │   └── editorSnapshot.ts            # Memento: stores editor state (snapshot)
│   │
│   ├── managers/
│   │   └── historyManager.ts            # Caretaker: manages undo/redo history
│   │
│   ├── commands/
│   │   └── editorCommands.ts            # Commands to modify editor state
│   │
│   └── demo.ts                          # Demo app showing memento + command pattern
│
├── README.md                            # Documentation
├── tsconfig.json                        # TypeScript configuration
└── package.json                         # Dependencies & scripts

```

## Installation

```bash
npm install
```

## Usage

**Interactive Mode**

```bash
npm run dev
```

**Quick Demo**

```bash
npm run demo
```

**Build Project**

```bash
npm run build
npm start
```

## Available Commands

| Command             | Description                   | Example       |
| ------------------- | ----------------------------- | ------------- |
| `write <text>`      | Write text at cursor position | `write Hello` |
| `delete <count>`    | Delete characters             | `delete 5`    |
| `cursor <position>` | Move cursor to position       | `cursor 10`   |
| `font <size>`       | Change font size              | `font 16`     |
| `undo`              | Undo last action              | `undo`        |
| `redo`              | Redo last undone action       | `redo`        |
| `show`              | Display current state         | `show`        |
| `history`           | Show history information      | `history`     |
| `clear`             | Clear editor content          | `clear`       |
| `quit`              | Exit application              | `quit`        |

## Architecture

- **TextEditor** (Originator) - Creates and restores snapshots
- **EditorSnapshot** (Memento) - Stores immutable state
- **HistoryManager** (Caretaker) - Manages snapshot history
- **Commands** - Implements Command pattern for operations

## Code Example

```typescript
// Basic usage example
const editor = new TextEditor();
const history = new HistoryManager();

// Save initial state
history.saveState(editor);

// Write some text
editor.write("Hello");
console.log(editor.getContent()); // "Hello"

// Save state and write more
history.saveState(editor);
editor.write(" World!");
console.log(editor.getContent()); // "Hello World!"

// Undo to previous state
history.undo(editor);
console.log(editor.getContent()); // "Hello"

// Redo the change
history.redo(editor);
console.log(editor.getContent()); // "Hello World!"
```

## Sample Output

```
🎉 Welcome to the Interactive Text Editor!
This demonstrates the Memento Design Pattern with undo/redo functionality.

====== Text Editor with Memento Pattern ======
Available commands:
  write <text>    - Write text at cursor position
  delete <count>  - Delete characters (default: 1)
  cursor <pos>    - Move cursor to position
  font <size>     - Change font size
  undo           - Undo last action
  redo           - Redo last undone action
  show           - Display current editor state
  history        - Show history information
  clear          - Clear editor content
  help           - Show this menu
  quit           - Exit the program
===============================================

Current editor state:
Content: ""
Cursor at position: 0
Font size: 12
---

Enter command: write Hello World
State saved. History size: 2
Executed: Write "Hello World"
Content: "Hello World"
Cursor at position: 11
Font size: 12
---

Enter command: undo
Undo successful
Content: ""
Cursor at position: 0
Font size: 12
---

Enter command: redo
Redo successful
Content: "Hello World"
Cursor at position: 11
Font size: 12
---
```

## Requirements

- Node.js 16.0+
- TypeScript 5.0+

## Built By

Ms Hamsini S
