import axios from "axios";
import type { Note, AddNote } from "../types/note";
const ACCESS_TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
axios.defaults.baseURL = "https://notehub-public.goit.study/api";

export interface NotesHttpResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNoteById = async (id: string): Promise<Note> => {
  const results = await axios.get<Note>(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  });
  return results.data;
};

export const fetchNotes = async (
  page: number,
  mysearchtext: string,
  tag: string = ""
): Promise<NotesHttpResponse> => {
  const results = await axios.get<NotesHttpResponse>(`/notes`, {
    params: {
      page,
      tag: tag
        ? tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase()
        : null,
      perPage: 12,
      search: mysearchtext ? mysearchtext : null,
    },
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  });
  return results.data;
};

export const deleteNote = async (id: number): Promise<Note> => {
  const results = await axios.delete<Note>(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  });
  return results.data;
};

export const createNote = async ({
  title,
  content,
  tag,
}: AddNote): Promise<Note> => {
  const results = await axios.post<Note>(
    `/notes`,
    {
      title,
      content,
      tag,
    },
    {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    }
  );
  return results.data;
};
