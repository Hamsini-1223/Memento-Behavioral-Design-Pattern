// src/models/textEditor.ts - The Originator
import { EditorSnapshot } from "./editorSnapshot";

// Helper function to safely get error message
function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
}

export class TextEditor {
  private content: string = "";
  private cursorPosition: number = 0;
  private fontSize: number = 12;

  public write(text: string): void {
    try {
      if (!text || typeof text !== "string") {
        throw new Error("Invalid text input");
      }

      const before = this.content.substring(0, this.cursorPosition);
      const after = this.content.substring(this.cursorPosition);
      this.content = before + text + after;
      this.cursorPosition += text.length;
    } catch (error) {
      console.error("Write operation failed:", getErrorMessage(error));
      throw error;
    }
  }

  public delete(count: number = 1): void {
    try {
      if (count < 0 || !Number.isInteger(count)) {
        throw new Error("Invalid delete count");
      }

      if (this.cursorPosition >= count) {
        const before = this.content.substring(0, this.cursorPosition - count);
        const after = this.content.substring(this.cursorPosition);
        this.content = before + after;
        this.cursorPosition -= count;
      } else {
        console.warn("Cannot delete more characters than available");
      }
    } catch (error) {
      console.error("Delete operation failed:", getErrorMessage(error));
      throw error;
    }
  }

  public setCursor(position: number): void {
    try {
      if (position < 0 || !Number.isInteger(position)) {
        throw new Error("Invalid cursor position");
      }

      this.cursorPosition = Math.max(
        0,
        Math.min(position, this.content.length)
      );
    } catch (error) {
      console.error("Cursor operation failed:", getErrorMessage(error));
      throw error;
    }
  }

  public setFontSize(size: number): void {
    try {
      if (size <= 0 || !Number.isInteger(size)) {
        throw new Error("Invalid font size");
      }

      this.fontSize = size;
    } catch (error) {
      console.error("Font size operation failed:", getErrorMessage(error));
      throw error;
    }
  }

  public getContent(): string {
    return this.content;
  }

  public getCursorPosition(): number {
    return this.cursorPosition;
  }

  public getFontSize(): number {
    return this.fontSize;
  }

  public createSnapshot(): EditorSnapshot {
    try {
      return new EditorSnapshot(
        this.content,
        this.cursorPosition,
        this.fontSize
      );
    } catch (error) {
      console.error("Snapshot creation failed:", getErrorMessage(error));
      throw error;
    }
  }

  public restore(snapshot: EditorSnapshot): void {
    try {
      if (!snapshot) {
        throw new Error("Invalid snapshot");
      }

      this.content = snapshot.getContent();
      this.cursorPosition = snapshot.getCursorPosition();
      this.fontSize = snapshot.getFontSize();
    } catch (error) {
      console.error("Restore operation failed:", getErrorMessage(error));
      throw error;
    }
  }

  public show(): void {
    console.log(`Content: "${this.content}"`);
    console.log(`Cursor at position: ${this.cursorPosition}`);
    console.log(`Font size: ${this.fontSize}`);
    console.log("---");
  }
}
