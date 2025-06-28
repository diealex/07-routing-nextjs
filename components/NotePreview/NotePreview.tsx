import { Note } from "@/types/note";
import css from "./NotePreview.module.css";

interface NotePreviewProps {
  note: Note;
}

export default function NotePreview({ note }: NotePreviewProps) {
  return (
    <div className={css.item}>
      <div className={css.header}>
        <h2>{note.title}</h2>
        {/* <button className={css.editBtn}>Edit note</button> */}
      </div>
      <p className={css.content}>{note.content}</p>
      <p className={css.tag}>{note.tag}</p>
      <p className={css.date}>
        {new Date(note.createdAt).toLocaleString("uk")}
      </p>
    </div>
  );
}
