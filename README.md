# Memento Design Pattern - TypeScript Implementation

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-16.0+-green)](https://nodejs.org/)
[![MIT License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

A clean, professional implementation of the Memento behavioral design pattern in TypeScript, demonstrated through an interactive text editor with undo/redo functionality.

## Overview

The Memento pattern captures and restores an object's internal state without violating encapsulation. This implementation provides a practical example using a text editor where users can undo and redo their actions.

## Features

- Complete undo/redo functionality
- Memory-efficient history management
- Interactive command-line interface
- Type-safe TypeScript implementation
- Integration with Command pattern
- Comprehensive error handling

## Installation

```bash
git clone <repository-url>
cd memento-pattern-typescript
npm install
```

## Usage

### Interactive Mode

```bash
npm run dev
```

### Quick Demo

```bash
npm run demo
```

### Build and Run

```bash
npm run build
npm start
```

## Available Commands

| Command             | Description                           | Example             |
| ------------------- | ------------------------------------- | ------------------- |
| `write <text>`      | Add text at cursor position           | `write Hello World` |
| `delete <count>`    | Delete specified number of characters | `delete 5`          |
| `cursor <position>` | Move cursor to position               | `cursor 10`         |
| `font <size>`       | Change font size                      | `font 16`           |
| `undo`              | Undo last action                      | `undo`              |
| `redo`              | Redo last undone action               | `redo`              |
| `show`              | Display current editor state          | `show`              |
| `history`           | Show history information              | `history`           |
| `clear`             | Clear editor content                  | `clear`             |
| `quit`              | Exit application                      | `quit`              |

## Architecture

The implementation follows the standard Memento pattern structure:

- **TextEditor** (Originator) - Creates and restores state snapshots
- **EditorSnapshot** (Memento) - Immutable state container
- **HistoryManager** (Caretaker) - Manages snapshot collection
- **Commands** - Integration with Command pattern for enhanced functionality

## Project Structure

```
├── TextEditor.ts        # Originator implementation
├── EditorCommands.ts    # Command pattern integration
├── HistoryManager.ts    # Caretaker implementation
├── demo.ts             # Interactive CLI application
├── package.json        # Project configuration
├── tsconfig.json       # TypeScript configuration
└── README.md           # Documentation
```

## Key Components

### TextEditor (Originator)

```typescript
class TextEditor {
  public createSnapshot(): EditorSnapshot;
  public restore(snapshot: EditorSnapshot): void;
  public write(text: string): void;
  public delete(count: number): void;
}
```

### HistoryManager (Caretaker)

```typescript
class HistoryManager {
  public saveState(editor: TextEditor): void;
  public undo(editor: TextEditor): boolean;
  public redo(editor: TextEditor): boolean;
}
```

### EditorSnapshot (Memento)

```typescript
class EditorSnapshot {
  private readonly content: string;
  private readonly cursorPosition: number;
  private readonly fontSize: number;
}
```

## Example Usage

```typescript
import { TextEditor } from "./TextEditor";
import { HistoryManager } from "./HistoryManager";

const editor = new TextEditor();
const history = new HistoryManager();

// Save initial state
history.saveState(editor);

// Make changes
editor.write("Hello World");
editor.setFontSize(16);

// Save state after changes
history.saveState(editor);

// Undo changes
history.undo(editor); // Returns to previous state
```

## Sample Output

### Interactive Mode Session

```bash
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

Enter command: font 16
State saved. History size: 3
Executed: Change font size to 16
Content: "Hello World"
Cursor at position: 11
Font size: 16
---

Enter command: delete 6
State saved. History size: 4
Executed: Delete 6 character(s)
Content: "Hello"
Cursor at position: 5
Font size: 16
---

Enter command: undo
Undo successful
Content: "Hello World"
Cursor at position: 11
Font size: 16
---

Enter command: undo
Undo successful
Content: "Hello World"
Cursor at position: 11
Font size: 12
---

Enter command: history
History: 4 snapshots, current index: 1
Commands executed: 3
Can undo: true
Can redo: true

Enter command: redo
Redo successful
Content: "Hello World"
Cursor at position: 11
Font size: 16
---
```

### Demo Mode Output

```bash
=== Quick Demo of Memento Pattern ===

1. After writing "Hello":
Content: "Hello"
Cursor at position: 5
Font size: 12
---

2. After writing " World!":
Content: "Hello World!"
Cursor at position: 12
Font size: 12
---

3. After changing font size:
Content: "Hello World!"
Cursor at position: 12
Font size: 16
---

4. Undoing changes:
Content: "Hello World!"
Cursor at position: 12
Font size: 12
---
Content: "Hello"
Cursor at position: 5
Font size: 12
---

5. Redoing changes:
Content: "Hello World!"
Cursor at position: 12
Font size: 12
---

=== Demo Complete ===
```

## Benefits

- **Encapsulation**: Object internals remain private
- **Flexibility**: Easy to add new state properties
- **Memory Management**: Configurable history size limits
- **Type Safety**: Full TypeScript support with strict typing
- **Extensibility**: Clean integration with other patterns

## Requirements

- Node.js 16.0 or higher
- TypeScript 5.0 or higher
- npm or yarn package manager

## Development

### Available Scripts

- `npm run dev` - Start development mode
- `npm run build` - Compile TypeScript
- `npm start` - Run compiled application
- `npm run demo` - Run pattern demonstration
- `npm run clean` - Remove build artifacts

### Configuration

The project uses strict TypeScript configuration with:

- Target: ES2020
- Strict mode enabled
- Declaration files generated
- Source maps included

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Built by

**Ms Hamsini S**

Created as a demonstration of the Memento design pattern implementation in TypeScript.
