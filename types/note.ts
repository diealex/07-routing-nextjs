export interface Note {
  id: number;
  title: string;
  content: string;
  tag: string;
  createdAt: string;
  updatedAt: string;
}

export interface AddNote {
  title: string;
  content?: string;
  tag: string;
}
export const TAGS = ["All", "Todo", "Work", "Personal", "Meeting", "Shopping"];
