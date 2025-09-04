// src/models/editorSnapshot.ts - The Memento

// Helper function to safely get error message
function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
}

export class EditorSnapshot {
  private readonly content: string;
  private readonly cursorPosition: number;
  private readonly fontSize: number;
  private readonly timestamp: Date;

  constructor(content: string, cursorPosition: number, fontSize: number) {
    try {
      if (typeof content !== "string") {
        throw new Error("Content must be a string");
      }

      if (cursorPosition < 0 || !Number.isInteger(cursorPosition)) {
        throw new Error("Invalid cursor position");
      }

      if (fontSize <= 0 || !Number.isInteger(fontSize)) {
        throw new Error("Invalid font size");
      }

      this.content = content;
      this.cursorPosition = cursorPosition;
      this.fontSize = fontSize;
      this.timestamp = new Date();
    } catch (error) {
      console.error("Snapshot creation failed:", getErrorMessage(error));
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

  public getTimestamp(): Date {
    return this.timestamp;
  }

  public isValid(): boolean {
    return (
      typeof this.content === "string" &&
      this.cursorPosition >= 0 &&
      this.fontSize > 0 &&
      this.timestamp instanceof Date
    );
  }
}
