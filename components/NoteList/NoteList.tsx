import css from "./NoteList.module.css";
import type { Note } from "../../types/note.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "../../lib/api";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import { RiDeleteBin7Fill } from "react-icons/ri";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const deleteTodo = useMutation({
    mutationFn: async (id: number) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  function onclickHandle(id: number) {
    deleteTodo.mutate(id);
  }

  return (
    <>
      <ul className={css.list}>
        {notes.map(({ id, title, content, tag }: Note) => (
          <li className={css.listItem} key={id}>
            <h2 className={css.title}>{title}</h2>
            <div className={css.contentWrap}>
              <p className={css.content}>{content}</p>
              <div className={css.linkWrap}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <a href={`/notes/${id}`}>...show more</a>
              </div>
            </div>
            <div className={css.footer}>
              <span className={css.tag}>{tag}</span>
              <button className={css.button} onClick={() => onclickHandle(id!)}>
                <RiDeleteBin7Fill />
              </button>
            </div>
          </li>
        ))}
      </ul>
      {deleteTodo.isError && <ErrorMessage />}
      {deleteTodo.isPending && <Loader />}
    </>
  );
}
