'use client';

import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import css from './NotePreview.module.css';

type Props = {
  id: string;
};

export default function NotePreview({ id }: Props) {
  const router = useRouter();
  const { data: note, isLoading, error } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    enabled: !!id,
    refetchOnMount: false,
  });

  const handleClose = () => router.back();

  if (isLoading) return null;
  if (error || !note) return null;

  return (
    <div className={css.modalOverlay} onClick={handleClose}>
      <div className={css.modalContent} onClick={e => e.stopPropagation()}>
        <h2>{note.title}</h2>
        <p>{note.content}</p>
        <p><strong>Tag:</strong> {note.tag}</p>
        <button onClick={handleClose}>Закрити</button>
      </div>
    </div>
  );
}
