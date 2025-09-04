// src/demo.ts - Interactive Console Interface for Memento Pattern
import { TextEditor } from "./models/textEditor";
import { HistoryManager } from "./managers/historyManager";
import {
  WriteCommand,
  DeleteCommand,
  FormatCommand,
  EditorInvoker,
} from "./commands/editorCommands";
import * as readline from "readline";

// Helper function to safely get error message
function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
}

class TextEditorCLI {
  private editor: TextEditor;
  private history: HistoryManager;
  private invoker: EditorInvoker;
  private rl: readline.Interface;

  constructor() {
    try {
      this.editor = new TextEditor();
      this.history = new HistoryManager();
      this.invoker = new EditorInvoker();

      this.rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      this.history.saveState(this.editor);
    } catch (error) {
      console.error("CLI initialization failed:", getErrorMessage(error));
      process.exit(1);
    }
  }

  private showMenu(): void {
    console.log("\n====== Text Editor with Memento Pattern ======");
    console.log("Available commands:");
    console.log("  write <text>    - Write text at cursor position");
    console.log("  delete <count>  - Delete characters (default: 1)");
    console.log("  cursor <pos>    - Move cursor to position");
    console.log("  font <size>     - Change font size");
    console.log("  undo           - Undo last action");
    console.log("  redo           - Redo last undone action");
    console.log("  show           - Display current editor state");
    console.log("  history        - Show history information");
    console.log("  clear          - Clear editor content");
    console.log("  help           - Show this menu");
    console.log("  quit           - Exit the program");
    console.log("===============================================");
  }

  private processCommand(input: string): void {
    try {
      if (!input || typeof input !== "string") {
        console.log("Error: Invalid input");
        this.promptUser();
        return;
      }

      const parts = input.trim().split(" ");
      const command = parts[0].toLowerCase();
      const args = parts.slice(1);

      switch (command) {
        case "write":
          this.handleWriteCommand(args);
          break;

        case "delete":
          this.handleDeleteCommand(args);
          break;

        case "cursor":
          this.handleCursorCommand(args);
          break;

        case "font":
          this.handleFontCommand(args);
          break;

        case "undo":
          this.history.undo(this.editor);
          this.editor.show();
          break;

        case "redo":
          this.history.redo(this.editor);
          this.editor.show();
          break;

        case "show":
          this.editor.show();
          break;

        case "history":
          this.showHistoryInfo();
          break;

        case "clear":
          this.handleClearCommand();
          break;

        case "help":
          this.showMenu();
          break;

        case "quit":
        case "exit":
          console.log("Thanks for using the Text Editor! Goodbye!");
          this.rl.close();
          return;

        case "":
          break;

        default:
          console.log(`Unknown command: ${command}`);
          console.log('Type "help" to see available commands');
          break;
      }
    } catch (error) {
      console.error("Command processing failed:", getErrorMessage(error));
    }

    this.promptUser();
  }

  private handleWriteCommand(args: string[]): void {
    try {
      if (args.length === 0) {
        throw new Error("Please provide text to write");
      }

      const text = args.join(" ");
      const writeCmd = new WriteCommand(this.editor, this.history, text);
      this.invoker.executeCommand(writeCmd);
      this.editor.show();
    } catch (error) {
      console.error("Write command failed:", getErrorMessage(error));
    }
  }

  private handleDeleteCommand(args: string[]): void {
    try {
      const count = args.length > 0 ? parseInt(args[0]) : 1;

      if (isNaN(count) || count <= 0) {
        throw new Error(
          "Please provide a valid number of characters to delete"
        );
      }

      const deleteCmd = new DeleteCommand(this.editor, this.history, count);
      this.invoker.executeCommand(deleteCmd);
      this.editor.show();
    } catch (error) {
      console.error("Delete command failed:", getErrorMessage(error));
    }
  }

  private handleCursorCommand(args: string[]): void {
    try {
      if (args.length === 0) {
        throw new Error("Please provide cursor position");
      }

      const position = parseInt(args[0]);

      if (isNaN(position) || position < 0) {
        throw new Error("Please provide a valid cursor position");
      }

      this.history.saveState(this.editor);
      this.editor.setCursor(position);
      console.log(`Cursor moved to position ${position}`);
      this.editor.show();
    } catch (error) {
      console.error("Cursor command failed:", getErrorMessage(error));
    }
  }

  private handleFontCommand(args: string[]): void {
    try {
      if (args.length === 0) {
        throw new Error("Please provide font size");
      }

      const fontSize = parseInt(args[0]);

      if (isNaN(fontSize) || fontSize <= 0) {
        throw new Error("Please provide a valid font size");
      }

      const formatCmd = new FormatCommand(this.editor, this.history, fontSize);
      this.invoker.executeCommand(formatCmd);
      this.editor.show();
    } catch (error) {
      console.error("Font command failed:", getErrorMessage(error));
    }
  }

  private handleClearCommand(): void {
    try {
      this.history.saveState(this.editor);
      this.editor = new TextEditor();
      console.log("Editor content cleared");
      this.editor.show();
    } catch (error) {
      console.error("Clear command failed:", getErrorMessage(error));
    }
  }

  private showHistoryInfo(): void {
    try {
      console.log(this.history.getHistoryInfo());
      console.log(`Commands executed: ${this.invoker.getExecutedCommands()}`);
      console.log(`Can undo: ${this.history.canUndo()}`);
      console.log(`Can redo: ${this.history.canRedo()}`);
    } catch (error) {
      console.error("History info failed:", getErrorMessage(error));
    }
  }

  private promptUser(): void {
    this.rl.question("\nEnter command: ", (input) => {
      this.processCommand(input);
    });
  }

  public start(): void {
    try {
      console.log("🎉 Welcome to the Interactive Text Editor!");
      console.log(
        "This demonstrates the Memento Design Pattern with undo/redo functionality."
      );
      this.showMenu();

      console.log("\nCurrent editor state:");
      this.editor.show();

      this.promptUser();
    } catch (error) {
      console.error("CLI start failed:", getErrorMessage(error));
      process.exit(1);
    }
  }
}

function runDemo(): void {
  try {
    console.log("=== Quick Demo of Memento Pattern ===");

    const editor = new TextEditor();
    const history = new HistoryManager();

    history.saveState(editor);

    editor.write("Hello");
    console.log('\n1. After writing "Hello":');
    editor.show();

    history.saveState(editor);
    editor.write(" World!");
    console.log('2. After writing " World!":');
    editor.show();

    history.saveState(editor);
    editor.setFontSize(16);
    console.log("3. After changing font size:");
    editor.show();

    console.log("4. Undoing changes:");
    history.undo(editor);
    editor.show();

    history.undo(editor);
    editor.show();

    console.log("5. Redoing changes:");
    history.redo(editor);
    editor.show();

    console.log("\n=== Demo Complete ===\n");
  } catch (error) {
    console.error("Demo execution failed:", getErrorMessage(error));
    process.exit(1);
  }
}

function main(): void {
  try {
    const args = process.argv.slice(2);

    if (args.includes("--demo") || args.includes("-d")) {
      runDemo();
    } else if (args.includes("--help") || args.includes("-h")) {
      console.log("Usage:");
      console.log("  npm run dev          - Start interactive mode");
      console.log("  npm run dev -- --demo - Run quick demo");
      console.log("  npm run dev -- --help - Show this help");
    } else {
      const cli = new TextEditorCLI();
      cli.start();
    }
  } catch (error) {
    console.error("Application failed to start:", getErrorMessage(error));
    process.exit(1);
  }
}

export { runDemo, TextEditorCLI };

if (require.main === module) {
  main();
}
