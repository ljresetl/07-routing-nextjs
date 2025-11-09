import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import NotePreview from './NotePreview.client';
import { fetchNoteById } from '@/lib/api';

type Props = {
  params: { id: string };
};

export default async function PreviewPage({ params }: Props) {
  const queryClient = new QueryClient();
  const { id } = params;

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreview id={id} />
    </HydrationBoundary>
  );
}
