// demo.ts - Interactive Console Interface for Memento Pattern
import { TextEditor } from "./TextEditor";
import { HistoryManager } from "./HistoryManager";
import {
  WriteCommand,
  DeleteCommand,
  FormatCommand,
  EditorInvoker,
} from "./EditorCommands";
import * as readline from "readline";

class TextEditorCLI {
  private editor: TextEditor;
  private history: HistoryManager;
  private invoker: EditorInvoker;
  private rl: readline.Interface;

  constructor() {
    this.editor = new TextEditor();
    this.history = new HistoryManager();
    this.invoker = new EditorInvoker();

    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    // Save initial empty state
    this.history.saveState(this.editor);
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
    const parts = input.trim().split(" ");
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    switch (command) {
      case "write":
        if (args.length === 0) {
          console.log("Error: Please provide text to write");
          break;
        }
        const text = args.join(" ");
        const writeCmd = new WriteCommand(this.editor, this.history, text);
        this.invoker.executeCommand(writeCmd);
        this.editor.show();
        break;

      case "delete":
        const count = args.length > 0 ? parseInt(args[0]) : 1;
        if (isNaN(count) || count <= 0) {
          console.log(
            "Error: Please provide a valid number of characters to delete"
          );
          break;
        }
        const deleteCmd = new DeleteCommand(this.editor, this.history, count);
        this.invoker.executeCommand(deleteCmd);
        this.editor.show();
        break;

      case "cursor":
        if (args.length === 0) {
          console.log("Error: Please provide cursor position");
          break;
        }
        const position = parseInt(args[0]);
        if (isNaN(position) || position < 0) {
          console.log("Error: Please provide a valid cursor position");
          break;
        }
        this.history.saveState(this.editor);
        this.editor.setCursor(position);
        console.log(`Cursor moved to position ${position}`);
        this.editor.show();
        break;

      case "font":
        if (args.length === 0) {
          console.log("Error: Please provide font size");
          break;
        }
        const fontSize = parseInt(args[0]);
        if (isNaN(fontSize) || fontSize <= 0) {
          console.log("Error: Please provide a valid font size");
          break;
        }
        const formatCmd = new FormatCommand(
          this.editor,
          this.history,
          fontSize
        );
        this.invoker.executeCommand(formatCmd);
        this.editor.show();
        break;

      case "undo":
        if (this.history.undo(this.editor)) {
          this.editor.show();
        }
        break;

      case "redo":
        if (this.history.redo(this.editor)) {
          this.editor.show();
        }
        break;

      case "show":
        this.editor.show();
        break;

      case "history":
        console.log(this.history.getHistoryInfo());
        console.log(`Commands executed: ${this.invoker.getExecutedCommands()}`);
        console.log(`Can undo: ${this.history.canUndo()}`);
        console.log(`Can redo: ${this.history.canRedo()}`);
        break;

      case "clear":
        this.history.saveState(this.editor);
        this.editor = new TextEditor();
        console.log("Editor content cleared");
        this.editor.show();
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
        // Empty input, do nothing
        break;

      default:
        console.log(`Unknown command: ${command}`);
        console.log('Type "help" to see available commands');
        break;
    }

    this.promptUser();
  }

  private promptUser(): void {
    this.rl.question("\nEnter command: ", (input) => {
      this.processCommand(input);
    });
  }

  public start(): void {
    console.log("🎉 Welcome to the Interactive Text Editor!");
    console.log(
      "This demonstrates the Memento Design Pattern with undo/redo functionality."
    );
    this.showMenu();

    console.log("\nCurrent editor state:");
    this.editor.show();

    this.promptUser();
  }
}

// Simple demonstration function (non-interactive)
function runDemo(): void {
  console.log("=== Quick Demo of Memento Pattern ===");

  const editor = new TextEditor();
  const history = new HistoryManager();

  // Save initial state
  history.saveState(editor);

  // Make some changes
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

  // Demonstrate undo
  console.log("4. Undoing changes:");
  history.undo(editor);
  editor.show();

  history.undo(editor);
  editor.show();

  // Demonstrate redo
  console.log("5. Redoing changes:");
  history.redo(editor);
  editor.show();

  console.log("\n=== Demo Complete ===\n");
}

// Main execution
function main(): void {
  const args = process.argv.slice(2);

  if (args.includes("--demo") || args.includes("-d")) {
    runDemo();
  } else if (args.includes("--help") || args.includes("-h")) {
    console.log("Usage:");
    console.log("  npm run dev          - Start interactive mode");
    console.log("  npm run dev -- --demo - Run quick demo");
    console.log("  npm run dev -- --help - Show this help");
  } else {
    // Default: start interactive mode
    const cli = new TextEditorCLI();
    cli.start();
  }
}

// Export functions
export { runDemo, TextEditorCLI };

// Run if this file is executed directly
if (require.main === module) {
  main();
}
