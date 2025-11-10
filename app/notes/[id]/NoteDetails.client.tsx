'use client';

import css from './NoteDetails.module.css';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import Link from 'next/link';

type Props = {
  id: string;
};

export default function NoteDetails({ id }: Props) {
  const { data: note, isLoading, error } = useQuery({
    queryKey: ['notes', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error || !note) return <div>Error loading note</div>;

  return (
    <div className={css.container}>
      <Link href={`/notes`} className={css.backLink}>
        Back to notes
      </Link>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{new Date(note.createdAt).toLocaleString()}</p>
      </div>
    </div>
  );
}
