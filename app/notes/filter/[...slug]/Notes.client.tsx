"use client";
import css from "./Notes.module.css";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { fetchNotes, NotesHttpResponse } from "@/lib/api";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteModal from "@/components/NoteModal/NoteModal";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import Loader from "@/components/Loader/Loader";
import NoteList from "@/components/NoteList/NoteList";

interface NotesClientProps {
  initialData?: NotesHttpResponse;
  tag?: string;
}

export default function Notes({ initialData, tag }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

  const debounced = useDebouncedCallback((value) => {
    setDebouncedSearchQuery(value);
    setPage(1);
  }, 700);

  const onSearchChanged = (value: string) => {
    setSearchQuery(value);
    debounced(value);
  };

  const { data, isLoading, isError, isPending, isFetching } = useQuery({
    queryKey: ["notes", page, debouncedSearchQuery, tag],
    queryFn: () => fetchNotes(page, debouncedSearchQuery, tag),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
    initialData,
  });

  const notes = data?.notes;
  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {
          <SearchBox
            inputOnChange={onSearchChanged}
            searchQuery={searchQuery}
          />
        }
        {<Pagination setPage={setPage} totalPages={totalPages} page={page} />}
        {
          <button className={css.button} onClick={openModal}>
            <span className={css.span}>Create note +</span>
          </button>
        }
      </header>

      {isModalOpen && <NoteModal onClose={closeModal} />}
      {isError && <ErrorMessage />}
      {(isLoading || isPending || isFetching) && <Loader />}
      {notes && notes.length > 0 && <NoteList notes={notes} />}
    </div>
  );
}
