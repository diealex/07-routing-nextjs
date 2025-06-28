"use client";
import Modal from "@/components/Modal/Modal";
import NotePreview from "@/components/NotePreview/NotePreview";
import { Note } from "@/types/note";
import { useRouter } from "next/navigation";

interface NotePreviewClientProps {
  note: Note;
}
export default function NotePreviewClient({ note }: NotePreviewClientProps) {
  const router = useRouter();
  return (
    <Modal onClose={router.back}>
      <NotePreview note={note} />
    </Modal>
  );
}
