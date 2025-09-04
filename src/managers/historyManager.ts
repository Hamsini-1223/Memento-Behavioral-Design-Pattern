// src/managers/historyManager.ts - The Caretaker
import { TextEditor } from "../models/textEditor";
import { EditorSnapshot } from "../models/editorSnapshot";

// Helper function to safely get error message
function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
}

export class HistoryManager {
  private snapshots: EditorSnapshot[] = [];
  private currentIndex: number = -1;
  private maxHistorySize: number = 50;

  public saveState(editor: TextEditor): void {
    try {
      if (!editor) {
        throw new Error("Invalid editor instance");
      }

      // Remove snapshots after current position
      this.snapshots = this.snapshots.slice(0, this.currentIndex + 1);

      const snapshot = editor.createSnapshot();

      if (!snapshot.isValid()) {
        throw new Error("Invalid snapshot created");
      }

      this.snapshots.push(snapshot);

      // Manage history size
      if (this.snapshots.length > this.maxHistorySize) {
        this.snapshots.shift();
      } else {
        this.currentIndex++;
      }

      console.log(`State saved. History size: ${this.snapshots.length}`);
    } catch (error) {
      console.error("Save state failed:", getErrorMessage(error));
      throw error;
    }
  }

  public undo(editor: TextEditor): boolean {
    try {
      if (!editor) {
        throw new Error("Invalid editor instance");
      }

      if (this.currentIndex > 0) {
        this.currentIndex--;
        const snapshot = this.snapshots[this.currentIndex];

        if (!snapshot.isValid()) {
          throw new Error("Invalid snapshot in history");
        }

        editor.restore(snapshot);
        console.log("Undo successful");
        return true;
      }

      console.log("Nothing to undo");
      return false;
    } catch (error) {
      console.error("Undo operation failed:", getErrorMessage(error));
      return false;
    }
  }

  public redo(editor: TextEditor): boolean {
    try {
      if (!editor) {
        throw new Error("Invalid editor instance");
      }

      if (this.currentIndex < this.snapshots.length - 1) {
        this.currentIndex++;
        const snapshot = this.snapshots[this.currentIndex];

        if (!snapshot.isValid()) {
          throw new Error("Invalid snapshot in history");
        }

        editor.restore(snapshot);
        console.log("Redo successful");
        return true;
      }

      console.log("Nothing to redo");
      return false;
    } catch (error) {
      console.error("Redo operation failed:", getErrorMessage(error));
      return false;
    }
  }

  public canUndo(): boolean {
    return this.currentIndex > 0;
  }

  public canRedo(): boolean {
    return this.currentIndex < this.snapshots.length - 1;
  }

  public getHistoryInfo(): string {
    return `History: ${this.snapshots.length} snapshots, current index: ${this.currentIndex}`;
  }

  public clearHistory(): void {
    try {
      this.snapshots = [];
      this.currentIndex = -1;
      console.log("History cleared");
    } catch (error) {
      console.error("Clear history failed:", getErrorMessage(error));
      throw error;
    }
  }

  public setMaxHistorySize(size: number): void {
    try {
      if (size <= 0 || !Number.isInteger(size)) {
        throw new Error("Invalid history size");
      }

      this.maxHistorySize = size;

      // Trim existing history if needed
      if (this.snapshots.length > size) {
        const excess = this.snapshots.length - size;
        this.snapshots.splice(0, excess);
        this.currentIndex = Math.max(0, this.currentIndex - excess);
      }
    } catch (error) {
      console.error("Set max history size failed:", getErrorMessage(error));
      throw error;
    }
  }
}
