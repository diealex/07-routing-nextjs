import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

type PageProps = {
  params: Promise<{ slug: string[] }>;
};

const NotesPage = async ({ params }: PageProps) => {
  const { slug } = await params;
  const tag = slug[0].toUpperCase() === "ALL" ? "" : slug[0];
  const res = await fetchNotes(1, "", tag);
  return (
    <>
      <NotesClient initialData={res} tag={tag} />
    </>
  );
};

export default NotesPage;
