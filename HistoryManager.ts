// HistoryManager.ts - The Caretaker
import { TextEditor, EditorSnapshot } from "./TextEditor";

export class HistoryManager {
  private snapshots: EditorSnapshot[] = [];
  private currentIndex: number = -1;
  private maxHistorySize: number = 50;

  // Save current state before making changes
  public saveState(editor: TextEditor): void {
    // Remove any snapshots after current position (for redo clearing)
    this.snapshots = this.snapshots.slice(0, this.currentIndex + 1);

    const snapshot = editor.createSnapshot();
    this.snapshots.push(snapshot);

    // Keep history size manageable
    if (this.snapshots.length > this.maxHistorySize) {
      this.snapshots.shift();
    } else {
      this.currentIndex++;
    }

    console.log(`State saved. History size: ${this.snapshots.length}`);
  }

  // Undo to previous state
  public undo(editor: TextEditor): boolean {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      const snapshot = this.snapshots[this.currentIndex];
      editor.restore(snapshot);
      console.log("Undo successful");
      return true;
    }

    console.log("Nothing to undo");
    return false;
  }

  // Redo to next state
  public redo(editor: TextEditor): boolean {
    if (this.currentIndex < this.snapshots.length - 1) {
      this.currentIndex++;
      const snapshot = this.snapshots[this.currentIndex];
      editor.restore(snapshot);
      console.log("Redo successful");
      return true;
    }

    console.log("Nothing to redo");
    return false;
  }

  // Check if undo is available
  public canUndo(): boolean {
    return this.currentIndex > 0;
  }

  // Check if redo is available
  public canRedo(): boolean {
    return this.currentIndex < this.snapshots.length - 1;
  }

  // Get history info
  public getHistoryInfo(): string {
    return `History: ${this.snapshots.length} snapshots, current index: ${this.currentIndex}`;
  }

  // Clear all history
  public clearHistory(): void {
    this.snapshots = [];
    this.currentIndex = -1;
    console.log("History cleared");
  }
}
