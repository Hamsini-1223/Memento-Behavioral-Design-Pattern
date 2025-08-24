// TextEditor.ts - The Originator
export class TextEditor {
  private content: string = "";
  private cursorPosition: number = 0;
  private fontSize: number = 12;

  public write(text: string): void {
    const before = this.content.substring(0, this.cursorPosition);
    const after = this.content.substring(this.cursorPosition);
    this.content = before + text + after;
    this.cursorPosition += text.length;
  }

  public delete(count: number = 1): void {
    if (this.cursorPosition >= count) {
      const before = this.content.substring(0, this.cursorPosition - count);
      const after = this.content.substring(this.cursorPosition);
      this.content = before + after;
      this.cursorPosition -= count;
    }
  }

  public setCursor(position: number): void {
    this.cursorPosition = Math.max(0, Math.min(position, this.content.length));
  }

  public setFontSize(size: number): void {
    this.fontSize = size;
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

  // Create a snapshot of current state
  public createSnapshot(): EditorSnapshot {
    return new EditorSnapshot(this.content, this.cursorPosition, this.fontSize);
  }

  // Restore state from snapshot
  public restore(snapshot: EditorSnapshot): void {
    this.content = snapshot.getContent();
    this.cursorPosition = snapshot.getCursorPosition();
    this.fontSize = snapshot.getFontSize();
  }

  public show(): void {
    console.log(`Content: "${this.content}"`);
    console.log(`Cursor at position: ${this.cursorPosition}`);
    console.log(`Font size: ${this.fontSize}`);
    console.log("---");
  }
}

// EditorSnapshot - The Memento (nested-like implementation)
class EditorSnapshot {
  private readonly content: string;
  private readonly cursorPosition: number;
  private readonly fontSize: number;
  private readonly timestamp: Date;

  constructor(content: string, cursorPosition: number, fontSize: number) {
    this.content = content;
    this.cursorPosition = cursorPosition;
    this.fontSize = fontSize;
    this.timestamp = new Date();
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
}

export { EditorSnapshot };
