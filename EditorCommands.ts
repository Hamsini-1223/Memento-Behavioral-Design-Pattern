// EditorCommands.ts - Command Pattern with Memento
import { TextEditor } from "./TextEditor";
import { HistoryManager } from "./HistoryManager";

// Base Command interface
export interface Command {
  execute(): void;
}

// Write Text Command
export class WriteCommand implements Command {
  private editor: TextEditor;
  private history: HistoryManager;
  private text: string;

  constructor(editor: TextEditor, history: HistoryManager, text: string) {
    this.editor = editor;
    this.history = history;
    this.text = text;
  }

  public execute(): void {
    // Save state before making changes
    this.history.saveState(this.editor);
    this.editor.write(this.text);
    console.log(`Executed: Write "${this.text}"`);
  }
}

// Delete Command
export class DeleteCommand implements Command {
  private editor: TextEditor;
  private history: HistoryManager;
  private count: number;

  constructor(editor: TextEditor, history: HistoryManager, count: number = 1) {
    this.editor = editor;
    this.history = history;
    this.count = count;
  }

  public execute(): void {
    this.history.saveState(this.editor);
    this.editor.delete(this.count);
    console.log(`Executed: Delete ${this.count} character(s)`);
  }
}

// Format Command (change font size)
export class FormatCommand implements Command {
  private editor: TextEditor;
  private history: HistoryManager;
  private fontSize: number;

  constructor(editor: TextEditor, history: HistoryManager, fontSize: number) {
    this.editor = editor;
    this.history = history;
    this.fontSize = fontSize;
  }

  public execute(): void {
    this.history.saveState(this.editor);
    this.editor.setFontSize(this.fontSize);
    console.log(`Executed: Change font size to ${this.fontSize}`);
  }
}

// Command Invoker
export class EditorInvoker {
  private commands: Command[] = [];

  public executeCommand(command: Command): void {
    command.execute();
    this.commands.push(command);
  }

  public getExecutedCommands(): number {
    return this.commands.length;
  }
}
