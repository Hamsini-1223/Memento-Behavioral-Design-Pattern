// src/commands/editorCommands.ts - Command Pattern with Memento
import { TextEditor } from "../models/textEditor";
import { HistoryManager } from "../managers/historyManager";

// Helper function to safely get error message
function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
}

export interface Command {
  execute(): void;
}

export class WriteCommand implements Command {
  private editor: TextEditor;
  private history: HistoryManager;
  private text: string;

  constructor(editor: TextEditor, history: HistoryManager, text: string) {
    if (!editor || !history) {
      throw new Error("Invalid editor or history manager");
    }

    if (!text || typeof text !== "string") {
      throw new Error("Invalid text input");
    }

    this.editor = editor;
    this.history = history;
    this.text = text;
  }

  public execute(): void {
    try {
      this.history.saveState(this.editor);
      this.editor.write(this.text);
      console.log(`Executed: Write "${this.text}"`);
    } catch (error) {
      console.error("Write command execution failed:", getErrorMessage(error));
      throw error;
    }
  }
}

export class DeleteCommand implements Command {
  private editor: TextEditor;
  private history: HistoryManager;
  private count: number;

  constructor(editor: TextEditor, history: HistoryManager, count: number = 1) {
    if (!editor || !history) {
      throw new Error("Invalid editor or history manager");
    }

    if (count < 0 || !Number.isInteger(count)) {
      throw new Error("Invalid delete count");
    }

    this.editor = editor;
    this.history = history;
    this.count = count;
  }

  public execute(): void {
    try {
      this.history.saveState(this.editor);
      this.editor.delete(this.count);
      console.log(`Executed: Delete ${this.count} character(s)`);
    } catch (error) {
      console.error("Delete command execution failed:", getErrorMessage(error));
      throw error;
    }
  }
}

export class FormatCommand implements Command {
  private editor: TextEditor;
  private history: HistoryManager;
  private fontSize: number;

  constructor(editor: TextEditor, history: HistoryManager, fontSize: number) {
    if (!editor || !history) {
      throw new Error("Invalid editor or history manager");
    }

    if (fontSize <= 0 || !Number.isInteger(fontSize)) {
      throw new Error("Invalid font size");
    }

    this.editor = editor;
    this.history = history;
    this.fontSize = fontSize;
  }

  public execute(): void {
    try {
      this.history.saveState(this.editor);
      this.editor.setFontSize(this.fontSize);
      console.log(`Executed: Change font size to ${this.fontSize}`);
    } catch (error) {
      console.error("Format command execution failed:", getErrorMessage(error));
      throw error;
    }
  }
}

export class EditorInvoker {
  private commands: Command[] = [];

  public executeCommand(command: Command): void {
    try {
      if (!command) {
        throw new Error("Invalid command");
      }

      command.execute();
      this.commands.push(command);
    } catch (error) {
      console.error("Command execution failed:", getErrorMessage(error));
      throw error;
    }
  }

  public getExecutedCommands(): number {
    return this.commands.length;
  }

  public clearCommandHistory(): void {
    this.commands = [];
  }
}
