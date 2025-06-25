import NotesClient from "./Notes.client";
import { fetchNotes } from "../../lib/api";

const NotesPage = async () => {
  const res = await fetchNotes(1, "");
  return <NotesClient initialData={res} />;
};

export default NotesPage;
